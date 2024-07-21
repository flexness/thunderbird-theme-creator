import React from 'react';

interface ToolbarProps {
  style: React.CSSProperties;
}

const Toolbar: React.FC<ToolbarProps> = ({ style }) => (
  <div className="toolbar" style={style}>
    <nav>
      NAV
    </nav>
  </div>
);

export default Toolbar;
