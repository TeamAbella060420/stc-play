import { useState, useEffect, useRef } from 'react';
import SearchableDropDown from './SearchableDropDown';

import Icon from './Icon';
import { IconNames } from '@fe-monorepo/helper';
import { ClearIcon } from './InputField';
import { useTranslation } from 'react-i18next';

export type InputFieldStyle =
{
  containerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  underlineStyle?: string;
};

const Label = (props: { text: string; isFocused: boolean }) =>
{

  return (
    <p className={`
            text-bodyLarge 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-LPTitle
            h-20 4xl:h-36 5xl:h-54 8xl:h-100
            w-full
            mb-4 4xl:mb-8 5xl:mb-12 8xl:mb-20
            ${props.isFocused ? 'text-sunset' : 'text-black50'} font-regular`}
    >
      {props.text}
    </p>
  );
};

interface InputProps
{
  className?: string;

  inputType?:string,
  value: string;
  isFocused: boolean;

  setValue: (value: string) => void;
  setFocused: (val: boolean) => void;
}

const Input = (props: InputProps) =>
{
  const { t } = useTranslation()
  const [localFocus, setLocalFocus] = useState<boolean>(false);

  // props?.inputType? props?.inputType :
  return (
    <div className="relative h-fit w-full grid items-center">
      <input
        className={`z-1 w-full outline-0 bg-transparent ${props?.className}`}
        type={'text'}
        value={props.value}
        placeholder={localFocus ? ""+t("formPlaceholder_start_typing") : ''}
        onChange={e => props.setValue(e.target.value)}
        onFocus={() =>
        {
          setLocalFocus(true)
          props.setFocused(true)
        }}
        onBlur={() =>
        {
          setLocalFocus(false)
          props.setFocused(false)
        }}
      />

      {
        props.value.length > 0
      &&
        (
          <div className="absolute cursor-pointer justify-self-end h-fit w-fit">
              <ClearIcon clearValue={() => props.setValue('')}/>
          </div>
        )
      }
    </div>
  );
};

interface UnderlineProps
{
  isFocused: boolean;
  isError: boolean;

  underlineStyle?: string;
}

const Underline = (props: UnderlineProps) =>
{
  return <div className={`w-full ${props.isError ? 'bg-red' : props.isFocused ? 'bg-sunset' : 'bg-black20'} ${props?.underlineStyle}`} />
};

interface FieldProps
{
  style?:
  {
    containerStyle?: string
    inputStyle?: string;
    underlineStyle?: string;
  };

  inputType?:string,
  hasFocused?: boolean;
  isFocused: boolean
  isError: boolean,

  setFocused: (value: boolean) => void,
  isUserAllowedToType: (value: string) => boolean,
  retrieveValue?: (value: any) => void;
  retrieveFocus?: (value: boolean) => void;
  retrieveTyped?: (value: boolean) => void;
}

const InputWrapper = (props: FieldProps) =>
{
  const {
      style,
      isError,
      isFocused,
      setFocused,
      isUserAllowedToType
  } = props;

  const [value, setValue] = useState<string>('');

  const changeValue = (newValue: string) =>
  {
    const isNewValueShorter = newValue.length < value.length;

    if (!isNewValueShorter && !isUserAllowedToType(newValue))
    {
      return;
    }

    if (props?.retrieveTyped)
    {
      props?.retrieveTyped(true);
    }

    setValue(newValue);
  };

  useEffect(() =>
  {
    if (props?.retrieveValue)
    {
      props?.retrieveValue(value);
    }
  }, [value]);


  return (
  <div className={`${style?.containerStyle}`}>
    <Input
      className={style?.inputStyle}
      value={value}
      inputType={props.inputType}
      isFocused={isFocused}
      setFocused={setFocused}
      setValue={changeValue}
    />

    <Underline isError={isError} underlineStyle={style?.underlineStyle} isFocused={isFocused} />
  </div>
  )
}


interface CombinedInputProps
{
  dir?: "ltr"| "rtl",
  style?: InputFieldStyle,

  label: string,

  inputType?: string,
  errorMessage: string,

  hasFocused?: boolean,
  dropDown:
  {
    default: any,
    list: any[],

    search: (searchKey: string) => any[],
    getStringValue: (arrayElement: any) => string,
    getSearchValue: (arrayElement: any) => string
  },

  retrieveValue?: (value: any) => void;
  retrieveFocus?: (value: boolean) => void;
  retrieveTyped?: (value: boolean) => void;
  isUserAllowedToType?: (value: string) => boolean,
}


const CombinedInputField = (props: CombinedInputProps) =>
{
  const { style, label, dropDown, errorMessage } = props;

  const elementRef = useRef<HTMLDivElement | null>();

  const [dropDownValue, setDropDownValue] = useState<any>(dropDown.default? dropDown.default: {});
  const [inputValue, setInputValue] = useState<string>("")
  const [isFocused, setFocused] = useState<boolean>(false);


  console.log("dropDown.default: ", dropDown.default);

  const shouldShowError = !!errorMessage && !isFocused

  useEffect(() =>
  {
    setDropDownValue(dropDown.default)
  }, [dropDown.default])

  useEffect(() => props?.retrieveValue && props.retrieveValue({ dropDownValue, inputValue}), [dropDownValue, inputValue])

  useEffect(() =>
  {
    if (!props.retrieveFocus || props?.hasFocused !== undefined)
    {
      return;
    }

    if (!props.hasFocused && isFocused)
    {
      props.retrieveFocus(isFocused);
    }
  }, [isFocused]);


  const isUserAllowedToType = (value: string) =>
  {
    if (props?.isUserAllowedToType)
    {
      return props.isUserAllowedToType(value);
    }

    return true;
  }

  return (
    <div ref={ref=> elementRef.current = ref} className={`relative ${style?.containerStyle}`}>
      <div className="w-full flex flex-col">
        <Label text={label} isFocused={false} />

        <div dir={props?.dir} className='flex gap-16 4xl:gap-[28px] 5xl:gap-[42px] 8xl:gap-81'>
          <SearchableDropDown
            style= {{ containerStyle: "w-[20%]", inputStyle: `${style?.inputStyle}`, underlineStyle: style?.underlineStyle }}

            parentRef={elementRef}
            isFocused={isFocused}
            isError={shouldShowError}
            currentValue={dropDownValue}
            list={dropDown.list}

            setFocused={setFocused}
            search={dropDown.search}
            getSearchValue={dropDown.getSearchValue}
            getStringValue={dropDown.getStringValue}
            retrieveValue={setDropDownValue}
          />

          <InputWrapper
            style= {{ containerStyle: "w-[76%]", inputStyle: style?.inputStyle, underlineStyle: style?.underlineStyle }}
            isError={shouldShowError}

            inputType={props.inputType}
            isFocused={isFocused}
            isUserAllowedToType={isUserAllowedToType}
            retrieveTyped={props.retrieveTyped}
            retrieveValue={setInputValue}
            setFocused={setFocused}
          />
        </div>

        <div className={`
              mt-4 4xl:mt-8 5xl:mt-12 8xl:mt-20
              h-20 4xl:h-36 5xl:h-54 8xl:h-100`
        }>
          {
            shouldShowError
          &&
            <p className="
                text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-huge
                font-regular text-red">{errorMessage}</p>
          }
        </div>
      </div>
    </div>
  );
}

export default CombinedInputField;
