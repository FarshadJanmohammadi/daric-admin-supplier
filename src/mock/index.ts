export interface ISuppliersMock {
    id: number;
    name: string;
    nationalCode: number;
    mobileNumber: number;
    action: '';
}

export const suppliersMock: ISuppliersMock[] = [
    {
        id: 1,
        name: 'محمدحسین رضایی',
        mobileNumber: 9122476534,
        nationalCode: 2999346576,
        action: '',
    },
    {
        id: 2,
        name: 'حسن رحیمی',
        mobileNumber: 9172346574,
        nationalCode: 2347682789,
        action: '',
    },
    {
        id: 3,
        name: 'رحمان احمدی',
        mobileNumber: 9134598439,
        nationalCode: 4000246573,
        action: '',
    },
    {
        id: 4,
        name: 'حسین فهیمی',
        mobileNumber: 9173450987,
        nationalCode: 1001238765,
        action: '',
    },
    {
        id: 5,
        name: 'رضا نمازی',
        mobileNumber: 9162345065,
        nationalCode: 9870345623,
        action: '',
    },
];
