import React, { useState, useEffect, useRef } from 'react';
import { RiMoreLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import CommentList from "./CommentList"

const IssueDetail = ({ issue, onClose }) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'John', text: 'This is the first comment.', date: '2023-05-03' },
    { id: 2, author: 'Jane', text: 'This is the second comment.', date: '2023-05-04' },
  ]);
  const [newComment, setNewComment] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);


  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: 'You', text: newComment, date: new Date().toISOString().split('T')[0] },
      ]);
      setNewComment('');
    }
  };

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

  const getStatus = (status) => {
    switch (status) {
      case 'new':
      case 'fixed':
        return 'Close issue';
      case 'closed':
      case 'disposed':
        return 'Reopen issue';
      default:
        return 'Close issue';
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 relative h-[90vh] max-h-[90vh] overflow-y-auto">
        <button className="absolute top-2 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        <div className="flex flex-row w-[100%] h-[100%]">
          <div className="w-[80%] mr-4">
            <div className="mb-4">
              <div className="flex flex-col">
                <div className="flex items-end justify-start">
                  <h2 className="text-2xl font-bold">{issue.title}</h2>
                  <h2 className="text-xl font-bold ml-3 text-gray-400/80">#{issue.id}</h2>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <span className={`px-2 py-0.8 mb-0.5 rounded-full text-white ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                  <p className="font-bold text-gray-500 ml-2 mr-1">{issue.assignee}</p>
                  <p> opened this issue at {issue.date}</p>
                </div>
              </div>
            </div>
            <div className="border p-2 mb-4 rounded bg-blue-100/50">
              <div className="relative">
                <h3 className="text-xl font-semibold ml-1 mb-2">Issue Content</h3>
                <div className="border p-4 rounded bg-white">
                  <p>{issue.content}</p>
                </div>
                <div className="absolute top-1 right-2">
                  <button onClick={handleDropdownToggle} className="text-gray-500 hover:text-gray-700">
                    <RiMoreLine/>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 w-48 bg-white border rounded shadow-lg">
                      <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Edit</button>
                      <button className="block w-full px-4 py-2 text-left text-red-700 hover:bg-gray-100">Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CommentList comments={comments}/>
				    <div ref={commentsEndRef} />
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Add a comment</h4>
              <textarea
                className="w-full p-2 border rounded mr-2"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex flex-row justify-end w-100%">
                { getStatus(issue.status) === "Close issue" ?
                <button
                  className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-500 text-white border-gray-600 hover:bg-red-400 hover:border-gray-600 focus:ring-gray-700"
                  onClick={handleAddComment}
                >
                  Dispose issue
                </button> : <></>}
                <button
                  className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-600 text-white border-gray-600 hover:bg-gray-500 hover:border-gray-600 focus:ring-gray-700"
                  onClick={handleAddComment}
                >
                  { getStatus(issue.status) }
                </button>
                <button
                  className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleAddComment}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
          <div className="w-[20%] h-[90%] mt-20">
            <div className="flex justify-between items-center w-[100%] h-12 bg-white border text-sm font-bold text-gray-500">
              <p className="ml-4">Assignee</p>
              <IoMdArrowDropdown className="mr-2" size={18}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
