import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../todo/Todo';
import { fetchTodos } from '../../redux/slices/todo';
import addIcon from '../../assets/addIcon.png';
import mainCloseIcon from '../../assets/mainCloseIcon.png';
import logo from '../../assets/logo.png';

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const isLoading = useSelector((state) => state.isLoading);
  const [addTodo, setAddTodo] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='min-h-screen flex justify-center items-center flex-col relative p-4'>
          <img className='h-[10rem] w-[10rem] absolute top-2 left-2 object-cover' src={logo} alt='logo' />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
            {addTodo && <Todo addTodo />}
            {todos?.length > 0 ? (
              todos?.map((todo) => (
                <div key={todo?._id}>
                  <Todo todo={todo} />
                </div>
              ))
            ) : (
              <h1 className='text-4xl '>{!addTodo && 'Please add a todo🙂'}</h1>
            )}
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
}

export default TodoList;
