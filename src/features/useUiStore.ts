import { create } from 'zustand';

export type TMinimizeTab = 'add_supplier_modal';

interface IUiStore {
    // Sidebar
    sidebarToggle: boolean;
    setSidebarToggle: () => void;

    //MinimizeTab
    minimizeTab: Array<TMinimizeTab>;
    setMinimizeTab: (state: Array<TMinimizeTab>) => void;
}

const useUiStore = create<IUiStore>()((set) => ({
    // Sidebar
    sidebarToggle: false,
    setSidebarToggle: () => set((state) => ({ sidebarToggle: !state.sidebarToggle })),

    //MinimizeTab
    minimizeTab: [],
    setMinimizeTab: (value: Array<TMinimizeTab>) => set(() => ({ minimizeTab: [...value] })),
}));

export default useUiStore;
