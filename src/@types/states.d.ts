declare type TSortingMethods = 'asc' | 'desc';

declare namespace SuppliersManage {
    export interface IAddEditSupplierInputs {
        supplierName: string;
        nationalCode: string;
        mobileNumber: string;
        active: boolean | null;
        status: boolean | null;
        guarantee: string;
        cardNumber: string;
    }
}
