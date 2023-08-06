import { InputFieldStyle } from "../../common/InputField";

export const authInputFieldStyleObj: InputFieldStyle =
{
  containerStyle: 'mb-20 4xl:mb-36 5xl:mb-54 8xl:mb-100',
  inputStyle: `
      my-8 4xl:my-12 5xl:my-20 8xl:my-44
      h-24 4xl:h-40 5xl:h-64 8xl:h-120
      text-black100
      font-regular
      text-bodyLarge 4xl:text-title 5xl:text-mobileDynamic 8xl:text-eightKSubtitle
      placeholder:text-bodyLarge placeholder:4xl:text-title placeholder:5xl:text-mobileDynamic placeholder:8xl:text-eightKSubtitle
  `,
  underlineStyle: 'h-[1px] 4xl:h-[1.77px] 5xl:h-[2.66px] 8xl:h-[5.33px]'
}

