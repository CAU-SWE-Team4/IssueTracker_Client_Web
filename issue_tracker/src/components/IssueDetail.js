import React, { useState, useEffect, useRef } from 'react';
import { RiMoreLine } from 'react-icons/ri';
import { IoMdArrowDropdown } from 'react-icons/io';
import { PiFinnTheHuman } from 'react-icons/pi';
import Comment from './Comment';
import { useInsertionEffect } from 'react';

const IssueDetail = ({ issue, setIssue, members, onClose, id, pw }) => {
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recommends, setRecommends] = useState([]);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    getComments();
    getRecommends();
  }, []);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const getIssue = async (issue) => {
    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${issue.project_id}/issue/${issue.id}` + urlParams
    );

    if (response.ok) {
      const data = await response.json();
      if (data) {
        setIssue(data);
      }
    }
  };

  const getComments = async () => {
    try {
      const urlParams = `?id=${id}&pw=${pw}`;
      const response = await fetch(
        `/project/${issue.project_id}/issue/${issue.id}/comment` + urlParams
      );

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setComments(data);
        }
      } else {
        console.error('Error getting comments: ', response.statusText);
      }
    } catch (error) {
      console.error('Error getting comments2: ', error);
    }
  };

  const getRecommends = async () => {
    try {
      const urlParams = `?id=${id}&pw=${pw}`;
      const response = await fetch(
        `/project/${issue.project_id}/issue/${issue.id}/recommend` + urlParams
      );

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.dev_ids)) {
          setRecommends(data.dev_ids);
        }
      } else {
        console.error('Error getting recommends: ', response.statusText);
      }
    } catch (error) {
      console.error('Error getting recommends2: ', error);
    }
  };

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
      case 'DISPOSED':
        return `bg-red-500`;
      case 'ASSIGNED':
        return `bg-gray-500`;
      default:
        return `bg-gray-500`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('ko-KO', options).replace(',', '');
  };

  const getUserRole = (userId) => {
    const user = members.find((u) => u.user_id === userId);
    return user ? user.role : null;
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEdit = (issue) => {
    setEditMode(issue.id);
    setEditedTitle(issue.title);
    setEditedDescription(issue.description);
    setDropdownOpen(null);
  };

  const handleDescriptionEditChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleTitleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSubmit = async (issueId) => {
    // 업데이트 로직
    console.log(
      `Updated comment ${issueId}: ${editedTitle} - ${editedDescription}`
    );

    const updateIssue = {
      title: editedTitle,
      description: editedDescription,
    };

    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${issue.project_id}/issue/${issueId}/content` + urlParams,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateIssue),
      }
    );
    getIssue(issue);
    setEditMode(null);
  };

  const handleDelete = async (issue) => {
    // 삭제 로직
    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${issue.project_id}/issue/${issue.id}` + urlParams,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      // setIssue((prevIssues) => prevIssues.filter((is) => is.id !== issue.id));
      onClose();
    } else if (response.status === 401) {
      console.error('Unauthorized: Invalid ID or password.');
    } else if (response.status === 403) {
      console.error(
        'Forbidden: You do not have permission to delete this project.'
      );
    } else {
      console.error('Error deleting project: ', response.statusText);
    }

    setDropdownOpen(null);
  };

  const handleAssigneeAndPriority = async (devId, updatedPriority) => {
    const updateAssigneeAndPriority = {
      user_id: devId,
      priority: updatedPriority,
    };

    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${issue.project_id}/issue/${issue.id}/assign` + urlParams,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateAssigneeAndPriority),
      }
    );
    getIssue(issue);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 relative h-[90vh] max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-row w-[100%] h-[100%]">
          <div className="w-[80%] mr-4">
            <div className="mb-4">
              <div className="flex flex-col">
                <div className="flex items-end justify-start">
                  {editMode === issue.id ? (
                    <div>
                      <textarea
                        className="w-full h-14 border rounded p-2 text-2xl font-bold"
                        value={editedTitle}
                        onChange={handleTitleEditChange}
                      />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold">{issue.title}</h2>
                  )}
                  <h2 className="text-xl ml-3 text-gray-400/80">#{issue.id}</h2>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <span
                    className={`px-2.5 py-1 mb-0.5 rounded-full text-white text-sm ${getStateBgColor(
                      issue.state
                    )}`}
                  >
                    {issue.state}
                  </span>
                  <p className="font-bold text-gray-700 ml-2 mr-1">
                    {issue.reporter_id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {' '}
                    opened this issue at {formatDate(issue.created_date)}{' '}
                    {formatDate(issue.modified_date) &&
                      `·
                    edited at ${formatDate(issue.modified_date)}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="border p-2 mb-4 rounded bg-blue-100/50">
              {editMode === issue.id ? (
                <div>
                  <h3 className="text-xl font-semibold ml-1 mb-2">
                    Issue Content
                  </h3>
                  <textarea
                    className="w-full border rounded p-2"
                    value={editedDescription}
                    onChange={handleDescriptionEditChange}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleEditSubmit(issue.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <h3 className="text-xl font-semibold ml-1 mb-2">
                    Issue Content
                  </h3>
                  <div className="border p-4 rounded bg-white">
                    <p>{issue.description}</p>
                  </div>
                  <div className="absolute top-1 right-2">
                    <button
                      onClick={handleDropdownToggle}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <RiMoreLine />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 w-48 bg-white border rounded shadow-lg">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleEdit(issue)}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                          onClick={() => handleDelete(issue)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Comment
              issue={issue}
              getIssue={getIssue}
              comments={comments}
              getComments={getComments}
              formatDate={formatDate}
              id={id}
              pw={pw}
            />
            <div ref={commentsEndRef} />
          </div>
          <div className="flex flex-col w-[20%] h-[90%] mt-20">
            <div className="flex flex-col items-start border">
              <div className="flex justify-between items-center w-[100%] h-10 bg-white  text-sm font-bold">
                <p className="ml-4">Assignees</p>
              </div>
              {issue.assignee_id ? (
                <div className="flex items-center justify-start w-full px-4 pb-2">
                  <PiFinnTheHuman size={24} />
                  <p className="ml-2 font-bold text-sm text-gray-700">
                    {issue.assignee_id}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="ml-6 mb-4 text-sm">No one :(</p>
                  {getUserRole(id) === 'PL' ? (
                    <div>
                      <p className="ml-4 mb-2 font-semibold text-xs text-gray-400">
                        Suggestions
                      </p>
                      {recommends.map((recommend) => (
                        <div className="flex items-center justify-start w-full px-4 pb-2">
                          <PiFinnTheHuman size={24} />
                          <button
                            className="ml-2 font-bold text-sm text-gray-500 hover:text-black cursor-pointer"
                            onClick={() =>
                              handleAssigneeAndPriority(
                                recommend,
                                issue.priority
                              )
                            }
                          >
                            {recommend}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssueDetail;
