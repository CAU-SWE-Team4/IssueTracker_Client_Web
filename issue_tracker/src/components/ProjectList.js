import React, { useState } from 'react';
import { FaRegSquarePlus } from "react-icons/fa6";
import { PiFinnTheHuman } from "react-icons/pi";

const projects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
  { id: 3, name: 'Project C' },
];

const ProjectList = ({ onSelectProject, selectedProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [memberRoles, setMemberRoles] = useState({});
  const [allUsers, setAllUsers] = useState([
    { id: 'minseok128', name: 'Minseok' },
    { id: 'lucete012', name: 'Lucete' },
    { id: 'john_doe', name: 'John Doe' },
    { id: 'jane_doe', name: 'Jane Doe' },
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewProjectTitle('');
    setMemberRoles({});
  };

  const handleRoleChange = (userId, role) => {
    setMemberRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: role,
    }));
  };

  const handleSubmit = () => {
    const members = Object.entries(memberRoles)
      .filter(([userId, role]) => role !== 'NONE')
      .map(([userId, role]) => ({ user_id: userId, role }));

    const newProject = {
      title: newProjectTitle,
      members,
    };

    console.log('POST data:', newProject);
    //POST 로직

    closeModal();
  };

  return (
    <div className="p-4">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`p-3 cursor-pointer hover:text-lg hover:font-bold flex justify-center ${selectedProject?.id === project.id ? 'font-bold text-xl' : 'text-gray-400'}`}
            onClick={() => onSelectProject(project)}
          >
            {project.name}
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          className="text-blue-500 hover:text-blue-700 font-medium rounded-lg px-5 py-2.5 mt-4 flex items-center"
          onClick={openModal}
        >
          <FaRegSquarePlus className="mr-2" size={20} />
          New project
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
            <h3 className="text-lg font-semibold mb-2">Assign Roles</h3>
            {allUsers.map((user) => (
              <div key={user.id} className="flex items-center mb-2">
                <PiFinnTheHuman size={24}/>
                <span className="ml-2 w-1/3">{user.name}</span>
                <select
                  className="w-2/3 p-2 border border-gray-300 rounded-lg"
                  value={memberRoles[user.id] || 'NONE'}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="PL">PL</option>
                  <option value="DEV">DEV</option>
                  <option value="TESTER">TESTER</option>
                  <option value="NONE">NONE</option>
                </select>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                className="text-red-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
