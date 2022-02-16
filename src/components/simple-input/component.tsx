import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

import './style.css';

type Props = {
  labelText?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  value?: string | number;
  errorText?: string;
  error: boolean;
  required?: true;

  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const SimpleInput = ({
  type,
  id,
  labelText,
  value,
  errorText,
  error,
  required,

  onChange,
  onBlur,
}: Props) => (
  <div className={`form-control ${error ? 'invalid' : ''}`}>
    <label htmlFor={id}>
      <span>{labelText}</span>
      {required ? <span className="error-text">*</span> : ''}
    </label>
    <input
      type={type || 'text'}
      id={id}
      data-testid={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <p className="error-text">{errorText}</p>}
  </div>
);

export default SimpleInput;
