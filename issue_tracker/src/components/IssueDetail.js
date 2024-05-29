import React, { useState, useEffect, useRef } from 'react';
import { RiMoreLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiFinnTheHuman } from "react-icons/pi";
import Comment from "./Comment"

const IssueDetail = ({ issue, onClose }) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'John', text: 'This is the first comment.', date: '2023-05-03' },
    { id: 2, author: 'Jane', text: 'This is the second comment.', date: '2023-05-04' },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const commentsEndRef = useRef(null);

  const members = [
    {user_id: "minseok128", role: "PL"},
    {user_id: "minsiki2", role: "dev"},
    {user_id: "yeojin", role: "dev"},
    {user_id: "junseob", role: "dev"},
    {user_id: "hun", role: "tester"},
  ]

  const recommends = ["minsiki2", "yeojin", "junseob"]

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const getStatusColor = (state) => {
    switch (state) {
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
                  <h2 className="text-xl ml-3 text-gray-400/80">#{issue.issue_id}</h2>
                </div>
                <div className="flex items-center justify-start mt-2">
                  <span className={`px-2 py-0.8 mb-0.5 rounded-full text-white ${getStatusColor(issue.state)}`}>
                    {issue.state}
                  </span>
                  <p className="font-bold text-gray-700 ml-2 mr-1">{issue.reporter_id}</p>
                  <p> opened this issue at {issue.reported_date}</p>
                </div>
              </div>
            </div>
            <div className="border p-2 mb-4 rounded bg-blue-100/50">
              <div className="relative">
                <h3 className="text-xl font-semibold ml-1 mb-2">Issue Content</h3>
                <div className="border p-4 rounded bg-white">
                  <p>{issue.description}</p>
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
            <Comment issue={issue} comments={comments} setComments={setComments}/>
				    <div ref={commentsEndRef} />
          </div>
          <div className="flex flex-col w-[20%] h-[90%] mt-20">
            <div className="flex flex-col items-start border">
              <div className="flex justify-between items-center w-[100%] h-10 bg-white  text-sm font-bold">
                <p className="ml-4">Assignees</p>
              </div>
              {
                issue.assignee_id ?
                <div className="flex items-center justify-start w-full px-4 pb-2">
                  <PiFinnTheHuman size={24}/>
                  <p className="ml-2 font-bold text-sm text-gray-700">{issue.assignee_id}</p>
                </div>
                :
                <div>
                  <p className="ml-6 mb-4 text-sm">No one :(</p>
                  <p className="ml-4 mb-2 font-semibold text-xs text-gray-400">Suggestions</p>
                  {recommends.map(recommend =>(
                    <div className="flex items-center justify-start w-full px-4 pb-2">
                      <PiFinnTheHuman size={24}/>
                      <button className="ml-2 font-bold text-sm text-gray-500 hover:text-black cursor-pointer">{recommend}</button>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
