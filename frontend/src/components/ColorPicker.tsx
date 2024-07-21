import React, { useState, useEffect  } from 'react';

interface ColorPickerProps {
  defaultColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ defaultColor, onColorChange }) => {
  const [color, setColor] = useState<string>(defaultColor);

  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    onColorChange(e.target.value);
  };

  return <input type="color" value={color} onChange={handleChange} />;
};

export default ColorPicker;
