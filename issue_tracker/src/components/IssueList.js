import { React, useState, useEffect } from 'react';

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

const getStatusColor = (status, prefix) => {
  switch (status) {
    case 'new':
      return `${prefix}-yellow-500`;
    case 'fixed':
      return `${prefix}-green-500`;
    case 'closed':
      return `${prefix}-red-500`;
    case 'disposed':
      return `${prefix}-gray-500`;
    default:
      return `${prefix}-gray-500`;
  }
};

const IssueList = ({ project, onSelectIssue }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIssues, setFilteredIssues] = useState(issues);
  const [searchCategory, setSearchCategory] = useState('title');
  const [selectedState, setSelectedState] = useState(null);

  const handleSearch = () => {
    const filtered = issues.filter((issue) => {
      if (searchCategory === 'title') {
        return issue.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchCategory === 'assignee') {
        return issue.assignee_id?.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchCategory === 'reporter') {
        return issue.reporter_id.toLowerCase().includes(searchQuery.toLowerCase());
      }  else if (searchCategory === 'state') {
        return selectedState ? issue.state === selectedState : true;
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

  const handleStateClick = (state) => {
    setSelectedState(prevState => (prevState === state ? null : state));
    setSearchQuery(''); 
  };

  useEffect(() => {
    handleSearch(selectedState);
  }, [selectedState]);
  
  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setSelectedState(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{project.name} Issues</h2>
      <div className="flex mb-4">
        <div className={`p-2  border-l border-t border-b ${searchCategory === "state" ? "border-r rounded-tr-lg rounded-br-lg" : ""} border-gray-300 rounded-tl-lg rounded-bl-lg`}>
          <select
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option value="title">Title</option>
            <option value="assignee">Assignee</option>
            <option value="reporter">Reporter</option>
            <option value="state">State</option>
          </select>
        </div>
        { searchCategory === "state" ? (
          <div className="flex space-x-2 ml-4 items-center">
            {['new', 'fixed', 'disposed', 'closed'].map(state => (
              <button
                key={state}
                className={`h-8 font-large px-2 pb-0.5 border-2 transform transition-transform duration-100 hover:scale-110 rounded-full leading-tight ${selectedState === state ? "text-white" : getStatusColor(state, "text") } ${getStatusColor(state, "border")} ${selectedState === state ? `${getStatusColor(state, "bg")}` : ""}`}
                onClick={() => handleStateClick(state)}
              >
                {state}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex w-full">
            <input
              type="text"
              placeholder={`Search by ${searchCategory}...`}
              className="flex-grow p-2 border border-gray-300 rounded-tr-lg rounded-br-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        )}
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
              <span className={`ml-2 px-2 pt-0.5 pb-1 text-xs rounded-full text-white leading-tight ${getStatusColor(issue.state, "bg")}`}>
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
