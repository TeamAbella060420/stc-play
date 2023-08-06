import { useState, useEffect } from 'react';

type Form = {
  [index: string]: { value: string; isValid: boolean };
};

export const useFormState = () => {
  const [form, setForm] = useState<Form>({});
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const editForm = (key: string, value: { value: string; isValid: boolean }) => {
    setForm(oldForm => {
      const newForm = { ...oldForm, [key]: value };
      return newForm;
    });
  };

  useEffect(() => {
    const inputFields = Object.values(form);

    const isAllValid = inputFields.every(field => field.isValid);

    setFormValid(isAllValid);
  }, [form]);

  return { form, isFormValid, editForm };
};
