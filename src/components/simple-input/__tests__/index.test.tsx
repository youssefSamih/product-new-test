import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import useInput from 'components/hooks/use-input';
import SimpleInput from 'components/simple-input/component';

const SimpleInputTest = () => {
  const {
    value: nameValue,
    error: nameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput({
    validatorFn: (value) => value.trim() !== '' && value.trim().length >= 3,
  });

  return (
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
  );
};

test('renders simple input and simulate on change value', () => {
  render(<SimpleInputTest />);

  const simpleInputElement = screen.getByTestId('name');

  const testName = 'test name';

  fireEvent.change(simpleInputElement, { target: { value: testName } });

  expect(simpleInputElement).toHaveValue(testName);
});
