import { create } from 'zustand';

interface UseToggleSearchProps {
    showSearchInput: boolean;
    setShowSearchInput: () => void;
}
const useToggleSearch = create<UseToggleSearchProps>((set) => ({
    showSearchInput: false,
    setShowSearchInput: () => set((state: UseToggleSearchProps) => ({showSearchInput: !state.showSearchInput })),
}))
 
export default useToggleSearch;