declare interface ISuppliersReports {
    id: number;
    name: string;
    nationalCode: string;
    mobileNumber: string;
    activeInActiveKind: boolean;
    status: boolean | null;
    guarantee: number;
    cardNumber: string;
}

declare interface ILogin {
    token: string;
}

declare interface IAddSupplier {
    id: number;
    name: string;
    nationalCode: string;
    mobileNumber: string;
    activeInActiveKind: boolean;
    status: boolean;
    guarantee: number;
    cardNumber: string;
}
