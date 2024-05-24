import { create } from 'zustand';

interface IUiStore {
    // Sidebar
    sidebarToggle: boolean;
    setSidebarToggle: () => void;

    //MinimizeTab
    minimizeTab: Array<string>;
    setMinimizeTab: (state: Array<string>) => void;
}

const useUiStore = create<IUiStore>()((set) => ({
    // Sidebar
    sidebarToggle: false,
    setSidebarToggle: () => set((state) => ({ sidebarToggle: !state.sidebarToggle })),

    //MinimizeTab
    minimizeTab: [],
    setMinimizeTab: (value: Array<string>) => set(() => ({ minimizeTab: [...value] })),
}));

export default useUiStore;
