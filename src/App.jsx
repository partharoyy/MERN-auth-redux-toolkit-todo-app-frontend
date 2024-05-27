import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos } from './redux/slices/todo.js';
import Todo from './components/todo/Todo';
import addIcon from './assets/addIcon.png';
import mainCloseIcon from './assets/mainCloseIcon.png';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const isLoading = useSelector((state) => state.isLoading);
  const [addTodo, setAddTodo] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='min-h-screen flex justify-center items-center flex-col relative'>
          <h1 className='mb-6 text-5xl font-bold absolute top-0 left-0 p-8'>Todo..</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            {addTodo && <Todo addTodo />}
            {todos &&
              todos.length > 0 &&
              todos?.map((todo) => (
                <div key={todo?._id}>
                  <Todo todo={todo} />
                </div>
              ))}
          </div>
          {addTodo && (
            <img
              src={mainCloseIcon}
              alt='discard todo'
              onClick={() => setAddTodo(false)}
              className=' absolute h-[3.1rem] w-[3.1rem] bottom-[7%] right-[11%] cursor-pointer'
            />
          )}
          <img
            src={addIcon}
            alt='add todo'
            onClick={() => setAddTodo(true)}
            className=' absolute h-[4rem] w-[4rem] bottom-[6%] right-[5%] cursor-pointer'
          />
        </div>
      )}
    </div>
  );
};

export default App;
