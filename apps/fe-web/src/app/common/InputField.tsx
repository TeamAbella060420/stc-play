import { useEffect, useState } from 'react';

import Icon from './Icon';

import { IconNames } from '@fe-monorepo/helper';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useHeaderState } from '../../lib/hooks/useHeaderState/useHeaderState';

export type InputFieldStyle = {
  containerStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  underlineStyle?: string;
};

interface FieldProps {
  style: InputFieldStyle;

  label: string;
  isSecret?: boolean;
  hasFocused?: boolean;
  errorMessage?: string;

  isUserAllowedToType: (value: string) => boolean;
  retrieveValue?: (value: any) => void;
  retrieveFocus?: (value: boolean) => void;
  retrieveTyped?: (value: boolean) => void;
}

interface UnderlineProps {
  isFocused: boolean;
  errorMessage?: string;

  underlineStyle?: string;
}

const Underline = (props: UnderlineProps) =>
{
  const shouldShowError = props?.errorMessage
    &&
    !props.isFocused
    ;

  return (
    <>
      <div className={`w-full ${shouldShowError ? 'bg-red' : props.isFocused ? 'bg-sunset' : 'bg-black20'} ${props?.underlineStyle}`} />

      <div className={`
            mt-4 4xl:mt-8 5xl:mt-12 8xl:mt-22
            h-20 4xl:h-36 5xl:h-54 8xl:h-100
      `}>
        {
          shouldShowError
        &&
          <p className="
                    text-bodySmall 4xl:text-subtitle 5xl:text-bigTitle 8xl:text-huge
                    font-regular text-red"
          >
            {props.errorMessage}
          </p>
        }
      </div>
    </>
  );
};

const Label = (props: { text: string; isFocused: boolean; valueLength: number }) =>
{
  const { innerWidth } = useHeaderState();

  const fontSizes =
  {
    "normal":
    {
      initial: { size: '18px', height: '24px' },

      small: { size: '14px', height: '20px' }
    },

    "2k":
    {
      initial: { size: '32px', height: '42.66px' },

      small: { size: '25px', height: '36px' }
    },

    "4k":
    {
      initial: { size: '48px', height: '64px' },

      small: { size: '37.33px', height: '53px' }
    },

    "8k":
    {
      initial: { size: '96px', height: '128px' },

      small: { size: '75px', height: '106px' }
    }
  }

  let mode:  "normal" | "2k" | "4k" | "8k" = "normal";

  if (innerWidth >= 7680)
  {
    mode = "8k";
  }
  else if (innerWidth >= 3840)
  {
    mode = "4k";
  }
  else if (innerWidth >= 2560)
  {
    mode = "2k"
  }

  return (
    <motion.p
      className={`absolute ${props.isFocused ? 'text-sunset' : 'text-black50'} font-regular z-0`}
      initial={{
        y: '25%',
        fontSize: fontSizes[mode].initial.size,
        lineHeight:  fontSizes[mode].initial.height
      }}
      animate={{
        y: props.isFocused || props.valueLength > 0 ? '-125%' : '25%',
        fontSize: props.isFocused || props.valueLength > 0 ? fontSizes[mode].small.size:  fontSizes[mode].initial.size,
        lineHeight: props.isFocused || props.valueLength > 0 ? fontSizes[mode].small.height :  fontSizes[mode].initial.height
      }}
      transition={{ duration: 0.3 }}
    >
      {props.text}
    </motion.p>
  );
};

interface InputProps
{
  className?: string;

  value: string;
  isSecret?: boolean;
  isFocused: boolean;

  setValue: (value: string) => void;
  setFocused: (val: boolean) => void;
}

const EyeIcon = (props: { isHidden: boolean, toggleHidden: () => void }) =>
{
  const { isHidden, toggleHidden } = props;

  return (
    <>
      <div className='flex 4xl:hidden'>
        <Icon
          className="stroke-black100 z-[1]"
          name={isHidden ? IconNames.eyeOutline : IconNames.eyeClosedOutline}
          width={20}
          height={20}
          onClick={toggleHidden}
        />
      </div>

      <div className='hidden 4xl:flex 5xl:hidden'>
        <Icon
          className=" stroke-black100 z-[1] "
          name={isHidden ? IconNames.eyeOutline : IconNames.eyeClosedOutline}
          width={36}
          height={36}
          onClick={toggleHidden}
        />
      </div>


      <div className='hidden 5xl:flex 8xl:hidden'>
        <Icon
          className=" stroke-black100 z-[1] "
          name={isHidden ? IconNames.eyeOutline : IconNames.eyeClosedOutline}
          width={54}
          height={54}
          onClick={toggleHidden}
        />
      </div>

      <div className='hidden 8xl:flex'>
        <Icon
          className=" stroke-black100 z-[1] "
          name={isHidden ? IconNames.eyeOutline : IconNames.eyeClosedOutline}
          width={106}
          height={106}
          onClick={toggleHidden}
        />
      </div>
    </>
  )
}

export const ClearIcon = (props: { clearValue: () => void }) =>
{
  const { clearValue } = props;

  return (
    <>
        <div className='flex 4xl:hidden'>
          <Icon
            className=" fill-black100 z-[1] "
            name={IconNames.close_xbutton}
            width={14}
            height={14}
            onClick={clearValue}
          />
        </div>

        <div className='hidden 4xl:flex 5xl:hidden'>
          <Icon
            className=" fill-black100 z-[1] "
            name={IconNames.close_xbutton}
            width={25}
            height={25}
            onClick={clearValue}
          />
        </div>

        <div className='hidden 5xl:flex 8xl:hidden'>
          <Icon
            className=" fill-black100 z-[1] "
            name={IconNames.close_xbutton}
            width={37}
            height={37}
            onClick={clearValue}
          />
        </div>

        <div className='hidden 8xl:flex'>
          <Icon
            className=" fill-black100 z-[1] "
            name={IconNames.close_xbutton}
            width={75}
            height={75}
            onClick={clearValue}
          />
        </div>
    </>
  )
}

const Input = (props: InputProps) => {
  const [isHidden, setHidden] = useState<boolean>(props?.isSecret ? props?.isSecret : false);
  const { t } = useTranslation();
  const startTyping = t('formPlaceholder_start_typing');

  useEffect(() => setHidden(props?.isSecret ? props?.isSecret : false), [props?.isSecret]);

  const toggleHidden = () => setHidden(value => !value);

  const clearValue = () => props.setValue('');

  return (
    <div className="relative h-fit w-full grid items-center">
      <input
        className={`z-1 w-full outline-0 bg-transparent ${props?.className} focus:outline-none`}
        type={!isHidden ? 'text' : 'password'}
        value={props.value}
        placeholder={props.isFocused ? startTyping : ''}
        onChange={e => props.setValue(e.target.value)}
        onFocus={() => props.setFocused(true)}
        onBlur={() => props.setFocused(false)}
      />


      <div className="absolute cursor-pointer justify-self-end h-fit w-fit">
        {
          props?.isSecret
        ?
          <EyeIcon isHidden={isHidden} toggleHidden={toggleHidden} />
        :
          props.value.length > 0
        &&
          <ClearIcon clearValue={clearValue}/>
        }
      </div>
    </div>
  );
};

const InputField = (props: FieldProps) =>
{
  const [value, setValue] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(false);

  const { containerStyle, inputStyle, underlineStyle } = props.style;

  const changeValue = (value: string) =>
  {
    if (!props.isUserAllowedToType(value))
    {
      return;
    }

    if (props?.retrieveTyped)
    {
      props?.retrieveTyped(true);
    }

    setValue(value);
  };

  useEffect(() => {
    if (props?.retrieveValue)
    {
      props?.retrieveValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (!props.retrieveFocus || props?.hasFocused !== undefined)
    {
      return;
    }

    if (!props.hasFocused && isFocused)
    {
      props.retrieveFocus(isFocused);
    }
  }, [isFocused]);

  return (
    <div className={`relative ${containerStyle}`}>
      <div className="
          w-full
          h-20 4xl:h-36 5xl:h-54 8xl:h-100
          mb-4 4xl:mb-8 5xl:mb-12 8xl:mb-22"
      />

      <div className="w-full flex">
        <Label text={props.label} valueLength={value.length} isFocused={isFocused} />

        <Input
          className={inputStyle}
          isSecret={props?.isSecret}
          value={value}
          setValue={changeValue}
          isFocused={isFocused}
          setFocused={setFocused}
        />
      </div>

      <Underline
          underlineStyle={underlineStyle}
          isFocused={isFocused}
          errorMessage={props?.errorMessage}
      />
    </div>
  );
};

export default InputField;
