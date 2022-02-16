import { FormEvent } from 'react';

import useInput from 'components/hooks/use-input';
import SimpleInput from 'components/simple-input/component';
import './style.css';

type Props = {
  onSubmitForm(): void;
};

const validReference = new RegExp(/^[A-Za-z0-9_]+$/);

export const Form = ({ onSubmitForm }: Props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    error: nameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput({
    validatorFn: (value) => value.trim() !== '' && value.trim().length >= 3,
  });

  const {
    value: refValue,
    isValid: refIsValid,
    error: refError,
    inputChangeHandler: refChangeHandler,
    inputBlurHandler: refBlurHandler,
    reset: refReset,
  } = useInput({
    validatorFn: (value) =>
      value.trim().length >= 3 && validReference.test(value),
  });

  const {
    value: datValue,
    isValid: datIsValid,
    error: datError,
    inputChangeHandler: datChangeHandler,
    inputBlurHandler: datBlurHandler,
    reset: datReset,
  } = useInput({
    validatorFn: (value) => value === '' || parseInt(value, 10) > 0,
  });

  const {
    value: dateValue,
    isValid: dateIsValid,
    error: dateError,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: dateReset,
  } = useInput({
    validatorFn: (value) => {
      const dateValue = new Date(value);
      const today = new Date();

      return value === '' || dateValue > today;
    },
  });

  const resetForm = () => {
    nameReset();
    refReset();
    datReset();
    dateReset();
  };

  const formIsValid = dateIsValid && datIsValid && refIsValid && nameIsValid;

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!formIsValid) return;

    onSubmitForm();
    resetForm();
  };

  return (
    <div className="app">
      <h1>New Product</h1>

      <form onSubmit={submitHandler}>
        <SimpleInput
          type="text"
          id="name"
          labelText="Name"
          errorText="Name is required"
          required
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameValue}
          error={nameError}
        />

        <SimpleInput
          type="text"
          id="reference"
          labelText="Reference"
          errorText="Reference is required"
          required
          onChange={refChangeHandler}
          onBlur={refBlurHandler}
          value={refValue}
          error={refError}
        />

        <p>Price(s)</p>

        <SimpleInput
          type="number"
          id="dat"
          labelText="DAT"
          errorText="DAT should be greater than 0"
          onChange={datChangeHandler}
          onBlur={datBlurHandler}
          value={datValue}
          error={datError}
        />

        <SimpleInput
          type="date"
          id="shipping-date"
          labelText="Shipping date"
          errorText="Date must be later than today"
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          value={dateValue}
          error={dateError}
        />

        <div className="form-actions">
          <button type="button" disabled={!formIsValid} onClick={resetForm}>
            Clear
          </button>

          <button
            type="submit"
            data-testid="submit-product"
            disabled={!formIsValid}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
