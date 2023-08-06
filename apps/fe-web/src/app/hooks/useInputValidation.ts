import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { RootState } from "@fe-monorepo/store";

import ValidationRule from "../../lib/types/validationRules";

type CompositeValue = { value: string; isValid: boolean; };

export type ValidationParameters =
{
  isOptional: boolean,
  validationRules: ValidationRule[],
  apiErrorMessage?: string,

  resetAPIError?: () => void,
  onChange: (e: { value: string; isValid: boolean }) => void,
  dependencies: any[]
}

const useInputValidation = (parameters: ValidationParameters) =>
{
  const { isOptional, validationRules, apiErrorMessage, onChange } = parameters;

  const prefs = useSelector((state: RootState) => state?.app);

  console.log("validationRules: ", validationRules);

  const [value, setValue] = useState<string>('');
  const [compositeValue, setCompositeValue] = useState<CompositeValue>({ value: '', isValid: isOptional });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasFocused, setFocused] = useState<boolean>(false);
  const [hasTyped, setTyped] = useState<boolean>(false);

  const resetAPIError = (): void =>
    {
      if (parameters?.resetAPIError)
      {
        parameters.resetAPIError();
      }
    }

  const validateInput = () =>
  {
    let isValid = true;
    let errorMessage = '';

    console.log("valuevalue: ", value);

    if (!isOptional || value.length > 0) {
      const rules = validationRules;

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (!rule.checkValidity(value)) {
          isValid = false;
          errorMessage = rule.errorMessage;

          break;
        }
      }
    }

    return { isValid, errorMessage };
  };

  useEffect(() => resetAPIError(), [prefs.language])

  useEffect(() =>
  {
    if (apiErrorMessage !== undefined)
    {
      if (apiErrorMessage?.length > 0)
      {
        setErrorMessage(apiErrorMessage);
      }
    }
  }, [apiErrorMessage]);

  useEffect(() =>
  {
    const hasInteractedWithInputField = hasFocused && hasTyped;

    if (!hasInteractedWithInputField)
    {
      return;
    }

    const { isValid, errorMessage } = validateInput();

    resetAPIError();

    setErrorMessage(errorMessage);

    setCompositeValue({ value: value, isValid: isValid });
  }, [...parameters.dependencies, value, hasFocused, prefs.language]);

  useEffect(() =>
  {
    console.log("compositeValue: ", compositeValue);

    onChange(compositeValue)
  }, [compositeValue]);

  return { setValue, setFocused, setTyped, errorMessage }
}

export  default useInputValidation;
