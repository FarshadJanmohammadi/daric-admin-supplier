declare type TSortingMethods = 'asc' | 'desc';

declare namespace SuppliersManage {
    export interface IAddEditSupplierInputs {
        supplierName: string;
        nationalCode: string;
        mobileNumber: string;
        active: {
            value: string;
            label: string;
        };
        status: {
            value: string;
            label: string;
        };
        guarantee: string;
        cardNumber: string;
    }
}

declare namespace MarketLive {
    export interface IPageSetting {
        pageNumber: number;
        pageSize: number;
    }
}
