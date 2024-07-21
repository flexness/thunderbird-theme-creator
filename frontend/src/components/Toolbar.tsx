import React from 'react';

interface ToolbarProps {
  backgroundColor: string;
  textColor: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ backgroundColor, textColor }) => {
  return (
    <div style={{ backgroundColor, color: textColor, padding: '10px' }}>
      Toolbar
    </div>
  );
};

export default Toolbar;
