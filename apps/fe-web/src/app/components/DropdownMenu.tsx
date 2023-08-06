import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Icon from '../common/Icon';
import { IconNames } from '@fe-monorepo/helper';

type DropdownMenuOptionsProps = 
{
    icon?: IconNames;
    label: any;
    onClick?: (props: any) => void;
}

interface DropdownMenuProps 
{
    icon?:  IconNames;
    options: DropdownMenuOptionsProps[],
    cssClassName?: string;
    text?: string;
}

function classNames(...classes: string[]) 
{
  return classes.filter(Boolean).join(' ')
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    icon,
    options = [],
    text
})  => {
  return (
    <Menu as='div' className={`relative inline-block text-left bg-black100 h-auto`}>
       <div className='cursor-pointer'>
            <Menu.Button>
            {!!icon && <Icon
                className={`stroke-white50`}
                name={icon}
                iconClasses='stroke-white50'
                width={16}
                height={16}
            />}
                {text}
            </Menu.Button>
        </div>

        <Transition
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
        >
            <Menu.Items 
                className={`absolute left-0 z-10 mt-[20px] origin-top-left rounded-[2px] border border-solid border-white20 shadow-lg focus:outline-none bg-black100`}
                static
            >
            {
                options?.map(({label, icon, onClick}, index) => (
                    <Menu.Item key={index}>
                        {({ active }) => (
                            <div
                                onClick={onClick}
                                className={classNames(
                                    'text-white',
                                    'block p-[16px] text-sm',
                                    'flex',
                                    'gap-8',
                                    'items-center',
                                    'cursor-pointer'
                                )}
                            >
                                {
                                    !!icon && <Icon
                                        className={`stroke-white50`}
                                        name={icon}
                                        iconClasses='stroke-white50'
                                        width={16}
                                        height={16}
                                    />
                                }
                                {label}
                            </div>
                        )}
                    </Menu.Item>
                ))
                }
            </Menu.Items>
        </Transition>
    </Menu>
  )
}
export default DropdownMenu;