import { create } from 'zustand'

interface useSearchInputProps {
    value: string;
    enableRecentSearch:boolean
    setValue: (value: string) => void;
    setEnableRecentSearch:(value:boolean) => void;
}
const useSearchInput = create<useSearchInputProps>((set) => ({
    value: '',
    enableRecentSearch: true,
    setValue: (value) => set((state) => ({ ...state, value})),
    setEnableRecentSearch:(value) => set((state) => ({ ...state, enableRecentSearch:value}))
  }))
export default useSearchInput;