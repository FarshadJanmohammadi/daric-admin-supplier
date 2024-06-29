export const initialAddEditSupplierInputs = {
    supplierName: '',
    nationalCode: '',
    mobileNumber: '',
    active: {},
    status: {},
    guarantee: '',
    cardNumber: '',
};

export const initialSupplierFilters = {
    name: '',
    nationalCode: '',
    mobileNumber: '',
};

export const initialMarketLivePageSetting = {
    pageNumber: 1,
    pageSize: 25,
};

export const initialManualStrategyInputs: Strategy.IManualStrategyInputs = {
    buyPrice: '',
    sellPrice: '',
    buyVolume: '',
    sellVolume: '',
    amountAlert: '',
};

export const initialAutoStrategyInputs: Strategy.IAutoStrategyInputs = {
    buySpread: '',
    sellSpread: '',
    buyVolume: '',
    sellVolume: '',
    amountAlert: '',
};
