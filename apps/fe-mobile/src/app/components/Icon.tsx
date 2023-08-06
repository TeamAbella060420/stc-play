import { memo } from 'react';
import { IconProps, getSvgXml } from '../helpers/icons';

function Icon(props: IconProps) {
  return getSvgXml(props);
}

const arequal = (prevProps: any, nextProps: any) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.color === nextProps.color &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps === nextProps
  );
};

export default memo(Icon, arequal);
