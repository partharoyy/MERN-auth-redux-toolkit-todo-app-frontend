import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/todo-list/TodoList.jsx';
import Signup from './components/sign-up/Signup.jsx';
import Signin from './components/sign-in/Signin.jsx';
import ProtectedRoute from './components/protected-route/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute element={<TodoList />} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route
          path='*'
          element={
            <div className='flex justify-center items-center min-h-screen text-4xl font-bold'>404 Not Found</div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
