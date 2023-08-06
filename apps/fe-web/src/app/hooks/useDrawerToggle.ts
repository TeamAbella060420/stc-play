import { create } from 'zustand'

type useDrawerToggleType = {
    open: boolean;
    toggleDrawer: (value: boolean) => void;
}
const useDrawerToggle = create<useDrawerToggleType>((set) => ({
    open: false,
    toggleDrawer: (value) => set((state) => ({ ...state, open: value}))
  }))
 
export default useDrawerToggle;