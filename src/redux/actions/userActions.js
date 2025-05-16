import { setUser, clearUser, setUsers, deleteUser, updateUser } from '../slices/userSlice';
import { login, logout } from '../../api/auth/authServices';
import { fetchAllUsers } from 'api/users/userServices';

export const DeleteUserAction = (id, token) => async (dispatch) => {
  try {
    const result = await removeUser(id, token);
    if (result.success) {
      dispatch(deleteUser(id));
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to delete User');
  }
};

export const fetchUsers = (token) => async (dispatch) => {
  try {
    const users = await fetchAllUsers(token);
    if (users.success) {
      dispatch(setUsers(users.data));
    } else {
      throw new Error(users.message || 'Failed to fetch users');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch users');
  }
};

export const registerUser = (credentials) => async (dispatch) => {
  try {
    const data = await register(credentials);
    dispatch(setUser(data));
  } catch (error) {
    throw new Error(error.message || 'Failed to register');
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const result = await login(credentials);
    dispatch(setUser(result.data));
  } catch (error) {
    throw new Error(error.message || 'Failed to login');
  }
};

export const logoutUser = (token) => async (dispatch) => {
  try {
    const result = await logout(token);
    if (result.success) {
      dispatch(clearUser());
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to logout');
  }
};
