import PropTypes from 'prop-types';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/userSlice';
import { useSnackbar } from '../../../../../components/SnackbarContext';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  const navigate = useNavigate();
  const {logout} = useUserStore();
  const openSnackbar = useSnackbar(); 

  const handleListItemClick = () => {
    navigate('/profil');
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      const message = error.message || error.response?.data?.message || 'Failed to logout user';
      openSnackbar(message,'error');
    }
  };
  return (
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
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
