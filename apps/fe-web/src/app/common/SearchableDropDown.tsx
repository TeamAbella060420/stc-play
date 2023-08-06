import { useState, useEffect, useRef, MutableRefObject } from 'react';

import useOutsideClick from '../hooks/useOutsideClick';

import Icon from './Icon';

import { IconNames } from '@fe-monorepo/helper';

interface UnderlineProps
{
  isFocused: boolean;
  isError: boolean;

  underlineStyle?: string;
}

const ToolTip = (props: {className?: string, content:  React.ReactNode,children?: React.ReactNode}) =>
{
  return (
    <div className={'relative z-[50]  cursor-pointer bg-blue'}>
      <div className={`absolute ${props?.className} z-[50]`}>
        {props.content}
      </div>
    </div>
  )
}

const Underline = (props: UnderlineProps) =>
{
  return (
    <>
      <div className={`w-full ${props?.isError ? 'bg-red' : props.isFocused ? 'bg-sunset' : 'bg-black20'} ${props?.underlineStyle}`} />

      {/* <div className={'mt-4 h-20'} /> */}
    </>
  );
};


interface InputProps
{
  parentRef: MutableRefObject<HTMLDivElement | null | undefined>,
  className?: string;

  filteredList: any[]
  currentValue?: string;
  value: string;
  isFocused: boolean;

  getStringValue: (dropDownElement: any) => string,
  setValue: (value: string) => void;
  setFocused: (val: boolean) => void;
  selectOption: (dropDownElement: any) => void
}

const CheckFillIcon = () =>
{
  return (
    <div className='h-full flex items-center'>
        <div className='flex 4xl:hidden'>
            <Icon
              className="z-[1] "
              name={IconNames.checkFill}
              width={16.67}
              height={16.67}
            />
        </div>

      <div className='hidden 4xl:flex 5xl:hidden'>
        <Icon
            className="z-[1] "
            name={IconNames.checkFill}
            width={29.63}
            height={29.63}
          />
      </div>


      <div className='hidden 5xl:flex 8xl:hidden'>
        <Icon
            className="z-[1] "
            name={IconNames.checkFill}
            width={44.45}
            height={44.45}
          />
      </div>

      <div className='hidden 8xl:flex'>
        <Icon
            className="z-[1] "
            name={IconNames.checkFill}
            width={88.92}
            height={88.92}
        />
      </div>
    </div>
  )
}

const DropDownText = (props: {text: string}) =>
{
  return (
    <p className='
    whitespace-nowrap
          text-body 4xl:text-title 5xl:text-fourKSubtitle 8xl:text-eightKSubtitle
          py-8 4xl:py-12 5xl:py-20 8xl:py-44

          ps-3 4xl:ps-[5.33px] 5xl:ps-8 8xl:ps-16
          px-16 4xl:px-[28px] 5xl:px-40 8xl:px-81
          
    '
    >
      {props.text}
    </p>
  )
}
const DropDownList = (props:
    {
      currentValue?: string,
      filteredList: any[],
      selectValue: (dropDownElement: any) => void,
      getStringValue: (dropDownElement: any) => string,
    }) =>
{
  const { filteredList, selectValue, getStringValue } = props;

  return (
    <div className='bg-white100
        max-h-[144px] 4xl:max-h-[256px] 5xl:max-h-[384px] 8xl:max-h-[768px]
        border border-black10 overflow-y-scroll'>

          {
            !!props?.currentValue && getStringValue(props?.currentValue)
          &&
            <div className='relative flex items-center text-sunset pointer-normal cursor-default'>
              <DropDownText text={getStringValue(props?.currentValue)} />

              <CheckFillIcon />
            </div>
          }

        {filteredList?.map((element, index) =>
          (
            <div
              key={index}
              className=' bg-white100 hover:bg-sunset/[0.1] hover:text-sunset cursor-pointer'
              onClick={() => selectValue(element)}
            >

              <DropDownText text={getStringValue(element)}/>
            </div>
          ))
        }
    </div>
  )
}

const Input = (props: InputProps) =>
{
  const { filteredList, getStringValue } = props;

  const [localFocus, setLocalFocus] = useState<boolean>(false);
  const [isToolTipOn, setToolTipOn] = useState<boolean>(false);

  const toggleToolTip = () =>
  {
    if (props.isFocused)
    {
      props.setFocused(false);
      setToolTipOn(false);
    }
    else
    {
      setToolTipOn(value => !value);
    }
  }

  const selectValue = (dropDownElement: any) =>
  {
    props.selectOption(dropDownElement)

    setTimeout(() =>
    {
      setLocalFocus(false)
      setToolTipOn(false)
      props.setFocused(false)
    }, 10);
  }

  const elementRef = useOutsideClick(() =>
    {
      setLocalFocus(false)
      props.setFocused(false)
      setToolTipOn(false)
    }
  )

  elementRef.current = props.parentRef.current;

  const isToolTipShown = (isToolTipOn || localFocus);

  return (
    <div className="relative h-fit w-full grid items-center">
      <input
        className={`z-1 w-full outline-0 bg-transparent ${props?.className}`}
        type={'text'}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
        onFocus={() =>
        {
          setLocalFocus(true)
          props.setFocused(true)
        }}
      />

      <div className="absolute cursor-pointer justify-self-end h-fit w-fit">
        <div className='flex 4xl:hidden'>
            <Icon
              className={` fill-black100 z-[1] ${isToolTipShown && "rotate-180 fill-sunset"}`}
              name={IconNames.chevron}
              width={24}
              height={24}
              onClick={toggleToolTip}
            />
        </div>


        <div className='hidden 4xl:flex 5xl:hidden'>
            <Icon
              className={`fill-black100 z-[1] ${isToolTipShown && "rotate-180 fill-sunset"}`}
              name={IconNames.chevron}
              width={42.66}
              height={42.66}
              onClick={toggleToolTip}
            />
        </div>


        <div className='hidden 5xl:flex 8xl:hidden'>
            <Icon
              className={`fill-black100 z-[1] ${isToolTipShown && "rotate-180 fill-sunset"}`}
              name={IconNames.chevron}
              width={64}
              height={64}
              onClick={toggleToolTip}
            />
        </div>

        <div className='hidden 8xl:flex'>
            <Icon
              className={`fill-black100 z-[1] ${isToolTipShown && "rotate-180 fill-sunset"}`}
              name={IconNames.chevron}
              width={128}
              height={128}
              onClick={toggleToolTip}
            />
        </div>
      </div>

      {
        isToolTipShown && filteredList?.length > 0
      &&
        <ToolTip
            className='absolute mt-4 4xl:mt-8 5xl:mt-12 8xl:mt-20'
            content=
            {
              <DropDownList
                  currentValue={props?.currentValue}
                  filteredList={filteredList}

                  selectValue={selectValue}
                  getStringValue={getStringValue}
              />
            }
        />
      }
    </div>
  );
};

export interface Props
{
  style?:
  {
    containerStyle?: string,
    inputStyle?: string;
    underlineStyle?: string;
  },

  parentRef: MutableRefObject<HTMLDivElement | null | undefined>,

  isError: boolean,
  isFocused: boolean
  currentValue?: string,
  list: string[],

  search: (searchKey: string) => string[],
  getStringValue: (dropDownElement: any) => string,
  getSearchValue: (dropDownElement: any) => string,
  retrieveValue: (dropDownElement: any) => void,
  setFocused: (value: boolean) => void,
}


const SearchableDropDown = (props: Props) =>
{
  const { style, list, isFocused, setFocused, getStringValue, getSearchValue} = props;

  const [value, setValue] = useState<string>(props?.currentValue? getSearchValue(props?.currentValue): "");
  const [filteredList, setFilteredList] = useState<string[]>(list)

  const filterList = (value: string) =>
  {
    const newFilterList = props.search(value)

    setFilteredList(newFilterList)
  }

  const selectOption = (dropDownElement: any) =>
  {
    setValue(getSearchValue(dropDownElement))
    props.retrieveValue(dropDownElement)
  }

  useEffect(() =>
  {
    setValue(getSearchValue(props?.currentValue))
  }, [props.currentValue])

  useEffect(() => setFilteredList(list) ,[list])

  useEffect(() => filterList(value), [value])

  useEffect(() =>
  {
    !isFocused && setValue(getSearchValue(props?.currentValue))
  }, [isFocused])


  console.log("currentValue: ", props.currentValue);

  return (
    <div  className={`${style?.containerStyle}`}>
      <div className="w-full flex">
        <Input
          parentRef={props.parentRef}
          className={style?.inputStyle}
          value={value}
          currentValue={props?.currentValue}
          filteredList={list}
          isFocused={isFocused}

          getStringValue={getStringValue}
          setValue={setValue}
          setFocused={setFocused}

          selectOption={selectOption}
        />
      </div>

      <Underline underlineStyle={style?.underlineStyle} isFocused={isFocused} isError={props.isError} />
    </div>
  );
}

export default SearchableDropDown;
