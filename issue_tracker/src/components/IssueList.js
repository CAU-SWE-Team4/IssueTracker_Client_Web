import React from 'react';

const issues = [
  { id: 1, title: 'Login Bug', content: 'The login button does not respond after multiple clicks.', assignee: 'Alice', status: 'new', date: '2023-05-01' },
  { id: 2, title: 'Profile Page Error', content: 'Profile page throws a 404 error for some users.', assignee: 'Bob', status: 'fixed', date: '2023-05-02' },
  { id: 3, title: 'Signup Form Issue', content: 'Signup form validation is not working as expected.', assignee: 'Charlie', status: 'closed', date: '2023-05-03' },
  { id: 4, title: 'UI Misalignment', content: 'UI elements are not aligned properly on the dashboard.', assignee: 'David', status: 'disposed', date: '2023-05-04' },
  { id: 5, title: 'Performance Lag', content: 'The application experiences lag during peak hours.', assignee: 'Eve', status: 'new', date: '2023-05-05' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'new':
      return 'bg-blue-500';
    case 'fixed':
      return 'bg-green-500';
    case 'closed':
      return 'bg-red-500';
    case 'disposed':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

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
          <div className="flex justify-between items-center">
            <span>{issue.title}</span>
            <span>{issue.assignee}</span>
            <span className={`px-2 py-1 rounded-full text-white ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
            <span>{issue.date}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default IssueList;
