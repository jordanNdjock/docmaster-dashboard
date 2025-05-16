import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { logoutUser } from 'redux/actions/userActions';
import { selectUserInfo } from 'redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from 'components/CustomSnackbar';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserInfo);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleListItemClick = () => {
    navigate('/profil');
  };
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(user.access_token));
      navigate('/login');
    } catch (error) {
      const message = error.message || error.response?.data?.message || 'Failed to logout user';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };
  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton onClick={handleListItemClick}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="Voir le profil" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Deconnexion" />
        </ListItemButton>
      </List>
      <CustomSnackbar open={snackbar.open} onClose={handleCloseSnackbar} message={snackbar.message} severity={snackbar.severity} />
    </>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
