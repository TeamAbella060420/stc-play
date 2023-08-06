import { useSelector } from 'react-redux';

import { RootState } from '@fe-monorepo/store';
import { CSSProperties } from 'react';
import Spinner from './Spinner';
import { twMerge } from 'tailwind-merge';
interface buttonProps {
  style?: string;
  normalStyle?: string,
  text: string;
  disabled?: boolean;
  action?: Function;
  fullWidth?: boolean;
  isLoading?: boolean;
  onClick?: () => void | null | undefined;
  className?: string;
}

const Button = (props: buttonProps) => {
  const prefs = useSelector((state: RootState) => state?.app);
  const { isLoading, onClick = null } = props;
  const dir = prefs?.language === 'en' ? `ltr` : `rtl`;

  const action = () => {
    if (props.action) {
      props?.action();
    }
  };

  const widthStyle: CSSProperties = { width: props.fullWidth ? '100%' : undefined };
  const cssClassName = twMerge(`
    ${props?.style} ${props?.disabled? `cursor-not-allowed bg-black10 text-black30`: props?.normalStyle} button-animation-${dir}
  `, props.className)
  return (
    <button
        onClick={() => onClick ? onClick() : action() }
        style={widthStyle}
        className={cssClassName}
        disabled={props?.disabled || isLoading}
      >
        {isLoading && <Spinner/>}
        {!isLoading && props?.text}
      </button>
  );
};

export default Button;
