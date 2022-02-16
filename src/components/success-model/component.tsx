import React from 'react';
import './style.css';

type Props = {
  onClick(): void;
};

export const SuccessModel = ({ onClick }: Props) => (
  <div className="success-model-container">
    <div className="success-model">
      <div>Product Created Successfully !</div>
      <button type="submit" onClick={onClick}>
        Create
      </button>
    </div>
  </div>
);
