import React from 'react';
import { Link } from 'react-router-dom';
import {useMutation } from '@apollo/client';
import { DELETE_POST } from '../../utils/mutations';




const PostList = ({ posts, title }) => {
  const [deletePost] = useMutation(DELETE_POST);

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  };

  const handleClick = async () => {
    try {
      await deletePost({
        variables: { postId: posts.this._id },
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{' '}
              posts on {post.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p>
                <p className="mb-0">
                  Comments: {post.commentCount} || {' '}
                  {post.commentCount ? 'see' : 'start'} a comment!
                </p>
              </Link>
              <button type='submit' onClick={handleClick}>
                <img src='trash.svg' alt='delete'/>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
