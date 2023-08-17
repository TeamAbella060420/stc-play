import { create } from 'zustand';

type UseDialogTogglePropsIsOpen = {
    [key: string]: boolean;
}
interface UseDialogToggleProps {
    isOpen: UseDialogTogglePropsIsOpen;
    setIsOpen: (id: string, value: boolean) => void;
}
const useDialogToggle = create<UseDialogToggleProps>((set) => ({
    isOpen: {},
    setIsOpen: (id: string, value: boolean) => set((state: UseDialogToggleProps) => ({ isOpen: { ...state.isOpen, [id]: value } })),
}))

export default useDialogToggle;