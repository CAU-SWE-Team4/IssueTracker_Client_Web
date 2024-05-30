import React from 'react';

const issues = [
  { issue_id: 1, title: 'Login Bug', description: 'The login button does not respond after multiple clicks.', reporter_id: 'Alice', state: 'new', reported_date: '2023-05-01', edited_date: null, assignee_id: "minsiki2", fixer_id: null, priority: "HIGH" },
  { issue_id: 2, title: 'Profile Page Error', description: 'Profile page throws a 404 error for some users.', reporter_id: 'Bob', state: 'fixed', reported_date: '2023-05-02', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 3, title: 'Signup Form Issue', description: 'Signup form validation is not working as expected.', reporter_id: 'Charlie', state: 'closed', reported_date: '2023-05-03', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 4, title: 'UI Misalignment', description: 'UI elements are not aligned properly on the dashboard.', reporter_id: 'David', state: 'disposed', reported_date: '2023-05-04', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 5, title: 'Performance Lag', description: 'The application experiences lag during peak hours.', reporter_id: 'Eve', state: 'new', reported_date: '2023-05-05', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'new':
      return 'bg-yellow-500';
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
    <h2 className="text-xl font-bold mb-4">{project.name} Issues</h2>
    <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2 mb-2">
      <div>Title</div>
      <div>Assignee</div>
      <div>Date</div>
    </div>
    <ul>
      {issues.map((issue) => (
        <li
          key={issue.issue_id}
          className="p-2 cursor-pointer border-b hover:bg-gray-200 grid grid-cols-3 gap-4"
          onClick={() => onSelectIssue(issue)}
        >
          <div className="flex items-center">
            <span>{issue.title}</span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white leading-tight ${getStatusColor(issue.state)}`}>
              {issue.state}
            </span>
          </div>
          <span>{issue.reporter_id}</span>
          <span>{issue.reported_date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default IssueList;
