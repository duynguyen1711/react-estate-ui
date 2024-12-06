import { useContext, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setIsButtonDisabled(true);

    // Set thời gian chờ 1 giây
    const timer = setTimeout(() => setIsButtonDisabled(false), 1000);
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      const res = await apiRequest.post('/Auth/login', {
        username,
        password,
      });
      updateUser(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='login'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name='username'
            type='text'
            required
            tabIndex={1}
            placeholder='Username'
          />
          <input
            name='password'
            type='password'
            required
            tabIndex={2}
            placeholder='Password'
          />
          <button disabled={isButtonDisabled || isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {error && <span>{error}</span>}
          <Link to='/register'>{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  );
}

export default Login;
