import React from 'react';

interface StatusbarProps {
  style: React.CSSProperties;
}

const Statusbar: React.FC<StatusbarProps> = ({ style }) => (
  <div className="statusbar" style={style}>
    Statusbar
  </div>
);

export default Statusbar;


