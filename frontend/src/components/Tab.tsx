import React from 'react';

interface TabProps {
  backgroundColor: string;
  textColor: string;
}

const Tab: React.FC<TabProps> = ({ backgroundColor, textColor }) => {
  return (
    <div style={{ backgroundColor, color: textColor, padding: '5px', margin: '5px', border: '1px solid #ccc' }}>
      Tab
    </div>
  );
};

export default Tab;
