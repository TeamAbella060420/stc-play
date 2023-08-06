import * as React from 'react';
import { getSvgXml } from '@fe-monorepo/helper';
import { IconNames } from '@fe-monorepo/helper';

export interface IAppProps
{
  name: IconNames,
  className?: string,
  iconClasses?: string,
  width?: number,
  height?: number,
  fill?: string,
  onClick?: () => void
}

const Icon = (props: IAppProps) =>
{
  return (
    <div
      className={props?.className}
      onClick={props?.onClick}
    >
      {getSvgXml({name: props.name, platform: "web", height: props?.height, width: props?.width, fill: props?.fill, iconClasses: props?.iconClasses})}
    </div>
  );
}

export default Icon;
