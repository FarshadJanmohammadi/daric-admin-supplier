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

    export interface IFilterSupplierInputs {
        name: string;
        nationalCode: string;
        mobileNumber: string;
    }
}

declare namespace MarketLive {
    export interface IPageSetting {
        pageNumber: number;
        pageSize: number;
    }
}

declare namespace Strategy {
    export interface IManualStrategyInputs {
        price: string;
        volume: string;
        amountAlert: string;
        validity: number | string | Date;
    }

    export interface IAutoStrategyInputs {
        spread: string;
        volume: string;
        amountAlert: string;
        validity: number | string | Date;
    }
}

declare interface IOTPInputs {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
}
