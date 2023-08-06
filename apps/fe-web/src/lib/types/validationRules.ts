type ValidationRule =
{
  checkValidity: (value: string) => boolean,
  errorMessage:  string
}

export default ValidationRule
