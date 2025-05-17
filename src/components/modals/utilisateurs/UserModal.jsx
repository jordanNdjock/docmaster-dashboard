import React, { useState } from 'react';
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
  nom_famille: yup.string().required('Le nom de famille est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  nom_utilisateur: yup.string().required('Le nom d’utilisateur est requis'),
  email: yup.string().email('Email invalide').required('L’email est requis'),
  tel: yup
    .string()
    .matches(/^[0-9]+$/, 'Le téléphone doit contenir que des chiffres')
    .required('Le téléphone est requis'),
  date_naissance: yup
    .date()
    .max(new Date(), 'Date de naissance invalide')
    .required('La date de naissance est requise'),
  solde: yup
    .number()
    .typeError('Le solde doit être un nombre')
    .min(0, 'Le solde doit être ≥ 0')
    .required('Le solde est requis')
});

export default function UserModal({
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEdit ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Nom de famille"
            value={form.nom_famille}
            onChange={e => onChange({ ...form, nom_famille: e.target.value })}
            error={Boolean(errors.nom_famille)}
            helperText={errors.nom_famille}
            fullWidth
          />
          <TextField
            label="Prénom"
            value={form.prenom}
            onChange={e => onChange({ ...form, prenom: e.target.value })}
            error={Boolean(errors.prenom)}
            helperText={errors.prenom}
            fullWidth
          />
          <TextField
            label="Nom d'utilisateur"
            value={form.nom_utilisateur}
            onChange={e => onChange({ ...form, nom_utilisateur: e.target.value })}
            error={Boolean(errors.nom_utilisateur)}
            helperText={errors.nom_utilisateur}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={e => onChange({ ...form, email: e.target.value })}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            label="Téléphone"
            value={form.tel}
            onChange={e => onChange({ ...form, tel: e.target.value })}
            error={Boolean(errors.tel)}
            helperText={errors.tel}
            fullWidth
          />
          <TextField
            label="Date de naissance"
            type="date"
            value={form.date_naissance}
            onChange={e => onChange({ ...form, date_naissance: e.target.value })}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.date_naissance)}
            helperText={errors.date_naissance}
            fullWidth
          />
          <TextField
            label="Solde"
            type="number"
            value={form.solde}
            onChange={e => onChange({ ...form, solde: e.target.value })}
            error={Boolean(errors.solde)}
            helperText={errors.solde}
            fullWidth
          />
          <TextField
            label="Localisation"
            value={form.localisation}
            onChange={e => onChange({ ...form, localisation: e.target.value })}
            fullWidth
          />
          <TextField
            label="Infos paiement"
            value={form.infos_paiement}
            onChange={e => onChange({ ...form, infos_paiement: e.target.value })}
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

UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  form: PropTypes.shape({
    nom_famille: PropTypes.string,
    prenom: PropTypes.string,
    initial_2_prenom: PropTypes.string,
    nom_utilisateur: PropTypes.string,
    email: PropTypes.string,
    tel: PropTypes.string,
    date_naissance: PropTypes.string,
    localisation: PropTypes.string,
    infos_paiement: PropTypes.string,
    solde: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    code_invitation: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};
