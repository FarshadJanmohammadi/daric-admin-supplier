import { XFillSVG, XSVG } from '@/components/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Control,
    Controller,
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
import Select from '../../Inputs/Select';

interface IFormProps {
    register: UseFormRegister<SuppliersManage.IAddEditSupplierInputs>;
    onCloseModal: () => void;
    onSubmit: SubmitHandler<SuppliersManage.IAddEditSupplierInputs>;
    handleSubmit: UseFormHandleSubmit<SuppliersManage.IAddEditSupplierInputs, undefined>;
    errors: FieldErrors<SuppliersManage.IAddEditSupplierInputs>;
    watch: UseFormWatch<SuppliersManage.IAddEditSupplierInputs>;
    setValue: UseFormSetValue<SuppliersManage.IAddEditSupplierInputs>;
    trigger: UseFormTrigger<SuppliersManage.IAddEditSupplierInputs>;
    setFocus: UseFormSetFocus<SuppliersManage.IAddEditSupplierInputs>;
    control: Control<SuppliersManage.IAddEditSupplierInputs, unknown>;
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
    control,
    loading,
}: IFormProps) => {
    const { t } = useTranslation();

    const onResetField = (
        input: 'supplierName' | 'nationalCode' | 'mobileNumber' | 'active' | 'status' | 'guarantee' | 'cardNumber',
    ) => {
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
                        errors.supplierName && 'error',
                    )}
                >
                    <input
                        className='w-full p-12'
                        {...register('supplierName')}
                        placeholder='نام تامین کنندگان'
                        autoComplete='off'
                    />

                    {watch('supplierName') && (
                        <button
                            className={clsx('transition-colors', {
                                'text-icons-200 dark:text-dark-icons-200': !errors.supplierName,
                                'text-error-300 dark:text-dark-error-300': errors.supplierName,
                            })}
                            type='button'
                            onClick={() => onResetField('supplierName')}
                        >
                            <XSVG width='1.8rem' height='1.8rem' />
                        </button>
                    )}
                </div>
                <div style={{ top: '5.4rem' }} className='absolute right-0 z-10 '>
                    <AnimatePresence>
                        {errors.supplierName && (
                            <motion.div
                                initial={{ y: -30 }}
                                animate={{ y: 0 }}
                                exit={{ y: -30 }}
                                className=' flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                            >
                                <XFillSVG width='1.6rem' height='1.6rem' />
                                <span>{errors.supplierName?.message}</span>
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
                            errors.nationalCode && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('nationalCode')}
                            placeholder='کدملی'
                            autoComplete='off'
                        />
                        {watch('nationalCode') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.nationalCode,
                                    'text-error-300 dark:text-dark-error-300': errors.nationalCode,
                                })}
                                type='button'
                                onClick={() => onResetField('nationalCode')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                        <AnimatePresence>
                            {errors.nationalCode && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className='  flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.nationalCode?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div
                        className={clsx(
                            'input-group z-20 flex flex-1 items-center justify-between pl-12',
                            errors.mobileNumber && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('mobileNumber')}
                            placeholder='شماره همراه'
                            autoComplete='off'
                        />
                        {watch('mobileNumber') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.mobileNumber,
                                    'text-error-300 dark:text-dark-error-300': errors.mobileNumber,
                                })}
                                type='button'
                                onClick={() => onResetField('mobileNumber')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10 '>
                        <AnimatePresence>
                            {errors.mobileNumber && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.mobileNumber?.message}</span>
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
                            errors.guarantee && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('guarantee')}
                            placeholder='سقف مجاز'
                            autoComplete='off'
                        />

                        {watch('guarantee') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.guarantee,
                                    'text-error-300 dark:text-dark-error-300': errors.guarantee,
                                })}
                                type='button'
                                onClick={() => onResetField('guarantee')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute  right-0 z-10'>
                        <AnimatePresence>
                            {errors.guarantee && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.guarantee?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div
                        className={clsx(
                            'input-group z-20 flex flex-1 items-center justify-between pl-12',
                            errors.cardNumber && 'error',
                        )}
                    >
                        <input
                            className='w-full p-12'
                            {...register('cardNumber')}
                            placeholder='شماره ثبت'
                            autoComplete='off'
                        />

                        {watch('cardNumber') && (
                            <button
                                className={clsx('transition-colors', {
                                    'text-icons-200 dark:text-dark-icons-200': !errors.cardNumber,
                                    'text-error-300 dark:text-dark-error-300': errors.cardNumber,
                                })}
                                type='button'
                                onClick={() => onResetField('cardNumber')}
                            >
                                <XSVG width='1.8rem' height='1.8rem' />
                            </button>
                        )}
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                        <AnimatePresence>
                            {errors.cardNumber && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.cardNumber?.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-16'>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div className={clsx('input-group z-20 flex-1', errors.active && 'error')}>
                        <Controller
                            name='active'
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    onChange={field.onChange}
                                    options={[
                                        { value: 'active', label: 'active' },
                                        { value: 'notActive', label: 'notActive' },
                                    ]}
                                    placeholder='نوع فعالسازی'
                                />
                            )}
                        />
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                        <AnimatePresence>
                            {errors.active?.value && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.active?.value.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='relative flex flex-1 flex-col gap-8'>
                    <div className={clsx('input-group z-20 flex-1', errors.active && 'error')}>
                        <Controller
                            name='status'
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    onChange={field.onChange}
                                    options={[
                                        { value: 'approve', label: 'approve' },
                                        { value: 'notApprove', label: 'notApprove' },
                                    ]}
                                    placeholder='وضعیت'
                                />
                            )}
                        />
                    </div>
                    <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                        <AnimatePresence>
                            {errors.status?.value && (
                                <motion.div
                                    initial={{ y: -30 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -30 }}
                                    className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                >
                                    <XFillSVG width='1.6rem' height='1.6rem' />
                                    <span>{errors.status?.value.message}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-16 pt-16'>
                <button
                    onClick={onCloseModal}
                    type='button'
                    className=' rounded-md border border-brand-200 px-32 py-16 text-base font-semibold text-brand-200 dark:border-r-dark-brand-200 dark:text-dark-brand-200'
                >
                    {t('common.cancel')}
                </button>
                <Button
                    loading={loading}
                    disabled={'userName' in errors || 'password' in errors}
                    type='submit'
                    className='btn-primary w-full rounded-md p-16'
                >
                    {t('common.add')}
                </Button>
            </div>
        </form>
    );
};

export default Form;
