import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button
} from '@mui/material';
import * as yup from 'yup';

const schema = yup.object({
  titre: yup.string().required('Le titre est requis'),
  montant: yup
    .number()
    .typeError('Le montant doit être un nombre')
    .positive('Le montant doit être positif')
    .required('Le montant est requis'),
  nombre_docs_par_type: yup
    .number()
    .typeError('Le nombre de docs doit être un nombre')
    .integer('Le nombre de docs doit être un entier')
    .positive('Le nombre de docs doit être positif')
    .required('Le nombre de docs est requis')
});

export default function AbonnementModal({
  open,
  onClose,
  form,
  onChange,
  onSave,
  isEdit
}) {
  const [errors, setErrors] = useState({});

  // appelé quand on clique sur "Ajouter"/"Enregistrer"
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
        {isEdit ? 'Modifier un abonnement' : 'Ajouter un abonnement'}
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
            label="Montant"
            type="number"
            value={form.montant}
            onChange={e => onChange({ ...form, montant: e.target.value })}
            error={Boolean(errors.montant)}
            helperText={errors.montant}
            fullWidth
          />
          <TextField
            label="Nombre de docs par type"
            type="number"
            value={form.nombre_docs_par_type}
            onChange={e =>
              onChange({ ...form, nombre_docs_par_type: e.target.value })
            }
            error={Boolean(errors.nombre_docs_par_type)}
            helperText={errors.nombre_docs_par_type}
            fullWidth
          />
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

AbonnementModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  form: PropTypes.shape({
    titre: PropTypes.string,
    montant: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombre_docs_par_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};
