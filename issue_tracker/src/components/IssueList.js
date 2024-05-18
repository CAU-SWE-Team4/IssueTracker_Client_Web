import React from 'react';

const issues = [
  { id: 1, title: 'Issue 1', content: 'Wow, I\'m first issue!', assignee: 'Alice', status: 'new', date: '2023-05-01' },
  { id: 2, title: 'Issue 2', assignee: 'Bob', status: 'fixed', date: '2023-05-02' },
];

const IssueList = ({ project, onSelectIssue }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold">{project.name} Issues</h2>
    <ul>
      {issues.map((issue) => (
        <li
          key={issue.id}
          className="p-2 cursor-pointer border-b hover:bg-gray-200"
          onClick={() => onSelectIssue(issue)}
        >
          <div className="flex justify-between">
            <span>{issue.title}</span>
            <span>{issue.assignee}</span>
            <span>{issue.status}</span>
            <span>{issue.date}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default IssueList;
