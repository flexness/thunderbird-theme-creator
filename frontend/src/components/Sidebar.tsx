import React from 'react';

interface SidebarProps {
  style: React.CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ style }) => (
  <div className="sidebar" style={style}>
    Sidebar
  </div>
);

export default Sidebar;
