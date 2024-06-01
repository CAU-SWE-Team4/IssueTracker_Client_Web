import React, { useState, useEffect, useRef } from 'react';
import { RiMoreLine } from "react-icons/ri";

const Comment = ({ issue, comments, getComments, formatDate, id, pw }) => {
	
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

	const handleAddComment = async () => {
		const addedComment = {
			content: newComment
		};
    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${issue.project_id}/issue/${issue.id}/comment` + urlParams,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addedComment),
      }
    );

    if (response.ok) {
			getComments();
			setEditedComment('');
    }
  };

	const getStatus = (state) => {
    switch (state) {
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

	const handleDropdownToggle = (commentId) => {
    setDropdownOpen(dropdownOpen === commentId ? null : commentId);
  };

  const handleEdit = (comment) => {
		setEditMode(comment.comment_id);
    setEditedComment(comment.content);
    setDropdownOpen(null);
  };

  const handleEditChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleEditSubmit = async (commentId) => {
    const updateComment = {
			content: editedComment
    };

    const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(
      `/project/${issue.project_id}/issue/${issue.id}/comment/${commentId}` + urlParams,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateComment),
      }
    );
    getComments();
    setEditMode(null);
  };

  const handleDelete = async (commentId) => {
		const urlParams = `?id=${id}&pw=${pw}`;
    const response = await fetch(`/project/${issue.project_id}/issue/${issue.id}/comment/${commentId}` + urlParams, {method: 'DELETE',});

    if (response.ok) {
			getComments();
    }
    setDropdownOpen(null);
  };

	return (
		<div>
			 {comments.map((comment) => (
				<div key={comment.comment_id} className="border p-2 mb-1 rounded relative">
					{editMode === comment.comment_id ? (
					<div>
						<textarea
						className="w-full border rounded p-2"
						value={editedComment}
						onChange={handleEditChange}
						/>
						<div className="flex justify-end mt-2">
						<button
							className="text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							onClick={() => handleEditSubmit(comment.comment_id)}
						>
							Save
						</button>
						</div>
					</div>
					) : (
					<div>
						<div className="mb-1 ml-1 flex justify-between items-center">
						<div>
							<span className="font-bold">{comment.author_id}</span>
							<span className="ml-1 text-xs text-gray-500">commented at {formatDate(comment.created_date)}</span>
						</div>
						<div className="relative">
							<button
							className="text-gray-500 hover:text-gray-700"
							onClick={() => handleDropdownToggle(comment.comment_id)}
							>
								<RiMoreLine/>
							</button>
							{dropdownOpen === comment.comment_id && (
							<div className="absolute right-0 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
								<button
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								onClick={() => handleEdit(comment)}
								>
								Edit
								</button>
								<button
								className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
								onClick={() => handleDelete(comment.comment_id)}
								>
								Delete
								</button>
							</div>
							)}
						</div>
						</div>
						<p className="ml-2">{comment.content}</p>
					</div>
					)}
				</div>
			))}
			<div className="mt-4">
				<h4 className="text-lg font-semibold mb-2">Add a comment</h4>
				<textarea
					className="w-full p-2 border rounded mr-2"
					rows="3"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				/>
				<div className="flex flex-row justify-end w-100%">
					{ getStatus(issue.state) === "Close issue" ?
					<button
						className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-red-500 text-white border-gray-600 hover:bg-red-400 hover:border-gray-600 focus:ring-gray-700"
						onClick={() => {}} //수정 필요
					>
						Dispose issue
					</button> : <></>}
					{ getStatus(issue.state) === "Close issue" ?
					<button
						className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-500 text-white border-gray-600 hover:bg-green-400 hover:border-gray-600 focus:ring-gray-700"
						onClick={() => {}} //수정 필요
					>
						Issue Fixed
					</button> : <></>}
					<button
						className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-600 text-white border-gray-600 hover:bg-gray-500 hover:border-gray-600 focus:ring-gray-700"
						onClick={() => {}} //수정 필요
					>
						{ getStatus(issue.state) }
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
	);
}

export default Comment;