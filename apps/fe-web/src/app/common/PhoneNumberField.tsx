import { Validator } from '@fe-monorepo/helper';

import ValidationRule from '../../lib/types/validationRules';

import { ValidationParameters } from '../hooks/useInputValidation';

import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useInputValidation from '../hooks/useInputValidation';
import CombinedInputField from './CombinedInputField';
import { useEffect, useState } from 'react';
import { useGeo } from '@fe-monorepo/hooks';
import { CountryModel } from '@fe-monorepo/models';
import { authInputFieldStyleObj } from '../pages/AuthenticationScreen/commonStyles';

type Props =
{
  apiErrorMessage?: string;

  onPhoneNumberChange: (e: { value: string; isValid: boolean }) => void;
  onCountryCode: (e: any) => void;
  resetAPIError?: () => void;
}

const PhoneNumberField = (props: Props) =>
{
    const prefs = useSelector((state: RootState) => state.app);

    const { t } = useTranslation();

    const [phoneObj, setPhoneObj] = useState<any>({})
    const [validationRules, setValidationRules] = useState<ValidationRule[]>(
    [
      {
        checkValidity: Validator.isDigitsOnly,
        errorMessage: "Phone must only contain numbers!"
      }
    ])
    const [defaultCountry, setDefaultCountry] = useState({})
    const [countryList, setCountryList] = useState<any[]>([])
    const { countryData, getAllCountries } = useGeo();

    const validationParameters: ValidationParameters =
    {
      isOptional: true,
      validationRules: validationRules,
      apiErrorMessage: props.apiErrorMessage,
      resetAPIError: props.resetAPIError,
      onChange: props.onPhoneNumberChange,
      dependencies: [phoneObj?.dropDownValue?.phone_code_iso, validationRules]
    }

    const { errorMessage, setValue, setFocused, setTyped } = useInputValidation(validationParameters);

    const search = (searchKey: string) =>
    {
        const searchTerm = searchKey.replace("+", "");

        return countryList?.filter(country =>
        {
          if (!("name" in country &&  "phone_code_iso" in country && "country_code_iso_2" in country))
          {
            return false
          }

          return country?.name?.includes(searchTerm) || country?.phone_code_iso?.includes(searchTerm)
        })
    }

    const getStringValue = (arrayElement: any) =>
    {
      if (arrayElement)
      {
        return (`${arrayElement?.name} (+${arrayElement?.phone_code_iso})`).trim();
      }
      else
      {
        return ""
      }
    }

    const getSearchValue = (arrayElement: any) =>
    {
      if (arrayElement)
      {
        return ""+(arrayElement?.phone_code_iso? "+"+arrayElement?.phone_code_iso: "").replace(/(\r\n|\n|\r)/gm," ")
      }
      else
      {
        return ""
      }
    }

    const isUserAllowedToType = (value: string) =>
    {
      const dropDownValue = phoneObj?.dropDownValue

      if (dropDownValue?.phone_number_length && dropDownValue.phone_code_iso)
      {
        const maxLength = dropDownValue?.phone_number_length - 1 - dropDownValue.phone_code_iso?.length;

        return Validator.isDigitsOnly(value) && value.length <= maxLength
      }

      return Validator.isDigitsOnly(value)
    }

    useEffect(() =>
    {
      getAllCountries()
    }, [])


    useEffect(() =>
    {
      if (countryData && countryData?.length > 0)
      {
        const filterKeys = ["name", "phone_code_iso", "country_code_iso_2"];

        const filteredList = countryData?.filter(country =>
        {
            for (let i = 0; i < filterKeys.length; i++) {
              const key = filterKeys[i];

              if (!(key in country))
              {
                return false;
              }
            }

          return true;
        })

        const defaultCount = filteredList?.filter(i => i.phone_code_iso === '966')[0]
        setDefaultCountry(defaultCount)
        setCountryList(filteredList)
      }
    }, [countryData])


    useEffect(() =>
    {
      console.log("phoneObj: ", phoneObj);

      const countryCode = phoneObj?.dropDownValue?.phone_code_iso as string;

      const inputValue = phoneObj?.inputValue;
      const phone_number_length = phoneObj?.dropDownValue?.phone_number_length;

      if (phone_number_length && (countryCode + inputValue ) !== "")
      {
        props.onCountryCode(phoneObj?.dropDownValue);

        setValidationRules(oldRules =>
        {
          const newRules = [ ...oldRules ];

          newRules[1] =
          {
            checkValidity: (value: string) => ("+" + countryCode + value).length === phone_number_length,
            errorMessage: t("validation_invalid_mobile")
          }

          return newRules;
        })

        setValue(inputValue);
      }
    }, [phoneObj, prefs.language])


    /**
     * [appearance:textfield]
          //           [&::-webkit-outer-spin-button]:appearance-none
          //           [&::-webkit-inner-spin-button]:appearance-none
     */
    return (
      <CombinedInputField
          dir="ltr"

          style={{
                ...authInputFieldStyleObj,
                containerStyle: '',
            }}

          label={t("formPlaceholder_mobile")}
          inputType="number"
          errorMessage={errorMessage}
          dropDown={{
            default: defaultCountry,
            list: countryList,

            search: search,
            getSearchValue: getSearchValue,
            getStringValue: getStringValue
          }}

          retrieveValue={setPhoneObj}
          retrieveTyped={setTyped}
          retrieveFocus={setFocused}
          isUserAllowedToType={isUserAllowedToType}
      />
    );
};

export default PhoneNumberField;
