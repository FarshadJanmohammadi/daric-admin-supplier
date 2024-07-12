import { useSuppliersReportsQuery } from '@/api/queries/supplierQuery';
import Input from '@/components/common/Inputs/Input';
import NoData from '@/components/common/NoData';
import LightweightTable, { IColDef } from '@/components/common/Table/LightWeightTable';
import { EditSVG, EraserSVG, PlusSVG, TrashSVG } from '@/components/icons';
import { initialFilterSupplierInputs } from '@/constant';
import useModalStore from '@/features/useModalStore';
import { useInputs } from '@/hooks';
import { ISuppliersMock } from '@/mock';
import { changePageTitle } from '@/utils/helpers';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Suppliers = () => {
    const { t } = useTranslation();

    const { setAddSupplierModal, addSupplierModal } = useModalStore((store) => store);

    const { inputs, setFieldValue, setFieldsValue } =
        useInputs<SuppliersManage.IFilterSupplierInputs>(initialFilterSupplierInputs);

    const [inputsAfterSubmit, setInputAfterSubmit] =
        useState<SuppliersManage.IFilterSupplierInputs>(initialFilterSupplierInputs);

    console.log(inputsAfterSubmit, 'inputsAfterSubmit');

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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputAfterSubmit(inputs);
    };

    const suppliersReportsDataFilter = useMemo(() => {
        if (!suppliersReportsData) return [];

        return suppliersReportsData.filter((item) => {
            if (
                item.name.includes(inputsAfterSubmit.name) &&
                item.mobileNumber.includes(inputsAfterSubmit.mobileNumber) &&
                item.nationalCode.includes(inputsAfterSubmit.nationalCode)
            )
                return item;
        });
    }, [suppliersReportsData, inputsAfterSubmit]);

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
            <form onSubmit={onSubmit} className='flex items-center gap-16 py-16'>
                <div className='flex w-9/12 flex-1 items-center gap-16'>
                    <Input
                        placeholder='نام تامین کننده'
                        type='text'
                        value={inputs.name}
                        onChange={(v) => setFieldValue('name', v)}
                    />
                    <Input
                        placeholder='کدملی'
                        type='number'
                        value={inputs.nationalCode}
                        onChange={(v) => setFieldValue('nationalCode', v)}
                    />
                    <Input
                        placeholder='شماره همراه'
                        type='number'
                        value={inputs.mobileNumber}
                        onChange={(v) => setFieldValue('mobileNumber', v)}
                    />
                </div>
                <div className='flex  w-3/12 items-center gap-8'>
                    <button
                        onClick={() => {
                            setFieldsValue(initialFilterSupplierInputs);
                            setInputAfterSubmit(initialFilterSupplierInputs);
                        }}
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
            {suppliersReportsDataFilter.length > 0 ? (
                <div className=' flex-1 rounded-sm p-8'>
                    <LightweightTable rowData={suppliersReportsDataFilter || []} columnDefs={columnDefs} />
                </div>
            ) : (
                <NoData />
            )}
        </div>
    );
};

export default Suppliers;
