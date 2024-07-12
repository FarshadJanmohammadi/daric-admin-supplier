import { RefreshSVG } from '@/components/icons';
import useModalStore from '@/features/useModalStore';
import { forwardRef, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Modal, { Header } from '../Modal';
// import Form from './Form';
import { initialOTPInput } from '@/constant';
import { toEnglishNumber } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../Button';

interface IOTPActivePanelModalProps extends IBaseModalConfiguration {}

const OTPActivePanelModal = forwardRef<HTMLDivElement, IOTPActivePanelModalProps>((props, ref) => {
    const { t } = useTranslation();

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

    const { register, handleSubmit, getValues, watch, setFocus } = useForm<IOTPInputs>({
        defaultValues: initialOTPInput,
        resolver: yupResolver(schema),
    });

    const { otpActivePanelModal, toggleOtpActivePanelModal, toggleSelectStrategyModal } = useModalStore(
        (state) => state,
    );

    const onCloseModal = () => {
        toggleOtpActivePanelModal(null);
        // setMinimizeTab(minimizeTab.filter((item) => item !== 'select_strategy_modal'));
    };

    const onMinimize = () => {
        // setMinimizeTab(['select_strategy_modal']);
        // setAddSupplierModal({ minimize: true });
        onCloseModal();
    };

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
                onCloseModal();
                toggleSelectStrategyModal({});
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            minimize={otpActivePanelModal?.minimize}
            moveable={otpActivePanelModal?.moveable}
            onMinimize={onMinimize}
            size='sm'
            onClose={onCloseModal}
            ref={ref}
            {...props}
        >
            <div className='flex flex-col'>
                <Header label={t('OTP_active_panel_modal.title')} onClose={onCloseModal} onMinimize={onMinimize} />

                <div className='flex flex-col gap-32 bg-background-200 p-16 py-24 dark:bg-dark-background-200'>
                    <div className='flex  flex-col gap-48 rounded-md  '>
                        <div className=' flex flex-col  gap-16'>
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
                                        {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds} تا درخواست مجدد کد
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

                            <div className='flex items-center gap-16 pt-16'>
                                <Button
                                    onClick={() => {
                                        onCloseModal();
                                    }}
                                    type='button'
                                    className='btn-primary-outline w-4/12 rounded-md p-16 py-12'
                                >
                                    انصراف
                                </Button>
                                <Button type='submit' className='btn-primary w-8/12 rounded-md p-16 py-12'>
                                    ادامه
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default OTPActivePanelModal;
