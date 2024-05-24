import Input from '@/components/common/Inptuts/Input';
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from '@/components/common/Popover';
import LightweightTable, { IColDef } from '@/components/common/Table/LightWeightTable';
import { ArrowDownSVG, EditSVG, PlusSVG, TrashSVG } from '@/components/icons';
import useInputs from '@/hooks/useInputs';
import { ISuppliersMock, suppliersMock } from '@/mock';
import { sepNumbers } from '@/utils/helpers';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const initialInputs = {
    name: '',
    nationalCode: '',
    mobileNumber: '',
};

const SupplierManage = () => {
    const { t } = useTranslation();

    const { inputs, setFieldValue, setFieldsValue } = useInputs<{
        name: string;
        nationalCode: string;
        mobileNumber: string;
    }>(initialInputs);

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

    return (
        <div className='flex flex-1 flex-col gap-16 rounded bg-background-200 p-16 dark:bg-dark-background-200'>
            <div className='flex items-center justify-between'>
                <span className='text-xl font-medium text-text-100 dark:text-dark-text-100'>مدیریت تامین کنندگان</span>
                <div className='flex items-center gap-16'>
                    <Popover placement='bottom'>
                        <PopoverTrigger>
                            <button className='flex items-center justify-center rounded-md border border-brand-200 bg-transparent px-16 py-8 text-text-100 dark:border-dark-brand-200 dark:text-dark-text-100'>
                                <ArrowDownSVG width='2rem' height='2rem' />
                                <span>خروجی</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className=' flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'>
                            {/* <PopoverHeading className='text-base font-bold text-text-100 dark:text-dark-text-100'>
                                
                            </PopoverHeading> */}
                            <PopoverDescription className='flex flex-col gap-8 text-center text-text-200 dark:text-dark-text-200'>
                                <button className='flex items-center gap-8 text-text-100 dark:text-dark-text-100'>
                                    <span>اکسل</span>
                                </button>
                                <button className='flex items-center gap-8 text-text-100 dark:text-dark-text-100'>
                                    <span>پی دی اف</span>
                                </button>
                            </PopoverDescription>
                        </PopoverContent>
                    </Popover>
                    <button className='flex items-center justify-center gap-8 rounded-md bg-brand-200 px-16 py-8 text-center text-dark-text-100 dark:bg-dark-brand-200'>
                        <PlusSVG width='2rem' height='2rem' />
                        <span className='text-base font-bold'>اضافه‌کردن تامین‌کنده</span>
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
                />
                <Input
                    value={inputs.nationalCode}
                    onChange={(v) => setFieldValue('nationalCode', v)}
                    classes={{
                        root: 'flex-1',
                    }}
                    placeholder='کدملی'
                    type='text'
                />
                <Input
                    value={inputs.mobileNumber}
                    onChange={(v) => setFieldValue('mobileNumber', v)}
                    classes={{ root: 'flex-1' }}
                    placeholder='شماره همراه'
                    type='text'
                />
                <div className='flex flex-1 items-center gap-8'>
                    <button
                        onClick={() => setFieldsValue(initialInputs)}
                        className='border-success-300 dark:border-dark-success-300 rounded-md border  bg-transparent p-10 px-16 text-dark-text-100'
                    >
                        پیش فرض
                    </button>
                    <button className='bg-success-300 dark:bg-dark-success-300 flex-1 rounded-md  bg-transparent p-12 px-32 text-dark-text-100 '>
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
