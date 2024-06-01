import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { PiFinnTheHuman } from 'react-icons/pi';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';

const ProjectList = ({ onSelectProject, selectedProject, id, pw }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [memberRoles, setMemberRoles] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const urlParams = `?id=${id}&pw=${pw}`;
        const response = await fetch('/project' + urlParams);
        if (response.ok) {
          const data = await response.json();
          if (data.projects && Array.isArray(data.projects)) {
            setProjects(data.projects);
          }
        } else {
          console.error('Error fetching projects: ', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching projects: ', error);
      }
    };
    getProjects();
  }, [id, pw]);

  const openModal = async () => {
    try {
      const urlParams = `?id=${id}&pw=${pw}`;
      const response = await fetch('/user' + urlParams);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data && Array.isArray(data)) {
          setAllUsers(data);
        }
      } else {
        console.error('Error fetching users: ', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingProject(null);
    setNewProjectTitle('');
    setMemberRoles({});
  };

  const openEditModal = async (project) => {
    setIsEditing(true);
    setEditingProject(project);
    setNewProjectTitle(project.title);
    const roles = (project.members || []).reduce((acc, member) => {
      acc[member.user_id] = member.role;
      return acc;
    }, {});
    console.log(roles);
    setMemberRoles(roles);

    // await getUser(project.project_id);
    openModal();
  };

  // const getUser = async (pId) => {
  //   const urlParams = `?id=${id}&pw=${pw}`;
  //   const response = await fetch(`/project/${pId}` + urlParams);
  //   if (response.ok) {
  //     const data = await response.json();
  //     if (data.members && Array.isArray(data.members)) {
  //       setAllUsers(data.members);
  //     }
  //   } else {
  //     console.error('Error fetching projects: ', response.statusText);
  //   }
  // };

  const handleRoleChange = (userId, role) => {
    setMemberRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: role,
    }));
  };

  const handleSubmit = async () => {
    const members = Object.entries(memberRoles)
      .filter(([userId, role]) => role !== 'NONE')
      .map(([userId, role]) => ({ user_id: userId, role: role }));

    const projectData = {
      title: newProjectTitle,
      members: members,
    };

    const urlParams = `?id=${id}&pw=${pw}`;

    if (isEditing && editingProject) {
      // PUT 로직 (프로젝트 수정)
      const response = await fetch(
        `/project/${editingProject.project_id}` + urlParams,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        }
      );

      if (response.ok) {
        const updateResponse = await fetch('/project' + urlParams);
        const contentType = updateResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const updatedProject = await updateResponse.json(); // await 추가
          setProjects(updatedProject.projects);
          closeModal();
        }
      }
    } else {
      // POST 로직 (새 프로젝트 생성)

      const response = await fetch('/project' + urlParams, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const newResponse = await fetch('/project' + urlParams);
        const contentType = newResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const newProject = await newResponse.json(); // await 추가
          setProjects(newProject.projects);
          closeModal();
        }
      }
    }
  };

  const deleteProject = async (projectId) => {
    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(`/project/${projectId}` + urlParams, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.project_id !== projectId)
      );
    } else if (response.status === 401) {
      console.error('Unauthorized: Invalid ID or password.');
    } else if (response.status === 403) {
      console.error(
        'Forbidden: You do not have permission to delete this project.'
      );
    } else {
      console.error('Error deleting project: ', response.statusText);
    }
  };
  return (
    <div className="p-4">
      <ul>
        {projects.map((project) => (
          <li
            key={project.project_id}
            className={`py-3 cursor-pointer hover:text-lg hover:font-bold flex justify-start ${
              selectedProject?.project_id === project.project_id
                ? 'font-bold text-xl'
                : 'text-gray-400'
            }`}
            onClick={() => onSelectProject(project)}
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p>{project.title}</p>
              <div
                className={`flex flex-row ${
                  selectedProject?.project_id === project.project_id
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-400'
                }`}
              >
                <button
                  className="hover:text-gray-600 rounded-lg flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(project);
                  }}
                >
                  <RiEditLine className="mr-2" size={20} />
                </button>
                <button
                  className="hover:text-gray-600 rounded-lg flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.project_id);
                  }}
                >
                  <RiDeleteBinLine size={20} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        { id === "admin" && (<button
          className="text-blue-500 hover:text-blue-700 font-medium rounded-lg px-5 py-2.5 mt-4 flex items-center"
          onClick={openModal}
        >
          <FaRegSquarePlus className="mr-2" size={20} />
          New project
        </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center absolute z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Project' : 'New Project'}
            </h2>
            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              value={newProjectTitle}
              onChange={(e) => {
                if (e) setNewProjectTitle(e.target.value);
                else setNewProjectTitle(newProjectTitle);
              }}
            />
            <h3 className="text-lg font-semibold mb-2">Assign Roles</h3>
            {allUsers.map((user) => (
              <div key={user.user_id} className="flex items-center mb-2">
                <PiFinnTheHuman size={24} />
                <span className="ml-2 w-1/3">{user.name}</span>
                <select
                  className="w-2/3 p-2 border border-gray-300 rounded-lg"
                  value={memberRoles[user.user_id] || 'NONE'}
                  onChange={(e) =>
                    handleRoleChange(user.user_id, e.target.value)
                  }
                >
                  <option value="ADMIN">ADMIN</option>
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
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
