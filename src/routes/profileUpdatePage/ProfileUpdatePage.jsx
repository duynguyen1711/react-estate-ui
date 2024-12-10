import { useContext, useState } from 'react';
import './profileUpdatePage.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWiget/UploadWiget';

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [publicId, setPublicId] = useState('');
  const uwConfig = {
    cloudName: 'duy1711',
    uploadPreset: 'estate',
    multiple: false,
    maxImageFileSize: 2000000,
    folder: 'avatars',
  };
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password, email } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        password,
        email,
        avatar: avatar,
      });
      updateUser(res.data);
      navigate('/profile');
    } catch (e) {
      setError(e.response.data?.message);
    }
  };
  return (
    <div className='profileUpdatePage'>
      <div className='formContainer'>
        <form onSubmit={handleUpdate}>
          <h1>Update Profile</h1>
          <div className='item'>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              name='username'
              type='text'
              defaultValue={currentUser.username}
            />
          </div>
          <div className='item'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              defaultValue={currentUser.email}
            />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' />
          </div>
          <button>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className='sideContainer'>
        <img src={avatar || '/noavatar.png'} alt='' className='avatar' />
        <UploadWidget
          uwConfig={uwConfig}
          setPublicId={setPublicId}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
