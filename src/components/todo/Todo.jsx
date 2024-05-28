/* eslint-disable react/prop-types */
import { useState } from 'react';
import cross from '../../assets/cross.png';
import editIcon from '../../assets/editIcon.png';
import saveIcon from '../../assets/saveIcon.png';
import { useDispatch } from 'react-redux';
import { deleteTodos, editTodos, addTodos } from '../../redux/slices/todo.js';

function Todo({ todo, addTodo }) {
  const [title, setTitle] = useState(addTodo ? '' : todo?.title);
  const [description, setDescription] = useState(addTodo ? '' : todo?.description);
  const [isCompleted, setIsCompleted] = useState(addTodo ? false : todo?.isCompleted);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodos(id));
  };

  const handleTitleDescriptionChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsCompleted(checked);
    dispatch(editTodos({ id: todo._id, updatedTodo: { ...todo, isCompleted: checked } }));
  };

  const handleEditSave = () => {
    if (title === '' || description === '') return;

    const updatedTodo = {
      _id: todo._id,
      title,
      description,
      isCompleted,
    };
    dispatch(editTodos({ id: todo._id, updatedTodo }));
    setIsEditing(false);
  };

  const handleNewSave = () => {
    if (title === '' || description === '') return;

    const newTodo = {
      title,
      description,
      isCompleted,
    };

    dispatch(addTodos({ newTodo }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className='rounded-md bg-orange-400 flex flex-col items-center p-10 relative flex-wrap h-[13rem] min-w-[14rem] overflow-auto'>
      {isEditing || addTodo ? (
        <img
          src={saveIcon}
          alt='save'
          className='h-5 w-5 absolute top-2 right-10 hover:cursor-pointer'
          onClick={isEditing ? handleEditSave : handleNewSave}
        />
      ) : (
        <div>
          <input
            type='checkbox'
            name='isCompleted'
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className=' absolute h-5 w-5 top-3 right-13 cursor-pointer'
          />
          <img
            src={editIcon}
            alt='edit'
            className='h-5 w-5 absolute top-3 right-9 hover:cursor-pointer'
            onClick={handleEditClick}
          />
        </div>
      )}

      {!addTodo && (
        <img
          src={cross}
          alt='cross'
          className='h-6 w-9 absolute top-2 right-0 hover:cursor-pointer'
          onClick={() => handleDelete(todo._id)}
        />
      )}

      {isEditing || addTodo ? (
        <input
          name='title'
          value={title}
          placeholder='title'
          onChange={handleTitleDescriptionChange}
          className='bg-orange-400 outline-none text-xl font-bold uppercase mb-4'
        />
      ) : (
        <p className={`text-xl font-bold uppercase mb-4 ${isCompleted ? 'line-through' : ''}`}>{todo?.title}</p>
      )}
      {isEditing || addTodo ? (
        <input
          name='description'
          value={description}
          placeholder='description'
          onChange={handleTitleDescriptionChange}
          className='bg-orange-400 outline-none text-lg uppercase '
        />
      ) : (
        <p className={`text-lg uppercase ${isCompleted ? 'line-through' : ''}`}>{todo?.description}</p>
      )}
    </div>
  );
}

export default Todo;
