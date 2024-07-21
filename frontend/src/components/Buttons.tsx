import React from 'react';

interface ButtonProps {
  backgroundColor: string;
  textColor: string;
}

const Button: React.FC<ButtonProps> = ({ backgroundColor, textColor }) => {
  return (
    <button style={{ backgroundColor, color: textColor, margin: '5px', padding: '5px 10px' }}>
      Button
    </button>
  );
};

export default Button;
