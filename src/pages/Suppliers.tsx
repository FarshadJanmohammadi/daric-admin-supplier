import { useSuppliersReportsQuery } from '@/api/queries/supplierQuery';
import LightweightTable, { IColDef } from '@/components/common/Table/LightWeightTable';
import { EditSVG, EraserSVG, PlusSVG, TrashSVG, XFillSVG } from '@/components/icons';
import useModalStore from '@/features/useModalStore';
import { ISuppliersMock } from '@/mock';
import { changePageTitle } from '@/utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

interface IInputFilter {
    name: string;
    nationalCode: string;
    mobileNumber: string;
}

const Suppliers = () => {
    const { t } = useTranslation();

    const { setAddSupplierModal, addSupplierModal } = useModalStore((store) => store);

    const schema = yup.object({
        name: yup.string().required(t('validation.this_field_is_required', { type: t('form.supplierName') })),
        nationalCode: yup.string().required(t('validation.this_field_is_required', { type: t('form.nationalCode') })),
        mobileNumber: yup.string().required(t('validation.this_field_is_required', { type: t('form.mobileNumber') })),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IInputFilter>({
        defaultValues: {
            name: '',
            nationalCode: '',
            mobileNumber: '',
        },
        resolver: yupResolver(schema),
    });

    const [isActiveSuppliers] = useState<boolean | null>(null);

    const { data: suppliersReportsData } = useSuppliersReportsQuery({
        queryKey: ['suppliersReportsQuery', isActiveSuppliers],
    });

    const columnDefs = useMemo<Array<IColDef<ISuppliersMock>>>(
        () => [
            {
                colId: 'id',
                headerName: t('suppliers_manage.id_column'),
                valueGetter: (_row, rowIndex) => String((rowIndex ?? 0) + 1),
            },
            {
                colId: 'name',
                headerName: t('suppliers_manage.name_column'),
                valueGetter: (row) => row.name,
            },
            {
                colId: 'nationalCode',
                headerName: t('suppliers_manage.national_code_column'),
                valueGetter: (row) => row.nationalCode,
            },
            {
                colId: 'mobileNumber',
                headerName: t('suppliers_manage.mobile_number_column'),
                valueGetter: (row) => row.mobileNumber,
                cellClass: '!text-sm',
            },
            {
                colId: 'action',
                headerName: t('suppliers_manage.action_column'),
                valueGetter: (row) => row.id,
                valueFormatter: () => (
                    <div className='flex items-center justify-center gap-16 text-icons-100 dark:text-dark-icons-100'>
                        <EditSVG width='1.8rem' height='1.8rem' />
                        <TrashSVG width='2rem' height='2rem' />
                    </div>
                ),
                cellClass: '!text-sm',
            },
        ],
        [],
    );

    const onOpenModal = () => {
        if (typeof addSupplierModal?.minimize === 'boolean') {
            setAddSupplierModal({ minimize: false, moveable: true });
        } else {
            setAddSupplierModal({ moveable: true });
        }
    };

    const onSubmit = async () => {
        //
    };

    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.suppliers'));
    }, []);

    return (
        <div className=' flex flex-1 flex-col gap-16 rounded bg-background-200 p-16 dark:bg-dark-background-200'>
            <div className='flex items-center justify-between'>
                <span className='text-xl font-medium text-text-100 dark:text-dark-text-100'>مدیریت تامین کنندگان</span>
                <div className='flex items-center gap-16'>
                    <button
                        onClick={onOpenModal}
                        className='flex items-center justify-center gap-8 rounded-md bg-brand-200 px-16 py-8 text-center text-dark-text-100 dark:bg-dark-brand-200'
                    >
                        <PlusSVG width='2rem' height='2rem' />
                        <span className='text-base font-bold'>افزودن تامین کننده</span>
                    </button>
                </div>
            </div>
            <div
                style={{ minWidth: '100%', minHeight: '0.1rem' }}
                className='bg-brand-200/20 dark:bg-dark-brand-200/20'
            />
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-16 py-16'>
                <div className='flex w-9/12 flex-1 items-center gap-16'>
                    <div className='relative flex flex-1 flex-col gap-8'>
                        <div className={clsx('input-group z-20 flex-1', errors.name && 'error')}>
                            <input
                                {...register('name')}
                                className='w-full bg-transparent p-12'
                                placeholder='نام تامین کننده'
                                type='text'
                            />
                        </div>
                        <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                            <AnimatePresence>
                                {errors.name && (
                                    <motion.div
                                        initial={{ y: -30 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -30 }}
                                        className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                    >
                                        <XFillSVG width='1.6rem' height='1.6rem' />
                                        <span>{errors.name?.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className='relative flex flex-1 flex-col gap-8'>
                        <div className={clsx('input-group z-20 flex-1', errors.nationalCode && 'error')}>
                            <input
                                {...register('nationalCode')}
                                className='w-full bg-transparent p-12'
                                placeholder='کدملی'
                                type='text'
                            />
                        </div>
                        <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                            <AnimatePresence>
                                {errors.nationalCode && (
                                    <motion.div
                                        initial={{ y: -30 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -30 }}
                                        className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                    >
                                        <XFillSVG width='1.6rem' height='1.6rem' />
                                        <span>{errors.nationalCode?.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className='relative flex flex-1 flex-col gap-8'>
                        <div className={clsx('input-group z-20 flex-1', errors.mobileNumber && 'error')}>
                            <input
                                {...register('mobileNumber')}
                                className='w-full bg-transparent p-12'
                                placeholder='شماره همراه'
                                type='text'
                            />
                        </div>
                        <div style={{ top: '5.4rem' }} className='absolute right-0 z-10'>
                            <AnimatePresence>
                                {errors.mobileNumber && (
                                    <motion.div
                                        initial={{ y: -30 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -30 }}
                                        className=' z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                                    >
                                        <XFillSVG width='1.6rem' height='1.6rem' />
                                        <span>{errors.mobileNumber?.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className='flex  w-3/12 items-center gap-8'>
                    <button
                        onClick={() => reset()}
                        type='button'
                        className='rounded-md bg-background-900 p-12 px-16 text-text-100 dark:bg-dark-background-900 dark:text-dark-text-100 '
                    >
                        <EraserSVG />
                    </button>
                    <button
                        type='submit'
                        className='flex-1 rounded-md bg-background-900 p-12 px-48 text-text-100 dark:bg-dark-background-900 dark:text-dark-text-100 '
                    >
                        جستجو
                    </button>
                </div>
            </form>

            <div
                style={{ minWidth: '100%', minHeight: '0.1rem' }}
                className='bg-brand-200/20 dark:bg-dark-brand-200/20'
            />

            <div>
                <div className=' flex-1 rounded-sm p-8'>
                    <LightweightTable rowData={suppliersReportsData || []} columnDefs={columnDefs} />
                </div>
            </div>
        </div>
    );
};

export default Suppliers;
