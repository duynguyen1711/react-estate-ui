import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import './profilePage.scss';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postResponse, postSavedResponse, chatResponse } = useLoaderData();
  const handleLogout = async () => {
    try {
      await apiRequest.post('/Auth/logout');
      updateUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='profilePage'>
      <div className='details'>
        <div className='wrapper'>
          <div className='title'>
            <h1>User Information</h1>
            <Link to='/profile/update'>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className='info'>
            <span>
              Avatar:
              <img src={currentUser.avatar || '/noavatar.png'} alt='' />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Log out</button>
          </div>
          <div className='title'>
            <h1>My List</h1>
            <Link to='/profile/create-post'>
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={postResponse}
              errorElement={<div>Could not load posts 😬</div>}
            >
              {(resolvedData) => {
                console.log(resolvedData);
                const data = Array.isArray(resolvedData.data)
                  ? resolvedData.data.map((item) => ({
                      ...item,
                      latitude: parseFloat(item.latitude) || 0,
                      longitude: parseFloat(item.longitude) || 0,
                    }))
                  : [];
                return data.length > 0 ? (
                  <List data={data} />
                ) : (
                  <p>No data available</p>
                );
              }}
            </Await>
          </Suspense>

          <div className='title'>
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={postSavedResponse}
              errorElement={<div>Could not load posts 😬</div>}
            >
              {(resolvedData) => {
                console.log(resolvedData);
                const data = Array.isArray(resolvedData.data)
                  ? resolvedData.data.map((item) => ({
                      ...item,
                      latitude: parseFloat(item.latitude) || 0,
                      longitude: parseFloat(item.longitude) || 0,
                    }))
                  : [];
                return data.length > 0 ? (
                  <List data={data} />
                ) : (
                  <p>No data available</p>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className='chatContainer'>
        <div className='wrapper'>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={chatResponse}
              errorElement={<div>Could not load chats 😬</div>}
            >
              {(resolvedData) => {
                console.log(resolvedData.data);
                return resolvedData.data.length > 0 ? (
                  <Chat item={resolvedData.data} />
                ) : (
                  <p>No data available</p>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
