import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState, useMemo, useEffect, useRef } from 'react';
import usePageLayout from '../hooks/usePageLayout';
type ChildrenProps = {
  name?: string | any;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
}
type PopoverMenuOptionsProps = {
    name?: string | any;
    description?: string;
    icon?: ReactNode;
    onClick?: () => void;
    children?: ChildrenProps[] | undefined;
    rightIcon?: ReactNode
}
interface PopoverMenuProps {
    options?: PopoverMenuOptionsProps[];
    text: string | any;
    cssClassNames?: string;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({
    options = [],
    text = null,
    cssClassNames,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { direction } = usePageLayout();
  const [showChildren, setShowChildren] = useState<ChildrenProps[]>([]);
  const [togglePopover, setTogglePopOver] = useState(false);
  const handleShowChildren = (item: PopoverMenuOptionsProps) => {
    if (item.children?.length && !showChildren.length) {
      return setShowChildren(item.children);
    }
    if (item.children?.length && showChildren.length) {
      return setShowChildren([]);
    }
    return item?.onClick && item?.onClick();
  }
  const showChild = useMemo(() => {
    if (!togglePopover) {
      return false;
    };
    return !!showChildren.length;
  }, [showChildren, togglePopover]);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        setTogglePopOver(false);
        setShowChildren([]);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <div className='w-full max-w-sm px-4 4xl:px-8 5xl:px-[10.66px] 8xl:px-[21.33px]' ref={ref}>
      <Popover.Group>
        <Popover className='relative'>
          <Popover.Button
            className={`group inline-flex items-center rounded-md focus:outline-none`}
            onClick={() => {
              setTogglePopOver(!togglePopover);
              setShowChildren([]);
            }}
          >
            <div>{text}</div>
          </Popover.Button>

          <Transition
            as={Fragment}
            show={togglePopover}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel
                static
                className={`
                    absolute
                    ${direction === 'ltr' ? 'left-0' : 'right-0'}
                    origin-top-left z-10
                    mt-[3px] 4xl:mt-[5.33px] 5xl:mt-8 8xl:mt-16
                    w-auto
                    max-w-sm
                    transform
                    px-4 sm:px-0 lg:max-w-3xl`
                }
            >
              <div
                dir={direction}
                className={`
                        overflow-y-auto transition-all duration-300
                        rounded-[2px] 4xl:rounded-[3.55px] 5xl:rounded-[5.33px] 8xl:rounded-[10.66px]
                        border border-solid
                        border-secondary/20
                        focus:outline-none bg-primary
                        ${cssClassNames}`}
              >
                <div className='
                    gap-8 4xl:gap-12 5xl:gap-20 8xl:gap-44
                    p-16 4xl:p-[28px] 5xl:p-[42px] 8xl:p-81
                    flex flex-col relative bg-primary'
                >
                  {options.map((item, index) => (
                    <div
                      key={item.name}
                      onClick={() => handleShowChildren(item)}
                      className='
                          flex group
                          gap-[10px] 4xl:gap-18 5xl:gap-[26.66px] 8xl:gap-54
                          py-8 4xl:py-12 5xl:py-20 8xl:py-44
                          items-center focus:outline-none cursor-pointer'
                    >
                      {item.icon}

                      <div className='flex flex-col w-full text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle' >
                        <p className=' font-regular text-secondary'>
                          {item.name}
                        </p>
                        <p className=' text-secondary'>
                          {item.description}
                        </p>
                      </div>
                      {item.rightIcon}
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <Popover className='relative'>
          <Transition
            as={Fragment}
            show={showChild}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            {/* ${direction === 'ltr' ? 'right-[21px]' : 'left-[21px]'} */}
            <Popover.Panel
              static
              className={`
                      absolute w-auto h-auto
                      min-w-[222px] 4xl:min-w-[394.66px] 5xl:min-w-[1184px]
                      p-20 4xl:p-36 5xl:p-54 8xl:p-100
                      z-10

                      mt-4 4xl:mt-8 5xl:mt-[10.66px] 8xl:mt-22

                      ltr:right-22 ltr:4xl:right-40 ltr:5xl:right-56 ltr:8xl:right-120
                      rtl:left-22 rtl:4xl:left-40 rtl:5xl:left-56 rtl:8xl:left-120

                      transition-all transform duration-300
                      rounded-[2px] 4xl:rounded-[3.55px] 5xl:rounded-[5.33px] 8xl:rounded-[10.66px]
                      border border-solid border-secondary/20 focus:outline-none bg-primary`}>
              <div
                dir={direction}
                className='relative'
                >
                  {
                    showChildren.map((item) => {
                      return <div
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick();
                            setTogglePopOver(!togglePopover);
                            setShowChildren([]);
                          }
                        }}
                        key={item.name}
                        className='
                              flex group
                              z-10
                              gap-[10px] 4xl:gap-18 5xl:gap-[26.66px] 8xl:gap-54
                              py-8 4xl:py-12 5xl:py-20 8xl:py-44
                              items-center focus:outline-none cursor-pointer w-full relative'
                      >
                      <div className='flex flex-col w-full'>
                        {item.name}
                        <p className='text-body 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle text-secondary w-full'>
                          {item.description}
                        </p>
                      </div>
                      {item.icon}
                    </div>
                    })
                  }
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </Popover.Group>
    </div>
  )
}

export default PopoverMenu;
