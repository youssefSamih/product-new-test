import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

(Date.prototype as any).addDays = function (days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const date = new Date();

const testArr = [
  {
    testId: 'name',
    testValue: 'Test name',
  },
  {
    testId: 'reference',
    testValue: '1021TEST',
  },
  {
    testId: 'dat',
    testValue: 12,
  },
  {
    testId: 'shipping-date',
    testValue: ((date as any).addDays(7) as Date).toISOString().split('T')[0],
  },
];

test('render form and simulate adding new product', () => {
  render(<App />);

  testArr.map((val) => {
    const testInput = screen.getByTestId(val.testId);

    fireEvent.change(testInput, { target: { value: val.testValue } });

    expect(testInput).toHaveValue(val.testValue);
  });

  const submitButton = screen.getByTestId('submit-product');

  fireEvent.click(submitButton);

  const successModel = screen.getByText(/Product Created Successfully !/i);

  expect(successModel).toBeInTheDocument();
});
