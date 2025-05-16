import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

export default function DeleteAbonnementModal({ open, onClose, onDelete}) {
  return (
    <Dialog open={open} onClose={null} disableEscapeKeyDown={true}>
      <DialogTitle>Suppression de l'élément</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Etes-vous sûr de vouloir supprimer cet élément ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="secondary">
          Fermer
        </Button>
        <Button variant="contained" onClick={onDelete} color="error">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteAbonnementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
