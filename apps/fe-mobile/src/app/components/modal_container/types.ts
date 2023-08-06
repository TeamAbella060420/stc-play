import { ModalProps } from 'react-native';
import { ReactNode } from 'react';

export interface ModalsProps extends ModalProps {
    children: ReactNode;
    isVisible: boolean;
    overlay?: boolean;
    overlayOpacity?: number;
    onClose: () => void;
    onOpen?: () => void;
}