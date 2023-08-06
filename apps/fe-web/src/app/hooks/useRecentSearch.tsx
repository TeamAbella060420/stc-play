import { create } from 'zustand';


interface UseRecentSearchProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    revalidateData: boolean;
    setRevalidateData: (value: boolean) => void;
}
const useRecentSearch = create<UseRecentSearchProps>((set) => ({
    isOpen: false,
    setIsOpen: (value: boolean) => set((state: UseRecentSearchProps) => ({...state, isOpen: value})),
    revalidateData: false,
    setRevalidateData: (value: boolean) => set((state:UseRecentSearchProps) => ({...state, revalidateData: value}))
}))
 
export default useRecentSearch;