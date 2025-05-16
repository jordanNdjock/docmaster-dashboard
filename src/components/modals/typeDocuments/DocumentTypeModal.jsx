// src/components/modals/DocumentTypeModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material';

export default function DocumentTypeModal({
  open,
  onClose,
  form,
  onChange,
  onSave,
  isEdit
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        {isEdit ? 'Modifier un type de document' : 'Ajouter un type de document'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Titre"
            value={form.titre}
            onChange={e => onChange({ ...form, titre: e.target.value })}
            fullWidth
          />
          <TextField
            label="Libellé"
            value={form.libelle}
            onChange={e => onChange({ ...form, libelle: e.target.value })}
            fullWidth
          />
          <TextField
            label="Frais"
            type="number"
            value={form.frais}
            onChange={e => onChange({ ...form, frais: e.target.value })}
            fullWidth
          />
          <TextField
            label="Récompense"
            type="number"
            value={form.recompense}
            onChange={e => onChange({ ...form, recompense: e.target.value })}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.validite}
                onChange={e => onChange({ ...form, validite: e.target.checked })}
              />
            }
            label="Valide"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={onSave}>
          {isEdit ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DocumentTypeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  form: PropTypes.shape({
    titre: PropTypes.string,
    libelle: PropTypes.string,
    frais: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    recompense: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    validite: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};
