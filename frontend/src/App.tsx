import React, { useState, useEffect } from 'react';
import ColorPicker from './components/ColorPicker';
import ImageUploader from './components/ImageUploader';
import SelectInput from './components/SelectInput';
import './App.css';

interface ThemeValue {
  type: string;
  default: string;
}

interface ThemeBlueprint {
  colors: Record<string, ThemeValue>;
  images: Record<string, ThemeValue>;
  properties: Record<string, ThemeValue>;
}

const App: React.FC = () => {
  const [themeData, setThemeData] = useState<Record<string, any>>({});
  const [blueprint, setBlueprint] = useState<ThemeBlueprint | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/blueprint')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ThemeBlueprint) => {
        setBlueprint(data);
        // Initialize themeData with default values from the blueprint
        const initialThemeData: Record<string, any> = {};
        Object.entries(data.colors).forEach(([key, value]) => {
          initialThemeData[key] = (value as ThemeValue).default;
        });
        Object.entries(data.images).forEach(([key, value]) => {
          initialThemeData[key] = (value as ThemeValue).default;
        });
        Object.entries(data.properties).forEach(([key, value]) => {
          initialThemeData[key] = (value as ThemeValue).default;
        });
        setThemeData(initialThemeData);
      })
      .catch(error => console.error('Error fetching blueprint:', error));
  }, []);

  const handleColorChange = (key: string, color: string) => {
    setThemeData(prev => {
      const newData = { ...prev, [key]: color };
      console.log('Updated themeData:', newData);
      return newData;
    });
  };

  const handleImageUpload = (key: string, imageUrl: string) => {
    setThemeData(prev => {
      const newData = { ...prev, [key]: imageUrl };
      console.log('Updated themeData:', newData);
      return newData;
    });
  };

  const handlePropertyChange = (key: string, value: string) => {
    setThemeData(prev => {
      const newData = { ...prev, [key]: value };
      console.log('Updated themeData:', newData);
      return newData;
    });
  };

  const renderElement = (key: string, type: string) => {
    switch (type) {
      case 'color':
        return (
          <div key={key}>
            <label>{key}</label>
            <ColorPicker onColorChange={(color) => handleColorChange(key, color)} />
          </div>
        );
      case 'image':
        return (
          <div key={key}>
            <label>{key}</label>
            <ImageUploader onImageUpload={(imageUrl) => handleImageUpload(key, imageUrl)} />
          </div>
        );
      case 'select':
        return (
          <div key={key}>
            <label>{key}</label>
            <SelectInput onSelectChange={(value) => handlePropertyChange(key, value)} />
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreviewElement = (key: string, value: string) => {
    const style: React.CSSProperties = {
      backgroundColor: key.includes('background') || key.includes('frame') || key.includes('toolbar') || key.includes('popup') ? value : undefined,
      color: key.includes('text') || key.includes('highlight') ? value : undefined,
      border: key.includes('border') || key.includes('separator') ? `1px solid ${value}` : undefined
    };

    return (
      <div key={key} className="preview-element" style={style}>
        {key}: {value}
      </div>
    );
  };

  return (
    <div className="App">
      {blueprint ? (
        <div>
          {Object.entries(blueprint.colors).map(([key, value]) => renderElement(key, value.type))}
          {Object.entries(blueprint.images).map(([key, value]) => renderElement(key, value.type))}
          {Object.entries(blueprint.properties).map(([key, value]) => renderElement(key, value.type))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      <div className="preview">
        {Object.entries(themeData).map(([key, value]) => renderPreviewElement(key, value))}
      </div>
    </div>
  );
};

export default App;
