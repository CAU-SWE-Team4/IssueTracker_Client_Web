import React, { useState, useEffect, useRef } from 'react';
import { RiMoreLine } from "react-icons/ri";

const CommentList = ({ comments }) => {
  const [commentDropdownOpen, setCommentDropdownOpen] = useState(false);

	const handleCommentDropdownToggle = (commentId) => {
    setCommentDropdownOpen(commentDropdownOpen === commentId ? null : commentId);
    console.log(commentDropdownOpen);
  };

  const handleEdit = (commentId) => {
    // 구현 필요
    setCommentDropdownOpen(null);
  };

  const handleDelete = (commentId) => {
    // 구현 필요
    setCommentDropdownOpen(null);
  };

	return (
		<div className="mb-4">
			<div className="space-y-4">
				{comments.map((comment) => (
					<div key={comment.id} className="border p-2 rounded relative">
						<div className="mb-1 ml-1 flex justify-between items-center">
							<div>
								<span className="font-bold">{comment.author}</span>
								<span className="ml-1 text-sm text-gray-500">commented at {comment.date}</span>
							</div>
							<div className="relative">
								<button
									className="text-gray-500 hover:text-gray-700"
									onClick={() => handleCommentDropdownToggle(comment.id)}
								>
									<RiMoreLine/>
								</button>
								{commentDropdownOpen === comment.id && (
									<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-20">
										<button
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											onClick={() => handleEdit(comment.id)}
										>
											Edit
										</button>
										<button
											className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
											onClick={() => handleDelete(comment.id)}
										>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
						<p className="ml-2">{comment.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default CommentList;