import { useContext, useEffect, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  useEffect(() => {
    if (currentUser) {
      fetch(); // Chỉ gọi fetch khi currentUser có giá trị
    }
  }, [currentUser, fetch]);

  return (
    <nav>
      <div className='left'>
        <a href='/' className='logo'>
          <img src='/logo.png'></img>
          <span>DuyEstate</span>
        </a>
        <a href='/'>Home</a>
        <a href='/list'>About</a>
        <a href=''>Contact</a>
        <a href=''>Angents</a>
      </div>
      <div className='right'>
        {currentUser ? (
          <div className='user'>
            <img src={currentUser.avatar || '/noavatar.png'} alt='' />
            <span>{currentUser.username}</span>
            <Link to='/profile' className='profile'>
              {number > 0 && <div className='notification'>{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href='/login'>Sign in</a>
            <a href='/register' className='register'>
              Sign Up
            </a>
          </>
        )}

        <div className='menuIcon'>
          <img src='/menu.png' onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? 'menu active' : 'menu'}>
          <a href='/'>Home</a>
          <a href='/list'>About</a>
          <a href=''>Contact</a>
          <a href=''>Angents</a>
          <a href='/login'>Sign in</a>
          <a href='/register'>Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
