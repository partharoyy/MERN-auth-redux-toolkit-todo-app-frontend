import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/slices/auth';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function onChangeHandler(e) {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSignin = () => {
    const userData = {
      email,
      password,
    };

    dispatch(signin({ userData }));
    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex justify-center items-center min-h-screen flex-col gap-2 '>
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
      <button className='border-solid bg-black text-white px-6 py-2 rounded-md text-lg mt-6' onClick={handleSignin}>
        Signin
      </button>
    </div>
  );
}

export default Signin;
