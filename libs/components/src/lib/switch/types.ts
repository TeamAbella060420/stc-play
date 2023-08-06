export interface SwitchProps {
  thumbInActiveColor?: string;
  thumbActiveColor?: string;
  trackColor?: string;
  onToggle?: () => void;
  isOn?: boolean;
  disabled?: boolean;
}
