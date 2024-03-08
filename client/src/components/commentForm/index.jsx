import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROJECT_IDEA_COMMENT } from '../../utils/mutations'; 

import Auth from '../../utils/auth';

const CommentForm = ({ projectId }) => { 
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_PROJECT_IDEA_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    if (!Auth.loggedIn()) {
      console.error('You need to be logged in to comment');
      return;
    }

    try {
      await addComment({
        variables: {
          projectId, 
          commentText,
          commentAuthor: Auth.getProfile().data.username 
        },
      });

      setCommentText('');
      setCharacterCount(0); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target; 

    if (value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Have any ideas or feedback for this project?</h4>

      {Auth.loggedIn() ? (
        <>
          <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
            Character Count: {characterCount}/280
            {error && <span className="error-message">{error.message}</span>}
          </p>
          <form onSubmit={handleFormSubmit} className="flex-row justify-center align-stretch">
            <textarea
              placeholder="Add your idea or feedback..."
              value={commentText}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
              Post Comment
            </button>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to post ideas or feedback. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </div>
  );
};

export default CommentForm;
