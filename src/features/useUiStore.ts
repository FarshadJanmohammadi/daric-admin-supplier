import { create } from 'zustand';

interface IUiStore {
    sidebarToggle: boolean;
    setSidebarToggle: () => void;
}

const useUiStore = create<IUiStore>()((set) => ({
    // Sidebar
    sidebarToggle: false,
    setSidebarToggle: () => set((state) => ({ sidebarToggle: !state.sidebarToggle })),
}));

export default useUiStore;
