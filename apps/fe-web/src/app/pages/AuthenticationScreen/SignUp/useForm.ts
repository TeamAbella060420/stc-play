import { useState, useEffect } from "react"

export type Form =
{
  [index: string]: { value: string; isValid: boolean };
};

const useForm = () =>
{
  const [form, setForm] = useState<Form>({});
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const editForm = (key: string, value: { value: string ; isValid: boolean }) =>  setForm(oldForm => ({ ...oldForm, [key]: value }));

  useEffect(() =>
  {
    const inputFields = Object.values(form);

    const isAllValid = inputFields.every(field => field.isValid);

    setFormValid(isAllValid);
  }, [form]);

  return { form, isFormValid, editForm };
};


export default useForm;
