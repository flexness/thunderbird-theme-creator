import React, { useState, useEffect } from 'react';

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string; // Accept additional classes as props
  onToggle?: (isOpen: boolean) => void; // Callback to notify visibility change
}

const Dropdown: React.FC<DropdownProps> = ({ label, children, className, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  return (
    <div className={`dropdown ${className}`}>
      <button onClick={toggleDropdown} className="dropdown-label">
        {label}
      </button>
      <div className={`dropdown-content`} style={{ display: isOpen ? 'block' : 'none' }}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
