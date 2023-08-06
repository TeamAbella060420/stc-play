import * as React from 'react';

import ValidationRule from '../../lib/types/validationRules';
import InputValidationField from '../pages/AuthenticationScreen/InputValidationField';
import { useTranslation } from 'react-i18next';
import { authInputFieldStyleObj } from '../pages/AuthenticationScreen/commonStyles';

type Props =
{
  onChange: (e: { value: string; isValid: boolean }) => void;

  resetAPIError?: () => void;

  apiErrorMessage?: string;
}

const ReferralCodeField = (props: Props) =>
{
  const { t } = useTranslation();

  const resetErrorMessage = () =>
    {
      if (props?.resetAPIError)
      {
        props.resetAPIError();
      }
    }

  return (
    <InputValidationField
      inputFieldProps={{
        style: {...authInputFieldStyleObj, containerStyle: ''},

        // {
        //   // containerStyle: 'mb-20',
        //   inputStyle: `
        //       my-8 5xl:my-20
        //       h-24 5xl:h-64
        //       text-black100
        //       font-regular text-bodyLarge 5xl:text-mobileDynamic
        //       placeholder:text-bodyLarge placeholder:5xl:text-mobileDynamic
        //   `,
        //   underlineStyle: 'h-[1px] 5xl:h-[2.66px]'
        // },

        label: t("common_referral_code_optional"),
        isSecret: false
      }}
      validationRules={[]}
      isOptional={true}
      onChange={props.onChange}
      apiErrorMessage={props.apiErrorMessage}
      resetAPIError={resetErrorMessage}
    />
  );
};

export default ReferralCodeField;
