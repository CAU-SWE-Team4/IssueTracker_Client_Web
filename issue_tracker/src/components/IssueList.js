import { React, useState, useEffect } from 'react';
import IssueStatistics from './IssueStatistics';
import { PiFinnTheHuman } from 'react-icons/pi';

const getStateBgColor = (state) => {
  switch (state) {
    case 'NEW':
      return `bg-yellow-500`;
    case 'FIXED':
      return `bg-blue-500`;
    case 'RESOLVED':
      return `bg-green-500`;
    case 'CLOSED':
      return `bg-violet-500`;
    case 'REOPEN':
      return `bg-pink-400`;
    case 'DISPOSED':
      return `bg-red-500`;
    case 'ASSIGNED':
      return `bg-gray-500`;
    default:
      return `bg-gray-500`;
  }
};

const getStateTextColor = (state) => {
  switch (state) {
    case 'NEW':
      return `text-yellow-500`;
    case 'FIXED':
      return `text-blue-500`;
    case 'RESOLVED':
      return `text-green-500`;
    case 'CLOSED':
      return `text-violet-500`;
    case 'REOPEN':
      return `text-pink-400`;
    case 'DISPOSED':
      return `text-red-500`;
    case 'ASSIGNED':
      return `text-gray-500`;
    default:
      return `text-gray-500`;
  }
};

const getStateBorderColor = (state) => {
  switch (state) {
    case 'NEW':
      return `border-yellow-500`;
    case 'FIXED':
      return `border-blue-500`;
    case 'RESOLVED':
      return `border-green-500`;
    case 'CLOSED':
      return `border-violet-500`;
    case 'REOPEN':
      return `border-pink-400`;
    case 'DISPOSED':
      return `border-red-500`;
    case 'ASSIGNED':
      return `border-gray-500`;
    default:
      return `border-gray-500`;
  }
};

const getPriorityTextColor = (priority) => {
  switch (priority) {
    case 'BLOCKER':
      return `text-red-800`;
    case 'CRITICAL':
      return `text-red-500`;
    case 'MINOR':
      return `text-violet-500`;
    case 'TRIVIAL':
      return `text-gray-600`;
    default:
      return `text-blue-500`;
  }
};

const IssueList = ({ project, members, setMembers, onSelectIssue, id, pw }) => {
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedState, setSelectedState] = useState('NEW');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueDescription, setNewIssueDescription] = useState('');
  const [issues, setIssues] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchContent, setSearchContent] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    getStats();
    getIssues();
    getMembers();
    setUserRole(getUserRole(id));
  }, [project]);

  useEffect(() => {
    // handleSearch(selectedState);
    getIssues();
  }, [selectedState]);

  useEffect(() => {
    console.log(stats);
  }, [stats]);

  const getUserRole = (userId) => {
    const user = members.find((u) => u.user_id === userId);
    return user ? user.role : null;
  };

  const getStats = async () => {
    try {
      const urlParams = `?id=${id}&pw=${pw}`;
      const response = await fetch(
        `/project/${project.project_id}/issue/statistic` + urlParams
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setStats(data);
        }
      } else {
        console.error('Error fetching users: ', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const getMembers = async () => {
    try {
      const urlParams = `?id=${id}&pw=${pw}`;
      const response = await fetch(
        `/project/${project.project_id}/userRole` + urlParams
      );
      if (response.ok) {
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setMembers(data);
        }
      } else {
        console.error('Error fetching users: ', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  const getIssues = async () => {
    const urlParams = `?id=${id}&pw=${pw}&filterBy=${searchCategory}&filterValue=${searchContent}`;
    const response = await fetch(
      `/project/${project.project_id}/issue` + urlParams
    );

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setIssues(data);
      }
    }
  };

  const getIssue = async (issue) => {
    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${project.project_id}/issue/${issue.id}` + urlParams
    );

    if (response.ok) {
      const data = await response.json();
      if (data) {
        onSelectIssue(data);
      }
    }
  };

  const handleSearch = () => {
    setSearchCategory(searchCategory);
    getIssues();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleStateClick = (state) => {
    setSelectedState(state);
    setSearchContent(state);
    getIssues();
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setSearchContent('');
    setSelectedState(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewIssueTitle('');
    setNewIssueDescription('');
  };

  const openUserModal = async () => {
    // await getUser(project.project_id);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleNewIssueSubmit = async () => {
    const newIssue = {
      title: newIssueTitle,
      description: newIssueDescription,
    };

    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${project.project_id}/issue` + urlParams,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIssue),
      }
    );

    if (response.ok) {
      getIssues();
      closeModal();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
        {project.title} Issues
        <button
          className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={openUserModal}
        >
          Show Users
        </button>
      </h2>
      <IssueStatistics stats={stats} />
      <div className="flex mb-4">
        <div
          className={`p-2  border-l border-t border-b ${
            searchCategory === 'state'
              ? 'border-r rounded-tr-lg rounded-br-lg'
              : ''
          } border-gray-300 rounded-tl-lg rounded-bl-lg`}
        >
          <select value={searchCategory} onChange={handleCategoryChange}>
            <option value="title">Title</option>
            <option value="assignee">Assignee</option>
            <option value="reporter">Reporter</option>
            <option value="state">State</option>
          </select>
        </div>
        {searchCategory === 'state' ? (
          <div className="flex space-x-2 ml-4 items-center">
            {['NEW', 'REOPEN', 'ASSIGNED', 'FIXED', 'RESOLVED', 'DISPOSED', 'CLOSED'].map(
              (state) => (
                <button
                  key={state}
                  className={`h-8 font-large text-sm px-2 pb-0.5 border-2 transform transition-transform duration-100 hover:scale-110 rounded-full leading-tight ${
                    selectedState === state
                      ? 'text-white'
                      : getStateTextColor(state)
                  } ${getStateBorderColor(state)} ${
                    selectedState === state ? `${getStateBgColor(state)}` : ''
                  }`}
                  onClick={() => handleStateClick(state)}
                >
                  {state}
                </button>
              )
            )}
          </div>
        ) : (
          <div className="flex w-full">
            <input
              type="text"
              placeholder={`Search by ${searchCategory}...`}
              className="flex-grow p-2 border border-gray-300 rounded-tr-lg rounded-br-lg"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
            {userRole === "TESTER" && (
              <button
                className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={openModal}
              >
                New issue
              </button>
            )}
          </div>
        )}
      </div>
      <div
        className="grid grid-cols-4 gap-4 font-semibold border-b pb-2 mb-2"
        style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
      >
        <div>Title</div>
        <div>Priority</div>
        <div>Assignee</div>
        <div>Reporter</div>
        <div>Date</div>
      </div>
      <ul>
        {issues.map((issue) => (
          <li
            key={issue.id}
            className="p-2 cursor-pointer border-b hover:bg-gray-200 grid grid-cols-4 gap-2"
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr' }}
            onClick={() => getIssue(issue)}
          >
            <div className="flex items-center">
              <span>{issue.title}</span>
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white leading-tight ${getStateBgColor(
                  issue.state
                )}`}
              >
                {issue.state}
              </span>
            </div>
            <span className={`${getPriorityTextColor(issue.priority)}`}>{issue.priority}</span>
            <span>{issue.assignee_id}</span>
            <span>{issue.reporter_id}</span>
            <span>{issue.created_date.slice(0, 10)}</span>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">New Issue</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              value={newIssueTitle}
              onChange={(e) => setNewIssueTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full h-96 p-2 mb-4 border border-gray-300 rounded-lg"
              value={newIssueDescription}
              onChange={(e) => setNewIssueDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="text-red-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handleNewIssueSubmit}
              >
                Open issue
              </button>
            </div>
          </div>
        </div>
      )}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">Project Members</h2>
            <ul>
              {members.map((member) => (
                <li key={member.user_id} className="flex flex-row ml-2 mb-2">
                  <PiFinnTheHuman size={24} />
                  <span className="ml-2 font-semibold">
                    {member.user_id}
                  </span> - <span>{member.role}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                className="text-red-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={closeUserModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueList;
