import Button from '@/components/common/Button';
import { ArrowRightSVG, RefreshSVG, SupplierToDaricSVG } from '@/components/icons';
import { initialOTPInput } from '@/constant';
import pagesRoutes from '@/routes';
import { toEnglishNumber } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const OTP = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const schema = yup
        .object({
            input1: yup.string().required().length(1),
            input2: yup.string().required().length(1),
            input3: yup.string().required().length(1),
            input4: yup.string().required().length(1),
        })
        .required();

    const { register, handleSubmit, setFocus, watch, getValues } = useForm<IOTPInputs>({
        defaultValues: initialOTPInput,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const timerId = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerId);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    });

    const onResendOTP = () => {
        setMinutes(1);
        setSeconds(59);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Backspace') {
            if (!watch('input4')) {
                setFocus('input3');
            }
            if (!watch('input3')) {
                setFocus('input2');
            }
            if (!watch('input2')) {
                setFocus('input1');
            }
        } else {
            if (watch('input1')) {
                setFocus('input2');
            }
            if (watch('input2')) {
                setFocus('input3');
            }
            if (watch('input3')) {
                setFocus('input4');
            }
        }
    };

    useEffect(() => {
        if (watch('input1')) {
            setFocus('input2');
        }
        if (watch('input2')) {
            setFocus('input3');
        }
        if (watch('input3')) {
            setFocus('input4');
        }
    }, [getValues()]);

    useEffect(() => {
        const controller = new AbortController();

        window.addEventListener('keydown', onKeyDown);

        return () => {
            controller.abort();
        };
    }, []);

    const onSubmit: SubmitHandler<IOTPInputs> = async (data: IOTPInputs) => {
        console.log(Object.values(data).join(''));
        try {
            if (toEnglishNumber(Object.values(data).join('')) === '1234') {
                toast.success('با موفقیت وارد  داشبورد شدید.');

                navigate(pagesRoutes.suppliers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='min-w-screen flex min-h-screen bg-background-100 dark:bg-dark-background-100'>
            <div className='flex min-h-full flex-1 flex-col items-center justify-center gap-16 overflow-hidden '>
                <SupplierToDaricSVG width='20rem' height='10rem' />

                <div className='flex w-10/12 flex-col gap-48 rounded-md  bg-background-300 p-16 py-32  shadow-card sm:w-5/12 dark:bg-dark-background-300'>
                    <div className=' flex flex-col  gap-16'>
                        <div className='relative flex items-center justify-center'>
                            <span className='text-center text-xl font-bold text-text-100 dark:text-dark-text-100'>
                                {t('otp_page.enter_otp')}
                            </span>
                            <button className='absolute right-0 flex text-text-100 dark:text-dark-text-100'>
                                <ArrowRightSVG width='3rem' height='3rem' />
                            </button>
                        </div>
                        <span className='text-center text-base font-medium text-text-200 dark:text-dark-text-200'>
                            <Trans
                                i18nKey={'otp_page.send_otp'}
                                values={{
                                    mobileNumber: Cookies.get('mobile_number') ?? '-',
                                    length: 4,
                                }}
                                components={{
                                    span: <span dir='ltr' className='font-bold' />,
                                }}
                            />
                        </span>
                    </div>

                    <form method='get' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-32'>
                        <div className='flex items-center justify-center gap-16' dir='ltr'>
                            <input
                                className=' h-48 w-48 rounded-md border border-lines-200 bg-transparent !text-center text-3xl font-bold text-text-100 focus:border-brand-100 dark:border-dark-lines-200 dark:text-dark-text-100 dark:focus:border-dark-brand-100'
                                maxLength={1}
                                autoFocus
                                autoComplete='one-time-code'
                                type='tel'
                                inputMode='numeric'
                                tabIndex={1}
                                {...register('input1')}
                            />

                            <input
                                className=' h-48 w-48 rounded-md border border-lines-200 bg-transparent !text-center text-3xl font-bold text-text-100 focus:border-brand-100 dark:border-dark-lines-200 dark:text-dark-text-100 dark:focus:border-dark-brand-100'
                                dir='ltr'
                                maxLength={1}
                                autoComplete='off'
                                type='tel'
                                inputMode='numeric'
                                tabIndex={2}
                                {...register('input2')}
                            />

                            <input
                                className=' h-48 w-48 rounded-md border border-lines-200 bg-transparent !text-center text-3xl font-bold text-text-100 focus:border-brand-100 dark:border-dark-lines-200 dark:text-dark-text-100 dark:focus:border-dark-brand-100'
                                dir='ltr'
                                maxLength={1}
                                autoComplete='off'
                                type='tel'
                                inputMode='numeric'
                                tabIndex={3}
                                {...register('input3')}
                            />

                            <input
                                className=' h-48 w-48 rounded-md border border-lines-200 bg-transparent !text-center text-3xl font-bold text-text-100 focus:border-brand-100 dark:border-dark-lines-200 dark:text-dark-text-100 dark:focus:border-dark-brand-100'
                                dir='ltr'
                                maxLength={1}
                                autoComplete='off'
                                type='tel'
                                inputMode='numeric'
                                tabIndex={4}
                                {...register('input4')}
                            />
                        </div>

                        <div className=' text-center text-base font-medium text-text-200 dark:text-dark-text-200'>
                            {seconds > 0 || minutes > 0 ? (
                                <p>
                                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} تا
                                    درخواست مجدد کد
                                </p>
                            ) : (
                                <button
                                    type='button'
                                    onClick={onResendOTP}
                                    className='flex w-full items-center justify-center gap-4'
                                >
                                    <RefreshSVG width='1.8rem' height='1.8rem' />
                                    <span>ارسال مجدد کد پیامکی</span>
                                </button>
                            )}
                        </div>

                        <div className='pt-16'>
                            <Button
                                // loading={isLoading}
                                // disabled={'userName' in errors || 'password' in errors}
                                type='submit'
                                className='btn-primary w-full rounded-md p-16'
                            >
                                {t('otp_page.confirm')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default OTP;
