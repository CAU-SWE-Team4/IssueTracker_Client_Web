import React from 'react';

const projects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
  { id: 3, name: 'Project C' },
];

const ProjectList = ({ onSelectProject }) => (
  <div className="p-4">
    <ul>
      {projects.map((project) => (
        <li
          key={project.id}
          className="p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => {
            onSelectProject(project);
          }}
        >
          {project.name}
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectList;
