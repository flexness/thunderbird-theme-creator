import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import './index.css';
import Dropdown from './components/Dropdown';


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
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    misc: false,
    frame: false,
    toolbar: false,
    sidebar: false,
    popup: false,
  });

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
  const toggleSection = (section: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };


  const applyStyles = (element: HTMLElement, styles: Record<string, string>) => {
    Object.entries(styles).forEach(([key, value]) => {
      if ((
        key.includes('background') || 
        key.includes('frame') || 
        key.includes('toolbar') || 
        key.includes('popup') || 
        key.includes('tab') || 
        key.includes('field') || 
        key.includes('sidebar')
        ) &&
        !key.includes('text') &&
        !key.includes('border') &&
        !key.includes('separator') &&
        !key.includes('tab_line')
      ) {
        element.style.backgroundColor = value; // Set background color
      } else if (key.includes('text') || key.includes('icons')) {
        element.style.color = value; // Set text color
      } else if (key.includes('border') || key.includes('separator')) {
        element.style.borderColor = value; // Set border color
        element.style.borderStyle = 'solid';
        element.style.borderWidth = '1px';      
        if (key.includes('focus')) {
          element.style.borderWidth = '3px'; // Set border width for focus
        }
      } else if (key.includes('tab_line')) {
        element.style.borderTop = '1px solid';
        element.style.borderColor = value; // Set border color
      }
    });
  };
  useEffect(() => {
    const elements = document.querySelectorAll('.preview .theme-element');
    elements.forEach((element) => {
      const classNames = element.className.split(' ').filter(cls => cls !== 'theme-element');
      classNames.forEach((className) => {
        const themeKey = className.replace(/-/g, '_');
        if (themeData[themeKey]) {
          // console.log(`Applying style to ${className}:`, themeData[themeKey]);
          applyStyles(element as HTMLElement, { [themeKey]: themeData[themeKey] });
        }        
        addFocusAndHoverListeners(element as HTMLElement, themeData);

      });
    });
  }, [themeData]);
  
  const addFocusAndHoverListeners = (element: HTMLElement, styles: Record<string, string>) => {
    if (styles.toolbar_field_border_focus) {
      element.addEventListener('focus', () => {
        element.style.borderColor = styles.toolbar_field_border_focus;
        element.style.borderStyle = 'solid';
        element.style.borderWidth = '3px';
        element.style.margin = '1px';
      });
      element.addEventListener('blur', () => {
        element.style.borderColor = styles.toolbar_field_border;
        element.style.borderStyle = 'solid';
        element.style.borderWidth = '1px';
        element.style.margin = '3px';
      });
    }
  };

  const renderPreviewElement = (key: string, value: string) => {
    const style: React.CSSProperties = {
        backgroundColor: (key.includes('background') || key.includes('frame') || key.includes('toolbar') || 
                key.includes('popup') || 
                key.includes('tab') || 
                key.includes('field') || 
                key.includes('sidebar')
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
            <div className="sidebar-settings text-xs">   {blueprint ? (
                <Sidebar
                blueprint={blueprint}
                themeData={themeData}
                handleColorChange={handleColorChange}
                handleImageUpload={handleImageUpload}
                handlePropertyChange={handlePropertyChange}
                toggleSection={toggleSection}
                />
            ) : (
                <p>Loading...</p>
            )}</div>
         
            <div className="content">
              <h2>Blueprint/Layout</h2>
              <div className="preview">
                <div className="theme-element frame">
                    <div className="theme-element w-8 h-full flex flex-col gap-2 py-2">
                      <div className='theme-element flex flex-col gap-2'>
                      <i className="fa fa-envelope theme-element icons_attention"></i>
                      <i className="fa fa-address-book theme-element icons"></i>
                      <i className="fa fa-support theme-element icons"></i>
                      </div>
                      <div className='mt-auto flex flex-col gap-2'>
                      <i className="fa fa-cog theme-element icons"></i>
                      <i className="fa fa-arrow-left theme-element icons"></i>
                      </div>
                    </div>
                    <div className="main flex flex-col flex-grow">
                      <div className="theme-element toolbar_field search p-1 toolbar_text toolbar_bottom_separator">
                        <input type="text" className="theme-element border w-96 toolbar_field_border_focus toolbar_field_border focus" placeholder="Search" />
                      </div>
                      <div className="theme-element toolbar menu inline-flex w-full gap-4 pl-4">

                          <Dropdown label="File">
                            <div className="theme-element popup popup_text popup_border"><ul><li>Subitem1</li><li>Subitem1</li><li>Subitem1</li><li>Subitem1</li></ul></div>   
                          </Dropdown>
                          <Dropdown label="Popup">
                            <div className="theme-element popup popup_text popup_border"><ul><li>Subitem1</li><li>Subitem1</li><li>Subitem1</li><li>Subitem1</li></ul></div>   
                          </Dropdown>
                      </div>
                      <div className="theme-element tabs toolbar flex gap-2 pl-2">
                          <div className="theme-element tab tab_selected tab_line"><i className="fa fa-cog"></i> Tab:selected</div>
                          <div className="theme-element tab"><i className="fa fa-cog"></i> Tab:inactive</div>
                          <div className="theme-element tab tab_loading"><i className="fa fa-cog"></i> Tab:loading</div>
                      </div>
                      <div className="right-content h-full">
                        <div className="theme-element sidebar sidebar_text sidebar_border">

                      <div className="theme-element toolbar">Toolbar/Menu
                      </div>
                          <ul className=''>
                                <li className="">mail1@mail.com </li>
                                <li className="theme-element sidebar_highlight sidebar_highlight_border sidebar_highlight_text">highlighted</li>
                                <li className="">folder2</li>
                                <li className="">folder3</li>
                                <li className="">folder4</li>
      
                          </ul>
                          <ul className='p-1'>
                                <li className="">mail2@mail.com </li>
                                <li className="">folder1</li>
                                <li className="">folder2</li>
      
                          </ul>
                          <ul className='theme-element sidebar_border w-full p-1'>
                                <li className="">Tags </li>
                                <li className="">Tag1</li>
                                <li className="">Tag2</li>

                          </ul>
                        </div>
                        <div className="tab-content ">
                          <div className="theme-element toolbar">
                            <div className="theme-element toolbar_field search p-1 toolbar_text">
                              <input type="text" className="theme-element border w-96 toolbar_field_border_focus toolbar_field_border focus my-2" placeholder="Search" />
                            </div>  
                            <div className="theme-element toolbar_field search p-1 toolbar_text">
                              <button type="button" className="theme-element ">Toolbar/Button</button>
                              <button type="button" className="theme-element toolbar_field button_background_hover">Toolbar/Button:hover</button>
                              <button type="button" className="theme-element toolbar_field button_background_active">Toolbar/Button:active</button>
                            </div>  
                          </div>
                          <p>mails-list</p>
                          <ul>
                            <li>mail</li>
                            <li>mail</li>
                            <li>mail</li>
                          </ul>
                          <p>mail-content</p>
                        </div>
                      </div>
                    </div>
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
