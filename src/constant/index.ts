export const initialAddEditSupplierInputs: SuppliersManage.IAddEditSupplierInputs = {
    supplierName: '',
    nationalCode: '',
    mobileNumber: '',
    active: { value: 'active', label: 'فعال' },
    status: { value: 'approve', label: 'مجاز' },
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
    price: '',
    volume: '',
    amountAlert: '',
    validity: '',
};

export const initialAutoStrategyInputs: Strategy.IAutoStrategyInputs = {
    spread: '',
    volume: '',
    amountAlert: '',
    validity: new Date().getTime(),
};

export const weekDaysName = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export const initialOTPInput: IOTPInputs = {
    input1: '',
    input2: '',
    input3: '',
    input4: '',
};

export const initialFilterSupplierInputs: SuppliersManage.IFilterSupplierInputs = {
    mobileNumber: '',
    name: '',
    nationalCode: '',
};
