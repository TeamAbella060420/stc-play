import { create } from 'zustand';

interface UseShopProps {
    activeTab: number;
    setActiveTab: (id: number) => void;
    activeFilter: string;
    setActiveFilter: (value: string) => void;
}
const useShop = create<UseShopProps>((set) => ({
    activeTab: 1,
    activeFilter: '',
    setActiveFilter: (filter: string) => set((state: UseShopProps) => ({...state, activeFilter: filter})),
    setActiveTab: (id) => set((state: UseShopProps) => ({...state, activeTab: id})),
}));
 
export default useShop;