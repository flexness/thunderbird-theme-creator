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


  const renderPreviewElement = (key: string, value: string) => {
    const style: React.CSSProperties = {
        backgroundColor: (key.includes('background') || key.includes('frame') || key.includes('toolbar') || 
                key.includes('popup') || 
                key.includes('tab') || 
                key.includes('field')
            )
                && (
                !key.includes('text') 
                && !key.includes('border') 
                && !key.includes('separator') 
                && !key.includes('tab_line')
                )
                ? value : undefined,
        color: key.includes('_text') ? value : undefined,
        borderColor: key.includes('border') ? value : undefined,
        borderStyle: key.includes('border') ? 'solid' : undefined,
        borderWidth: key.includes('border') ? '1px' : undefined,    
        borderTop: key.includes('separator') ? `1px solid ${value}` : undefined

    };

    return (
      <div key={key}>
      {key}
      <div className="preview-element" style={style}>
        
        <span>{value}</span>
      </div>
      </div>
    );
  };

  return (
    <div className="App">

        <div className="layout">

            <div className="nav">
                <nav>nav</nav>
            </div>
            <div className="sidebar">
                {blueprint ? (
                    <Sidebar
                    blueprint={blueprint}
                    themeData={themeData}
                    handleColorChange={handleColorChange}
                    handleImageUpload={handleImageUpload}
                    handlePropertyChange={handlePropertyChange}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="content">
                <h2>Preview TB Window</h2>
                <div className="tb-layout">
                    {blueprint && renderLayout(blueprint.layout.main)}
                </div>
                        
                <h2>Template elements</h2>
                <div className="preview">
                    {Object.entries(themeData).map(([key, value]) => renderPreviewElement(key, value))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default App;
