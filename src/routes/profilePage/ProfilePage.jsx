import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import './profilePage.scss';
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const handleLogout = async () => {
    try {
      await apiRequest.post('/Auth/logout');
      updateUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  const getDataPostOfUser = async () => {
    try {
      const res = await apiRequest.get('/posts/post-of-user');
      setPosts(res.data); // Lưu dữ liệu bài viết vào state
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };
  useEffect(() => {
    if (currentUser) {
      getDataPostOfUser(); // Lấy bài viết khi có currentUser
    }
  }, [currentUser]);
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
          <List data={posts} />
          <div className='title'>
            <h1>Saved List</h1>
          </div>
          <List data />
        </div>
      </div>
      <div className='chatContainer'>
        <div className='wrapper'>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
