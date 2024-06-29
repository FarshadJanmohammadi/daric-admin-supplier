import { create } from 'zustand';

export type TMinimizeTab = 'add_supplier_modal' | 'confirm_active_panel_modal' | 'select_strategy_modal';

interface IUiStore {
    // Sidebar
    sidebarToggle: boolean;
    setSidebarToggle: () => void;

    // Active Panel
    activePanel: boolean;
    setActivePanel: () => void;

    //MinimizeTab
    minimizeTab: Array<TMinimizeTab>;
    setMinimizeTab: (state: Array<TMinimizeTab>) => void;
}

const useUiStore = create<IUiStore>()((set) => ({
    // Sidebar
    sidebarToggle: false,
    setSidebarToggle: () => set((state) => ({ sidebarToggle: !state.sidebarToggle })),

    // Active Panel
    activePanel: false,
    setActivePanel: () => set((state) => ({ activePanel: !state.activePanel })),

    //MinimizeTab
    minimizeTab: [],
    setMinimizeTab: (value: Array<TMinimizeTab>) => set(() => ({ minimizeTab: [...value] })),
}));

export default useUiStore;
