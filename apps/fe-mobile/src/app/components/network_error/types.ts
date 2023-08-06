export type networkErrorComponentProps = {
  isVisible?: boolean;
  hastimer?: boolean;
  timer?: number;
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  linkText?: string;
  buttonLabel?: string;
  onLinkPress?: () => void;
  closeModal?: () => void;
  onRefresh?: () => void;
};
