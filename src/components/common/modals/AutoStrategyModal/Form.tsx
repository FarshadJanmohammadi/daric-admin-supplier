import { XFillSVG, XSVG } from '@/components/icons';
import useModalStore from '@/features/useModalStore';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Control,
    FieldErrors,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetFocus,
    UseFormSetValue,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../../Button';

interface IFormProps {
    register: UseFormRegister<Strategy.IAutoStrategyInputs>;
    onCloseModal: () => void;
    onSubmit: SubmitHandler<Strategy.IAutoStrategyInputs>;
    handleSubmit: UseFormHandleSubmit<Strategy.IAutoStrategyInputs, undefined>;
    errors: FieldErrors<Strategy.IAutoStrategyInputs>;
    watch: UseFormWatch<Strategy.IAutoStrategyInputs>;
    setValue: UseFormSetValue<Strategy.IAutoStrategyInputs>;
    trigger: UseFormTrigger<Strategy.IAutoStrategyInputs>;
    setFocus: UseFormSetFocus<Strategy.IAutoStrategyInputs>;
    control: Control<Strategy.IAutoStrategyInputs, unknown>;
    loading: boolean;
}

const Form = ({
    register,
    onCloseModal,
    onSubmit,
    handleSubmit,
    errors,
    watch,
    setValue,
    trigger,
    setFocus,
    // control,
    loading,
}: IFormProps) => {
    const { t } = useTranslation();

    const { toggleSelectStrategyModal } = useModalStore((state) => state);

    const onResetField = (input: 'buySpread' | 'sellSpread' | 'buyVolume' | 'sellVolume' | 'amountAlert') => {
        setValue(input, '');
        trigger(input);
        setFocus(input);
    };

    return (
        <form
            method='get'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-36 bg-background-200 p-16 py-24 dark:bg-dark-background-200'
        >
            <div className='relative flex flex-col gap-8'>
                <div
                    className={clsx(
                        'input-group z-20 flex items-center justify-between pl-12',
                        errors.buySpread && 'error',
                    )}
                >
                    <input
                        className='w-full p-12'
                        {...register('buySpread')}
                        placeholder='اسپرد خرید'
                        autoComplete='off'
                    />

                    {watch('buySpread') && (
                        <button
                            className={clsx('transition-colors', {
                                'text-icons-200 dark:text-dark-icons-200': !errors.buySpread,
                                'text-error-300 dark:text-dark-error-300': errors.buySpread,
                            })}
                            type='button'
                            onClick={() => onResetField('buySpread')}
                        >
                            <XSVG width='1.8rem' height='1.8rem' />
                        </button>
                    )}
                </div>
                <div style={{ top: '5.4rem' }} className='absolute right-0 z-10 '>
                    <AnimatePresence>
                        {errors.buySpread && (
                            <motion.div
                                initial={{ y: -30 }}
                                animate={{ y: 0 }}
                                exit={{ y: -30 }}
                                className=' flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                            >
                                <XFillSVG width='1.6rem' height='1.6rem' />
                                <span>{errors.buySpread?.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className=' flex items-center gap-16'>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div
                        className={clsx(
                            'input-group z-20 flex flex-1 items-center justify-between pl-12',
                            errors.sellSpread && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('sellSpread')}
                            placeholder='اسپرد فروش'
                            autoComplete='off'
                        />
                        {watch('sellSpread') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.sellSpread,
                                    'text-error-300 dark:text-dark-error-300': errors.sellSpread,
                                })}
                                type='button'
                                onClick={() => onResetField('sellSpread')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                        <AnimatePresence>
                            {errors.sellSpread && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className='  flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.sellSpread?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div
                        className={clsx(
                            'input-group z-20 flex flex-1 items-center justify-between pl-12',
                            errors.buyVolume && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('buyVolume')}
                            placeholder='حجم خرید'
                            autoComplete='off'
                        />
                        {watch('buyVolume') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.buyVolume,
                                    'text-error-300 dark:text-dark-error-300': errors.buyVolume,
                                })}
                                type='button'
                                onClick={() => onResetField('buyVolume')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10 '>
                        <AnimatePresence>
                            {errors.buyVolume && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.buyVolume?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-16'>
                <div className='relative  flex flex-1 flex-col gap-8'>
                    <div
                        className={clsx(
                            'input-group z-20 flex flex-1 items-center justify-between pl-12',
                            errors.sellVolume && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('sellVolume')}
                            placeholder='حجم فروش'
                            autoComplete='off'
                        />

                        {watch('sellVolume') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.sellVolume,
                                    'text-error-300 dark:text-dark-error-300': errors.sellVolume,
                                })}
                                type='button'
                                onClick={() => onResetField('sellVolume')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute  right-0 z-10'>
                        <AnimatePresence>
                            {errors.sellVolume && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.sellVolume?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div
                        className={clsx(
                            'input-group z-20 flex flex-1 items-center justify-between pl-12',
                            errors.amountAlert && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('amountAlert')}
                            placeholder='مقدار هشدار'
                            autoComplete='off'
                        />

                        {watch('amountAlert') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.amountAlert,
                                    'text-error-300 dark:text-dark-error-300': errors.amountAlert,
                                })}
                                type='button'
                                onClick={() => onResetField('amountAlert')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                        <AnimatePresence>
                            {errors.amountAlert && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.amountAlert?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-16 pt-16'>
                <Button
                    onClick={() => {
                        onCloseModal();
                        toggleSelectStrategyModal({});
                    }}
                    loading={loading}
                    type='button'
                    className='btn-primary-outline w-4/12 rounded-md p-16 py-12'
                >
                    مرحله قبل
                </Button>
                <Button
                    loading={loading}
                    disabled={'userName' in errors || 'password' in errors}
                    type='submit'
                    className='btn-primary w-8/12 rounded-md p-16 py-12'
                >
                    {t('common.add')}
                </Button>
            </div>
        </form>
    );
};

export default Form;
