import React from 'react';

const MenuContent = ({ menu }) => {
  switch (menu.name) {
    case 'Menu A':
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu A Content</h2>
          <p>This is the content for Menu A.</p>
        </div>
      );
    case 'Menu B':
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu B Content</h2>
          <p>This is the content for Menu B.</p>
        </div>
      );
    case 'Menu C':
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu C Content</h2>
          <p>This is the content for Menu C.</p>
        </div>
      );
    default:
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Select a Menu</h2>
          <p>Please select a menu to see the content.</p>
        </div>
      );
  }
};

export default MenuContent;
