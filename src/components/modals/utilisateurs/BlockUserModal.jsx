import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material';

export default function BlockUserModal({
  open,
  onClose,
  onConfirm,
  isBlock
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {isBlock ? 'Bloquer l\'utilisateur' : 'Restaurer l\'utilisateur'}
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          Êtes-vous sûr(e) de vouloir {isBlock ? 'bloquer' : 'restaurer'} cet utilisateur ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" color={isBlock ? 'error' : 'primary'} onClick={onConfirm}>
          {isBlock ? 'Bloquer' : 'Restaurer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BlockUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isBlock: PropTypes.bool.isRequired
};
