import React from 'react';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';
import SelectInput from './SelectInput';

interface ThemeValue {
  type: string;
  default: string;
}

interface ThemeBlueprint {
  colors: Record<string, ThemeValue>;
  images: Record<string, ThemeValue>;
  properties: Record<string, ThemeValue>;
}

interface SidebarProps {
  blueprint: ThemeBlueprint;
  themeData: Record<string, any>;
  handleColorChange: (key: string, color: string) => void;
  handleImageUpload: (key: string, imageUrl: string) => void;
  handlePropertyChange: (key: string, value: string) => void;
  toggleSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  blueprint,
  themeData,
  handleColorChange,
  handleImageUpload,
  handlePropertyChange,
  toggleSection
}) => {

  const renderElement = (key: string, type: string) => {
    if (type === 'color') {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      return (
        <li>
        <div key={key} className="sidebar-element">
          <label>{label}</label>
          <ColorPicker 
            defaultColor={themeData[key] || '#ffffff'}
            onColorChange={(color) => handleColorChange(key, color)} />
        </div>
        </li>
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
console.log('Blueprint:', blueprint);
console.log('ThemeData:', themeData);
  return (
    <div>
      <h3>Coloring</h3>
      <h4 onClick={() => toggleSection('frame')}>Frame</h4>
      <ul id="frame">
      {Object.entries(blueprint.colors).map(([key, value]) => 
        ((key.includes('frame')) ? renderElement(key, value.type) : null)
      )}
      </ul>
      <h4>Toolbar</h4>
      <ul id="toolbar">
      {Object.entries(blueprint.colors).map(([key, value]) => 
        ((key.includes('toolbar')) ? renderElement(key, value.type) : null)
      )}
      </ul>
      <h4>Sidebar</h4>
      <ul id="sidebar">

      {Object.entries(blueprint.colors).map(([key, value]) => 
        ((key.includes('sidebar')) ? renderElement(key, value.type) : null)
      )}
      </ul>
      <h4>Popup</h4>
      <ul id="popup">

      {Object.entries(blueprint.colors).map(([key, value]) => 
        ((key.includes('popup')) ? renderElement(key, value.type) : null)
      )}
      </ul>
      <h4>Tab</h4>
      <ul id="tab">
      {Object.entries(blueprint.colors).map(([key, value]) => 
        ((key.includes('tab')) ? renderElement(key, value.type) : null)
      )}
      </ul>
      <h4>Misc</h4>
      <ul id="misc">
      {Object.entries(blueprint.colors).map(([key, value]) => 
        ((!key.includes('tab') && !key.includes('frame') && !key.includes('toolbar') && !key.includes('sidebar') && !key.includes('popup')) ? renderElement(key, value.type) : null)
      )}
      </ul>
      <h3>Images</h3>
      {Object.entries(blueprint.images).map(([key, value]) => renderElement(key, value.type))}
      <h3>Properties</h3>
      {Object.entries(blueprint.properties).map(([key, value]) => renderElement(key, value.type))}
    </div>
  );
};

export default Sidebar;
