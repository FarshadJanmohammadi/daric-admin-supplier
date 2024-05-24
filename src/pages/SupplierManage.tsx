import Input from '@/components/common/Inputs/Input';
import LightweightTable, { IColDef } from '@/components/common/Table/LightWeightTable';
import { EditSVG, EraserSVG, PlusSVG, TrashSVG } from '@/components/icons';
import { initialSupplierFilters } from '@/constant';
import useModalStore from '@/features/useModalStore';
import useInputs from '@/hooks/useInputs';
import { ISuppliersMock, suppliersMock } from '@/mock';
import { changePageTitle, sepNumbers } from '@/utils/helpers';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const SupplierManage = () => {
    const { t } = useTranslation();

    const { setAddSupplierModal } = useModalStore((store) => store);

    const { inputs, setFieldValue, setFieldsValue } = useInputs<{
        name: string;
        nationalCode: string;
        mobileNumber: string;
    }>(initialSupplierFilters);

    const columnDefs = useMemo<Array<IColDef<ISuppliersMock>>>(
        () => [
            {
                headerName: t('suppliers_manage.id_column'),
                valueFormatter: (row) => sepNumbers(String(row.id)),
                // headerClass: '!bg-white',
            },
            {
                headerName: t('suppliers_manage.name_column'),
                valueFormatter: (row) => row.name,
                // headerClass: '!bg-white',
            },
            {
                headerName: t('suppliers_manage.national_code_column'),
                valueFormatter: (row) => row.nationalCode,
                // headerClass: '!bg-white',
            },
            {
                headerName: t('suppliers_manage.mobile_number_column'),
                valueFormatter: (row) => row.mobileNumber,
                // headerClass: '!bg-white',
                cellClass: '!text-sm',
            },
            {
                headerName: t('suppliers_manage.action_column'),
                valueFormatter: () => (
                    <div className='flex items-center justify-center gap-16 text-icons-100 dark:text-dark-icons-100'>
                        <EditSVG width='1.8rem' height='1.8rem' />
                        <TrashSVG width='2rem' height='2rem' />
                    </div>
                ),
                // headerClass: '!bg-white',
                cellClass: '!text-sm',
            },
        ],
        [],
    );

    // Change Page Title
    useEffect(() => {
        changePageTitle(t('pages.suppliers_manage'));
    }, []);

    return (
        <div className='flex flex-1 flex-col gap-16 rounded bg-background-200 p-16 dark:bg-dark-background-200'>
            <div className='flex items-center justify-between'>
                <span className='text-xl font-medium text-text-100 dark:text-dark-text-100'>مدیریت تامین کنندگان</span>
                <div className='flex items-center gap-16'>
                    <button
                        onClick={() => setAddSupplierModal({ moveable: true })}
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
            <div className='flex items-center gap-16 py-8'>
                <Input
                    value={inputs.name}
                    onChange={(v) => setFieldValue('name', v)}
                    classes={{ root: 'flex-1' }}
                    placeholder='نام تامین کننده'
                    type='text'
                    id='name'
                />
                <Input
                    value={inputs.nationalCode}
                    onChange={(v) => setFieldValue('nationalCode', v)}
                    classes={{
                        root: 'flex-1',
                    }}
                    placeholder='کدملی'
                    type='text'
                    id='nationalCode'
                />
                <Input
                    value={inputs.mobileNumber}
                    onChange={(v) => setFieldValue('mobileNumber', v)}
                    classes={{ root: 'flex-1' }}
                    placeholder='شماره همراه'
                    type='text'
                    id='mobileNumber'
                />
                <div className='flex  flex-1 items-center gap-8'>
                    <button
                        onClick={() => setFieldsValue(initialSupplierFilters)}
                        className='rounded-md bg-background-900 p-12 px-16 text-text-100 dark:bg-dark-background-900 dark:text-dark-text-100 '
                    >
                        <EraserSVG />
                    </button>
                    <button className='flex-1 rounded-md bg-background-900 p-12 px-32 text-text-100 dark:bg-dark-background-900 dark:text-dark-text-100 '>
                        جستجو
                    </button>
                </div>
            </div>

            <div
                style={{ minWidth: '100%', minHeight: '0.1rem' }}
                className='bg-brand-200/20 dark:bg-dark-brand-200/20'
            />

            <div>
                <div className=' flex-1 rounded-sm p-8'>
                    <LightweightTable rowData={suppliersMock || []} columnDefs={columnDefs} />
                </div>
            </div>
        </div>
    );
};

export default SupplierManage;
