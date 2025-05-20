import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';
import { formatDateTimeFr } from '../../../utils/formatDate';

export default function DocmasterModal({ open, onClose, data }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Détails Déclaration</DialogTitle>
      <DialogContent dividers>
        {data && (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography><strong>Nom trouveur :</strong> {data.nom_trouveur}</Typography>
            <Typography><strong>Téléphone :</strong> {data.tel_trouveur}</Typography>
            <Typography><strong>Type :</strong> {data.type_docmaster}</Typography>
            <Typography><strong>État :</strong> {data.etat_docmaster}</Typography>
            <Typography><strong>Date :</strong> {formatDateTimeFr(data.date_action)}</Typography>
            <Typography><strong>Infos :</strong> {data.infos_docs}</Typography>
            <Typography><strong>Crédit :</strong> {data.credit}</Typography>
            <Typography><strong>Débit :</strong> {data.debit}</Typography>
            <Typography><strong>Code confirmation :</strong> {data.code_confirm}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}

DocmasterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object
};
