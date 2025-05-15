import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  users: [],
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    changePassword: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, clearUser, setUsers, deleteUser, updateUser } = userSlice.actions;

export const selectUserInfo = (state) => state.user.user;
export const selectUsersInfo = (state) => state.user.users;
export const selectUserById = (state, id) => {
  return state.user.users.find((user) => user.id === id);
};
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
