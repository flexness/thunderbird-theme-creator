import React, { useState } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [color, setColor] = useState<string>('#ffffff');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onColorChange(e.target.value);
  };

  return <input type="color" value={color} onChange={handleChange} />;
};

export default ColorPicker;
