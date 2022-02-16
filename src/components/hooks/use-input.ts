import { ChangeEvent, useState } from 'react';

type Props = {
  validatorFn: (value: string) => boolean;
};

const useInput = ({ validatorFn }: Props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputTouched, setInputTouched] = useState(false);

  const enteredValueIsValid = validatorFn(enteredValue);

  const hasError = !enteredValueIsValid && inputTouched;

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(evt.target.value);
  };

  const inputBlurHandler = () => setInputTouched(true);

  const reset = () => {
    setEnteredValue('');
    setInputTouched(false);
  };

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    error: hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
