// src/components/modals/DocumentTypeModal.jsx
import React, { useState } from 'react';
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
import * as yup from 'yup';

// 1) on définit un schéma Yup minimal
const schema = yup.object({
  titre: yup.string().required('Le titre est requis'),
  libelle: yup.string().nullable(),
  frais: yup
    .number()
    .typeError('Le frais doit être un nombre')
    .min(0, 'Le frais doit être ≥ 0')
    .required('Le frais est requis'),
  recompense: yup
    .number()
    .typeError('La récompense doit être un nombre')
    .min(0, 'La récompense doit être ≥ 0')
    .required('La récompense est requise'),
  validite: yup.boolean().required()
});

export default function DocumentTypeModal({
  open,
  onClose,
  form,
  onChange,
  onSave,
  isEdit
}) {
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
      onSave();
    } catch (err) {
      const errs = {};
      err.inner.forEach(e => {
        errs[e.path] = e.message;
      });
      setErrors(errs);
    }
  };

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
            error={Boolean(errors.titre)}
            helperText={errors.titre}
            fullWidth
          />
          <TextField
            label="Libellé"
            value={form.libelle}
            onChange={e => onChange({ ...form, libelle: e.target.value })}
            error={Boolean(errors.libelle)}
            helperText={errors.libelle}
            fullWidth
          />
          <TextField
            label="Frais"
            type="number"
            value={form.frais}
            onChange={e => onChange({ ...form, frais: e.target.value })}
            error={Boolean(errors.frais)}
            helperText={errors.frais}
            fullWidth
          />
          <TextField
            label="Récompense"
            type="number"
            value={form.recompense}
            onChange={e => onChange({ ...form, recompense: e.target.value })}
            error={Boolean(errors.recompense)}
            helperText={errors.recompense}
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
          {errors.validite && (
            <Box color="error.main" fontSize="0.75rem" mt={-1}>
              {errors.validite}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSave}>
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
