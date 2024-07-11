import { axiosBase } from '@/api/axios';
import apiRoutes from '@/api/routes';
import Button from '@/components/common/Button';
import { EyeShieldSVG, EyeSVG, SupplierToDaricSVG, XFillSVG, XSVG } from '@/components/icons';
import pagesRoutes from '@/routes';
import { errorMessage } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

    const [isShowPassword, setShowPassword] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const schema = yup
        .object({
            userName: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.user_name') }))
                .length(11, t('validation.length', { type: t('form.user_name') })),
            password: yup
                .string()
                .required(t('validation.this_field_is_required', { type: t('form.password') }))
                .min(6, t('validation.length', { type: t('form.password') })),
        })
        .required();

    const {
        register,
        handleSubmit,
        setFocus,
        setValue,
        trigger,
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

            navigate(pagesRoutes.auth.OTP);
        } catch (e) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const onResetField = (input: 'userName' | 'password') => {
        setValue(input, '');
        trigger(input);
        setFocus(input);
    };

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
                        <div className='flex flex-col gap-8'>
                            <div
                                className={clsx(
                                    'input-group z-20 flex items-center justify-between px-8',
                                    errors.userName && 'error',
                                )}
                            >
                                <input
                                    placeholder={t('login_page.user_name_placeholder')}
                                    {...register('userName')}
                                    className='w-full px-8 py-16'
                                />

                                <button
                                    className={clsx('transition-colors', {
                                        'text-icons-200 dark:text-dark-icons-200': !errors.userName,
                                        'text-error-300 dark:text-dark-error-300': errors.userName,
                                    })}
                                    type='button'
                                    onClick={() => onResetField('userName')}
                                >
                                    <XSVG width='1.8rem' height='1.8rem' />
                                </button>
                            </div>
                            <AnimatePresence mode='popLayout'>
                                {errors.userName && (
                                    <motion.div
                                        initial={{ y: -30 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -30 }}
                                        className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                    >
                                        <XFillSVG width='1.6rem' height='1.6rem' />
                                        <span>{errors.userName?.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div
                                className={clsx(
                                    'input-group z-20 flex items-center justify-between  px-8',
                                    errors.password && 'error',
                                )}
                            >
                                <input
                                    placeholder={t('login_page.password_placeholder')}
                                    {...register('password')}
                                    type={isShowPassword ? 'text' : 'password'}
                                    className='w-full px-8 py-16'
                                />
                                <div
                                    className={clsx('flex items-center gap-8 transition-colors', {
                                        'text-icons-200 dark:text-dark-icons-200': !errors.password,
                                        'text-error-300 dark:text-dark-error-300': errors.password,
                                    })}
                                >
                                    <button type='button' onClick={() => setShowPassword((prev) => !prev)}>
                                        {isShowPassword ? <EyeSVG width='2.2rem' height='2.2rem' /> : <EyeShieldSVG />}
                                    </button>
                                    <button type='button' onClick={() => onResetField('password')}>
                                        <XSVG width='1.8rem' height='1.8rem' />
                                    </button>
                                </div>
                            </div>
                            <AnimatePresence mode='popLayout'>
                                {errors.password && (
                                    <motion.div
                                        initial={{ y: -30 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -30 }}
                                        className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                    >
                                        <XFillSVG width='1.6rem' height='1.6rem' />
                                        <span>{errors.password?.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
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
