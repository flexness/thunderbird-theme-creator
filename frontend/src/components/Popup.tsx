import React from 'react';

interface PopupProps {
  backgroundColor: string;
  textColor: string;
}

const Popup: React.FC<PopupProps> = ({ backgroundColor, textColor }) => {
  return (
    <div style={{ backgroundColor, color: textColor, padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
      Popup
    </div>
  );
};

export default Popup;
