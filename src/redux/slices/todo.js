import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
};

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/todos');

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Could not fetch todos',
    };
  }
});

export const addTodos = createAsyncThunk('addTodo', async ({ newTodo }) => {
  try {
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error('Failed to add todo');
    }

    const data = await response.json();
    return data.addedTodo;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Could not add todos',
    };
  }
});

export const deleteTodos = createAsyncThunk('deleteTodo', async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Todo could not be deleted');
    }

    return { id };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Could not delete todos',
    };
  }
});

export const editTodos = createAsyncThunk('editTodo', async ({ id, updatedTodo }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error('Todo could not be edited');
    }

    const data = await response.json();
    return data.editedTodo;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Could not edit todos',
    };
  }
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  extraReducers: (builder) => {
    //fetch todo
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    //add todo
    builder
      .addCase(addTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    //delete todo
    builder
      .addCase(deleteTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload.id);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    //edit todo
    builder
      .addCase(editTodos.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos?.findIndex((todo) => todo?._id === updatedTodo?._id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
        state.isLoading = false;
      })
      .addCase(editTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default todoSlice.reducer;
