import React from 'react';

interface SelectInputProps {
  onSelectChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ onSelectChange }) => {
  const options = ["option1", "option2", "option3"]; // Replace with actual options

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
