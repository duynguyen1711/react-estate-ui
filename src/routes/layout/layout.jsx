import './layout.scss';
import Navbar from '../../components/navbar/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function Layout() {
  return (
    <div className='layout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}
function RequireLayout() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='layout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequireLayout };
