import React from 'react';

const menus = [
  { id: 1, name: 'Menu A' },
  { id: 2, name: 'Menu B' },
  { id: 3, name: 'Menu C' },
];

const MenuList = ({ onSelectProject, onSelectMenu }) => (
  <div className="p-4">
    <ul>
      {menus.map((menu) => (
        <li
          key={menu.id}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => {
            onSelectProject(null);
            onSelectMenu(menu);
          }}
        >
          {menu.name}
        </li>
      ))}
    </ul>
  </div>
);

export default MenuList;
