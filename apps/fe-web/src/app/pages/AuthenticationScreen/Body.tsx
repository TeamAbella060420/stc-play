import * as React from 'react';

import { IconNames } from '@fe-monorepo/helper';
import Icon from '../../common/Icon';

import AuthCard from './AuthCard';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

interface BodyType
{
  type: "signup" | "signin",
  toggleType: () => void
  setIsDoneSignup: (value: boolean) => void
}

// TODO: This should be optimized
const STCPlayIcon = () =>
{
  return (
    <>
      <div className='items-center hidden sm:flex 4xl:hidden'>
        <Icon
          className="cursor-pointer fill-white100"
          name={IconNames.stcPlay}
          width={186}
          height={51}
        />
      </div>

      <div className='items-center hidden 4xl:flex 5xl:hidden'>
        <Icon
          className="cursor-pointer fill-white100"
          name={IconNames.stcPlay}
          width={330.66}
          height={90.66}
        />
      </div>

      <div className='items-center hidden 5xl:flex 8xl:hidden'>
        <Icon
          className="cursor-pointer fill-white100"
          name={IconNames.stcPlay}
          width={496}
          height={150}
        />
      </div>

      <div className='items-center hidden 8xl:flex'>
        <Icon
          className="cursor-pointer fill-white100"
          name={IconNames.stcPlay}
          width={992}
          height={272}
        />
      </div>
    </>
  )
}

const Body = (props: BodyType) =>
{
  return (
    <div className='
        w-full h-full
        sm:px-40 lg:px-120 8xl:px-203
        flex justify-center items-center sm:justify-between self-center'
    >
      <STCPlayIcon />

      <LayoutGroup>
        <div
          className='rounded-[8px] flex items-center min-w-[375px] w-full h-full sm:min-h-full sm:w-fit sm:h-fit'
          style={{
            
          }}
        >
          <AuthCard
            type={props.type}
            toggleType={props.toggleType}
            setIsDoneSignup={props?.setIsDoneSignup}
          />
        </div>
      </LayoutGroup>
    </div>
  );
}

export default Body;
