import React from 'react';

interface TabProps {
  style: React.CSSProperties;
  label: string;
}


const Tab: React.FC<TabProps> = ({ style }) => (
  <div className="tab" style={style}>
    Tab
  </div>
);

export default Tab;

