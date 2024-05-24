import { create } from 'zustand';

export interface IAddSupplierModal extends IBaseModalConfiguration {
    //
}

interface IModalStore {
    // Add and Edit Supplier
    addSupplierModal: IAddSupplierModal | null;
    setAddSupplierModal: (state: IAddSupplierModal | null) => void;
}

const useModalStore = create<IModalStore>()((set) => ({
    // Add and Edit Supplier
    addSupplierModal: null,
    setAddSupplierModal: (state: IAddSupplierModal | null) => set(() => ({ addSupplierModal: state })),
}));

export default useModalStore;
