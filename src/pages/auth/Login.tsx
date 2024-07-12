import { axiosBase } from '@/api/axios';
import apiRoutes from '@/api/routes';
import Button from '@/components/common/Button';
import Input from '@/components/common/Inputs/Input';
import { SupplierToDaricSVG } from '@/components/icons';
import pagesRoutes from '@/routes';
import { changePageTitle, errorMessage } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

type Inputs = {
    userName: string;
    password: string;
};

const Login = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const schema = yup
        .object({
            userName: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.user_name') }))
                .length(11, t('validation.length', { type: t('form.mobileNumber') })),
            password: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.password') }))
                .min(6, t('validation.length', { type: t('form.password') })),
        })
        .required();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async ({ userName, password }: Inputs) => {
        try {
            setLoading(true);
            const response = await axiosBase.post<ServerResponse<ILogin>>(apiRoutes.auth.login, {
                mobileNumber: userName,
                password: password,
            });
            const data = response.data;

            if (response.status !== 200 || !data.isSuccess) {
                toast.error(data.message);
                if (!data.validationErrors) return;
                throw new Error(errorMessage(data.validationErrors[0].errors[0]));
            }

            toast.success(data.message);

            Cookies.set('client_id', data.data.token);

            Cookies.set('mobile_number', userName);

            navigate(pagesRoutes.auth.OTP);
        } catch (e) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.login'));
    }, []);

    return (
        <div className='min-w-screen flex min-h-screen bg-background-100 dark:bg-dark-background-100'>
            <div className='flex min-h-full flex-1 flex-col items-center justify-center gap-16 overflow-hidden '>
                <SupplierToDaricSVG width='20rem' height='10rem' />

                <form
                    method='get'
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex w-10/12 flex-col gap-48 rounded-md  bg-background-300 p-16 py-32  shadow-card sm:w-5/12 dark:bg-dark-background-300'
                >
                    <span className='text-center text-xl font-bold text-text-100 dark:text-dark-text-100'>
                        {t('login_page.helper_message')}
                    </span>

                    <div className='flex flex-col gap-32 '>
                        <Controller
                            name='userName'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    classes={{
                                        container: 'bg-background-300 dark:bg-dark-background-300',
                                    }}
                                    placeholder='شماره همراه را واد کنید'
                                    error={errors.userName}
                                    type='number'
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    classes={{
                                        container: 'bg-background-300 dark:bg-dark-background-300',
                                    }}
                                    placeholder='رمز عبور را وارد کنید'
                                    error={errors.password}
                                    type='password'
                                    {...field}
                                />
                            )}
                        />
                        <div className='pt-16'>
                            <Button
                                loading={isLoading}
                                disabled={'userName' in errors || 'password' in errors}
                                type='submit'
                                className='btn-primary w-full rounded-md p-16'
                            >
                                {t('login_page.login')}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
