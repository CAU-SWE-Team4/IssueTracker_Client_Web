import { React, useState } from 'react';

const issues = [
  { issue_id: 1, title: 'Login Bug', description: 'The login button does not respond after multiple clicks.', reporter_id: 'Alice', state: 'new', reported_date: '2023-05-01', edited_date: null, assignee_id: "minsiki2", fixer_id: null, priority: "HIGH" },
  { issue_id: 2, title: 'Profile Page Error', description: 'Profile page throws a 404 error for some users.', reporter_id: 'Bob', state: 'fixed', reported_date: '2023-05-02', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 3, title: 'Signup Form Issue', description: 'Signup form validation is not working as expected.', reporter_id: 'Charlie', state: 'closed', reported_date: '2023-05-03', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 4, title: 'UI Misalignment', description: 'UI elements are not aligned properly on the dashboard.', reporter_id: 'David', state: 'disposed', reported_date: '2023-05-04', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 5, title: 'Performance Lag', description: 'The application experiences lag during peak hours.', reporter_id: 'Eve', state: 'new', reported_date: '2023-05-05', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 6, title: 'Login Bug', description: 'The login button does not respond after multiple clicks.', reporter_id: 'Alice', state: 'new', reported_date: '2023-05-01', edited_date: null, assignee_id: "minsiki2", fixer_id: null, priority: "HIGH" },
  { issue_id: 7, title: 'Profile Page Error', description: 'Profile page throws a 404 error for some users.', reporter_id: 'Bob', state: 'fixed', reported_date: '2023-05-02', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 8, title: 'Signup Form Issue', description: 'Signup form validation is not working as expected.', reporter_id: 'Charlie', state: 'closed', reported_date: '2023-05-03', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 9, title: 'UI Misalignment', description: 'UI elements are not aligned properly on the dashboard.', reporter_id: 'David', state: 'disposed', reported_date: '2023-05-04', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 10, title: 'Performance Lag', description: 'The application experiences lag during peak hours.', reporter_id: 'Eve', state: 'new', reported_date: '2023-05-05', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 11, title: 'Login Bug', description: 'The login button does not respond after multiple clicks.', reporter_id: 'Alice', state: 'new', reported_date: '2023-05-01', edited_date: null, assignee_id: "minsiki2", fixer_id: null, priority: "HIGH" },
  { issue_id: 12, title: 'Profile Page Error', description: 'Profile page throws a 404 error for some users.', reporter_id: 'Bob', state: 'fixed', reported_date: '2023-05-02', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 13, title: 'Signup Form Issue', description: 'Signup form validation is not working as expected.', reporter_id: 'Charlie', state: 'closed', reported_date: '2023-05-03', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 14, title: 'UI Misalignment', description: 'UI elements are not aligned properly on the dashboard.', reporter_id: 'David', state: 'disposed', reported_date: '2023-05-04', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 15, title: 'Performance Lag', description: 'The application experiences lag during peak hours.', reporter_id: 'Eve', state: 'new', reported_date: '2023-05-05', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 16, title: 'Login Bug', description: 'The login button does not respond after multiple clicks.', reporter_id: 'Alice', state: 'new', reported_date: '2023-05-01', edited_date: null, assignee_id: "minsiki2", fixer_id: null, priority: "HIGH" },
  { issue_id: 17, title: 'Profile Page Error', description: 'Profile page throws a 404 error for some users.', reporter_id: 'Bob', state: 'fixed', reported_date: '2023-05-02', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 18, title: 'Signup Form Issue', description: 'Signup form validation is not working as expected.', reporter_id: 'Charlie', state: 'closed', reported_date: '2023-05-03', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 19, title: 'UI Misalignment', description: 'UI elements are not aligned properly on the dashboard.', reporter_id: 'David', state: 'disposed', reported_date: '2023-05-04', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
  { issue_id: 20, title: 'Performance Lag', description: 'The application experiences lag during peak hours.', reporter_id: 'Eve', state: 'new', reported_date: '2023-05-05', edited_date: null, assignee_id: null, fixer_id: null, priority: "HIGH" },
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

const IssueList = ({ project, onSelectIssue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIssues, setFilteredIssues] = useState(issues);
  const [searchCategory, setSearchCategory] = useState('title');

  const handleSearch = () => {
    const filtered = issues.filter((issue) => {
      if (searchCategory === 'title') {
        return issue.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchCategory === 'assignee') {
        return issue.assignee_id?.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchCategory === 'reporter') {
        return issue.reporter_id.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
    setFilteredIssues(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{project.name} Issues</h2>
      <div className="flex mb-4">
        <div className="mr-2 p-2  border border-gray-300 rounded">
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="assignee">Assignee</option>
            <option value="reporter">Reporter</option>
          </select>
        </div>
        <input
          type="text"
          placeholder={`Search by ${searchCategory}...`}
          className="flex-grow p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <div 
        className="grid grid-cols-4 gap-4 font-semibold border-b pb-2 mb-2"
        style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr'}}
      >
        <div>Title</div>
        <div>Assignee</div>
        <div>Reporter</div>
        <div>Date</div>
      </div>
      <ul>
        {filteredIssues.map((issue) => (
          <li
            key={issue.issue_id}
            className="p-2 cursor-pointer border-b hover:bg-gray-200 grid grid-cols-4 gap-2"
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr'}}
            onClick={() => onSelectIssue(issue)}
          >
            <div className="flex items-center">
              <span>{issue.title}</span>
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white leading-tight ${getStatusColor(issue.state)}`}>
                {issue.state}
              </span>
            </div>
            <span>{issue.assignee_id}</span>
            <span>{issue.reporter_id}</span>
            <span>{issue.reported_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
