import React, { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Tab from './components/Tab';
import Sidebar from './components/Sidebar';
import MessagePane from './components/MessagePane';
import Statusbar from './components/Statusbar';
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
  layout: any;
}

interface LayoutItem {
  type: string;
  componentType?: string;
  children?: string[];
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
    setThemeData(prev => ({ ...prev, [key]: color }));
  };

  const handleImageUpload = (key: string, imageUrl: string) => {
    setThemeData(prev => ({ ...prev, [key]: imageUrl }));
  };

  const handlePropertyChange = (key: string, value: string) => {
    setThemeData(prev => ({ ...prev, [key]: value }));
  };

  const renderComponent = (key: string, componentType: string) => {
    const style = {
      backgroundColor: themeData[key + 'Background'],
      color: themeData[key + 'Text'],
    };

    switch (componentType) {
      case 'Toolbar':
        return <Toolbar style={style} key={key} />;
      case 'Tab':
        return <Tab style={style} label={key} key={key} />;
      case 'Sidebar':
        return <Sidebar style={style} key={key} />;
      case 'MessagePane':
        return <MessagePane style={style} key={key} />;
      case 'Statusbar':
        return <Statusbar style={style} key={key} />;
      default:
        return null;
    }
  };

  const renderLayout = (layout: LayoutItem) => {
    return layout.children?.map((child: string) => {
      const childLayout = blueprint?.layout[child];
      if (!childLayout) return null;
      if (childLayout.type === 'container') {
        return (
          <div key={child} className={child}>
            {renderLayout(childLayout)}
          </div>
        );
      } else if (childLayout.type === 'component') {
        return renderComponent(child, childLayout.componentType!);
      }
      return null;
    });
  };

  const renderElement = (key: string, type: string) => {
    if (type === 'color') {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      return (
        <div key={key}>
          <label>{label}</label>
          <ColorPicker 
            defaultColor={themeData[key]}
            onColorChange={(color) => handleColorChange(key, color)} />
        </div>
      );
    } else if (type === 'image') {
      return (
        <div key={key}>
          <label>{key}</label>
          <ImageUploader onImageUpload={(imageUrl) => handleImageUpload(key, imageUrl)} />
        </div>
      );
    } else if (type === 'select') {
      return (
        <div key={key}>
          <label>{key}</label>
          <SelectInput onSelectChange={(value) => handlePropertyChange(key, value)} />
        </div>
      );
    }
    return null;
  };

  const renderPreviewElement = (key: string, value: string) => {
    const style: React.CSSProperties = {
        backgroundColor: (key.includes('background') || key.includes('frame') || key.includes('toolbar') || key.includes('popup') || key.includes('tab') || key.includes('field')) && !key.includes('text') && !key.includes('border') && !key.includes('separator') ? value : undefined,
        color: key.includes('_text') ? value : undefined,
        borderColor: key.includes('border') ? value : undefined,
        borderStyle: key.includes('border') ? 'solid' : undefined,
        borderWidth: key.includes('border') ? '1px' : undefined,    
        borderTop: key.includes('separator') ? `1px solid ${value}` : undefined

    };

    return (
      <div key={key}>
      {key}: {value}
      <div className="preview-element" style={style}></div>
      </div>
    );
  };

  return (
    <div className="App">
        <h2>Blueprint/Layout</h2>
      {blueprint && renderLayout(blueprint.layout.main)}
        <h2>Settings</h2>
      {blueprint ? (
        <div>
          <h3>Coloring</h3>
          {Object.entries(blueprint.colors).map(([key, value]) => renderElement(key, value.type))}
          <h3>Images</h3>
          {Object.entries(blueprint.images).map(([key, value]) => renderElement(key, value.type))}
          <h3>Properties</h3>
          {Object.entries(blueprint.properties).map(([key, value]) => renderElement(key, value.type))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h2>Preview</h2>
      <div className="preview">
        {Object.entries(themeData).map(([key, value]) => renderPreviewElement(key, value))}
      </div>
    </div>
  );
};

export default App;
