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

declare interface ISupplierInformation {
    id: number;
    name: string;
    nationalCode: string;
    mobileNumber: string;
    activeInActiveKind: boolean;
    status: boolean;
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

declare interface IMarketLiveReports {
    id: string;
    createDateTime: string;
    isRead: boolean;
    price: number;
    amount: number;
    pairId: string;
    side: 0 | 1;
}

declare interface IMarketLivePairList {
    id: string;
    selected: boolean;
    destinationCoinSymbol: string;
    destinationCoinName: string;
    destinationCoinNameFa: string;
    sourceCoinSymbol: string;
    sourceCoinName: string;
    sourceCoinNameFa: string;
    bestBuy: number;
    bestSell: number;
    isFavorite: boolean;
    increased: boolean;
    change: number;
    decimalLength: number;
    sourceCoinIcon: string;
    destinationIcon: string;
    destinationCategoryName: string;
    destinationCategorySymbol: string;
    destinationCategoryId: string;
    isLeverageToken: boolean;
    active: boolean;
    lowestRecentOrder: number;
    highestRecentOrder: number;
    todayTradeAmount: number;
    todayTradeTotal: number;
    lastOrderPrice: number;
    buyersDepth: number;
    sellersDepth: number;
    coinDecimalLength: number;
    globalPrice: number;
    platform: string;
}
