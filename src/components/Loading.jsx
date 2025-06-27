// material-ui
import { LoadingOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';

// ==============================|| Loader ||============================== //

export default function Loading() {
  return (
     <Box
        sx={{
        width: '100%',
        minHeight: '60px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}
    >
    <LoadingOutlined style={{ fontSize: '3rem', color: '#faad14e6' }} />
  </Box>
  );
}
