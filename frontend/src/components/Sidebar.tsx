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
}

const Sidebar: React.FC<SidebarProps> = ({
  blueprint,
  themeData,
  handleColorChange,
  handleImageUpload,
  handlePropertyChange
}) => {

  const renderElement = (key: string, type: string) => {
    if (type === 'color') {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      return (
        <div key={key} className="sidebar-element">
          <label>{label}</label>
          <ColorPicker 
            defaultColor={themeData[key] || '#ffffff'}
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

  return (
    <div className="sidebar-settings">
      <h3>Coloring</h3>
      {Object.entries(blueprint.colors).map(([key, value]) => renderElement(key, value.type))}
      <h3>Images</h3>
      {Object.entries(blueprint.images).map(([key, value]) => renderElement(key, value.type))}
      <h3>Properties</h3>
      {Object.entries(blueprint.properties).map(([key, value]) => renderElement(key, value.type))}
    </div>
  );
};

export default Sidebar;
