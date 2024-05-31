import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, signupFailure, signupStart, signupSuccess } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupStatus = useSelector((state) => state.auth.signupStatus);
  const signupError = useSelector((state) => state.auth.signupError);

  function onChangeHandler(e) {
    const { name, value } = e.target;

    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSignup = () => {
    dispatch(signupStart());

    try {
      const userData = {
        userName,
        email,
        password,
      };

      dispatch(signup({ userData }));
      dispatch(signupSuccess());
      dispatch(login());
      navigate('/');
      setEmail('');
      setPassword('');
      setUserName('');
    } catch (error) {
      dispatch(signupFailure(error.message || 'Signup failed'));
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen flex-col gap-2 '>
      <input
        name='userName'
        type='text'
        value={userName}
        onChange={onChangeHandler}
        placeholder='username'
        className='border rounded-md border-gray-500 focus:outline-black focus:shadow p-2 mb-4'
      />
      <input
        name='email'
        type='email'
        value={email}
        onChange={onChangeHandler}
        placeholder='email'
        className='border rounded-md border-gray-900 focus:outline-black focus:shadow p-2 mb-4'
      />
      <input
        name='password'
        type='password'
        value={password}
        onChange={onChangeHandler}
        placeholder='password'
        className='border rounded-md border-gray-500 focus:outline-black focus:shadow p-2 mb-4'
      />
      <button className='border-solid bg-black text-white px-6 py-2 rounded-md text-lg mt-6' onClick={handleSignup}>
        Signup
      </button>
      {signupStatus === 'loading' && <p>Signing up...</p>}
      {signupStatus === 'failed' && <p>Error: {signupError}</p>}
    </div>
  );
}

export default Signup;
