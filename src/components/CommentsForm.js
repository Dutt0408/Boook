// CommentsForm.js
import React, { useState } from 'react';

function CommentsForm() {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like making an API call
    setSubmitted(true);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      {submitted ? (
        <p>Thank you for your comment!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here..."
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentsForm;
