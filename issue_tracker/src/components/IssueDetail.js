import React, { useState, useEffect, useRef } from 'react';

const IssueDetail = ({ issue, onClose }) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'John', text: 'This is the first comment.', date: '2023-05-03' },
    { id: 2, author: 'Jane', text: 'This is the second comment.', date: '2023-05-04' },
  ]);
  const [newComment, setNewComment] = useState('');
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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 relative h-[50vh] max-h-[50vh] overflow-y-auto">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
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
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Issue Content</h3>
          <div className="border p-4 rounded bg-gray-100">
            <p>{issue.content}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Comments</h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border p-2 rounded">
                <div className="flex justify-between">
                  <span className="font-bold">{comment.author}</span>
                  <span className="text-gray-500">{comment.date}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
            <div ref={commentsEndRef} />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Add a comment</h4>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
