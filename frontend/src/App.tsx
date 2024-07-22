import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
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
        console.log('Fetched blueprint:', data);
        setBlueprint(data);
        const initialThemeData: Record<string, any> = {};
        Object.entries(data.colors).forEach(([key, value]) => {
          initialThemeData[key] = value.default;
        });
        Object.entries(data.images).forEach(([key, value]) => {
          initialThemeData[key] = value.default;
        });
        Object.entries(data.properties).forEach(([key, value]) => {
          initialThemeData[key] = value.default;
        });
        console.log('Initial theme data:', initialThemeData);
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

  useEffect(() => {
    const applyStyles = (element: HTMLElement, styles: Record<string, string>) => {
      Object.entries(styles).forEach(([key, value]) => {
        element.style.backgroundColor = value; // Direct assignment
        console.log(key, value);
      });
    };
    const elements = document.querySelectorAll('.preview .theme-element');
    elements.forEach((element) => {
      const className = element.className.split(' ').find(cls => cls !== 'theme-element');
      if (className) {
        console.log(className);
        const themeKey = className.replace(/-/g, '_');
        if (themeData[themeKey]) {
            console.log(element);
            console.log(themeData[themeKey]);
          applyStyles(element as HTMLElement, { backgroundColor: themeData[themeKey] });
        }
      }
    });
  }, [themeData]);



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
            <div className="sidebar-settings">   {blueprint ? (
                <Sidebar
                blueprint={blueprint}
                themeData={themeData}
                handleColorChange={handleColorChange}
                handleImageUpload={handleImageUpload}
                handlePropertyChange={handlePropertyChange}
                />
            ) : (
                <p>Loading...</p>
            )}</div>
         
            <div className="content">
            <h2>Blueprint/Layout</h2>
            <div className="preview">
                <div className="theme-element frame">Frame
                    <div className="theme-element sidebar">Sidebar</div>
                    <div className="theme-element toolbar">Toolbar
                        <div className="theme-element field">Tab1</div>
                        <div className="theme-element field">Tab2</div>
                    </div>
                    <div className="theme-element icons">Icons</div>
                        <div className="theme-element popup">popup</div>
                </div>
                {/* Add more elements as needed */}
            </div>
            <div className="preview">
                {Object.entries(themeData).map(([key, value]) => renderPreviewElement(key, value))}
            </div>
            </div>
        </div>
    </div>
  );
};


export default App;
