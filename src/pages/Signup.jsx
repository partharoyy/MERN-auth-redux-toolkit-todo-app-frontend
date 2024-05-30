import { useState } from 'react';
import { signup, signin } from '../api/auth.api';

function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div className='flex justify-center items-center max-w-6'>
      <input name='userName' type='text' value={userName} onChange={onChangeHandler} />
      <input name='email' type='text' value={email} onChange={onChangeHandler} />
      <input name='password' type='text' value={password} onChange={onChangeHandler} />
      <button onClick={signup}></button>
    </div>
  );
}

export default Signup;
