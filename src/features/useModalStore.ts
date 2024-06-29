import { create } from 'zustand';

export interface IAddSupplierModal extends IBaseModalConfiguration {
    //
}

export interface ISelectStrategyModal extends IBaseModalConfiguration {
    //
}

export interface IManualStrategyModal extends IBaseModalConfiguration {
    //
}

export interface IAutoStrategyModal extends IBaseModalConfiguration {
    //
}

export interface IConfirmActivePanelModal extends IBaseModalConfiguration {
    //
}

export interface IOTPActivePanelModal extends IBaseModalConfiguration {
    //
}

interface IModalStore {
    // Add and Edit Supplier
    addSupplierModal: IAddSupplierModal | null;
    setAddSupplierModal: (state: IAddSupplierModal | null) => void;

    // confirm Active Panel
    confirmActivePanelModal: IConfirmActivePanelModal | null;
    toggleConfirmActivePanelModal: (state: IConfirmActivePanelModal | null) => void;

    // OTP Active Panel
    otpActivePanelModal: IOTPActivePanelModal | null;
    toggleOtpActivePanelModal: (state: IOTPActivePanelModal | null) => void;

    // Select strategy
    selectStrategyModal: ISelectStrategyModal | null;
    toggleSelectStrategyModal: (state: ISelectStrategyModal | null) => void;

    // Manual Strategy
    manualStrategyModal: IManualStrategyModal | null;
    toggleManualStrategyModal: (state: IManualStrategyModal | null) => void;

    // Auto Strategy
    autoStrategyModal: IAutoStrategyModal | null;
    toggleAutoStrategyModal: (state: IAutoStrategyModal | null) => void;
}

const useModalStore = create<IModalStore>()((set) => ({
    // Add and Edit Supplier
    addSupplierModal: null,
    setAddSupplierModal: (state: IAddSupplierModal | null) => set(() => ({ addSupplierModal: state })),

    // confirm Active Panel
    confirmActivePanelModal: null,
    toggleConfirmActivePanelModal: (state: IConfirmActivePanelModal | null) =>
        set(() => ({ confirmActivePanelModal: state })),

    // OTP Active Panel
    otpActivePanelModal: null,
    toggleOtpActivePanelModal: (state: IOTPActivePanelModal | null) => set(() => ({ otpActivePanelModal: state })),

    // Select strategy
    selectStrategyModal: null,
    toggleSelectStrategyModal: (state: ISelectStrategyModal | null) => set(() => ({ selectStrategyModal: state })),

    // Manual Strategy
    manualStrategyModal: null,
    toggleManualStrategyModal: (state: IManualStrategyModal | null) => set(() => ({ manualStrategyModal: state })),

    // Auto Strategy
    autoStrategyModal: null,
    toggleAutoStrategyModal: (state: IAutoStrategyModal | null) => set(() => ({ autoStrategyModal: state })),
}));

export default useModalStore;
