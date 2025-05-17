import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Box,
  Typography,
  TableCell,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Menu,
  Chip
} from '@mui/material';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  BlockOutlined,
  RollbackOutlined
} from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useUserStore } from '../../store/userSlice';
import { useSnackbar } from '../../components/SnackbarContext';
import { formatDateTimeFr } from '../../utils/formatDate';
import DeleteModal from '../../components/modals/DeleteModal';
import BlockUserModal from '../../components/modals/utilisateurs/BlockUserModal';
import UserModal from '../../components/modals/utilisateurs/UserModal';

export default function UtilisateursIndex() {
  const token = useUserStore(s => s.token);
  const users = useUserStore(s => s.users);
  const {
    fetchAllUsers,
    createUser,
    modifyUser,
    deleteUser,
    blockUser,
    restoreUser
  } = useUserStore();
  const openSnackbar = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isBlockOpen, setBlockOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    nom_famille: '',
    prenom: '',
    initial_2_prenom: '',
    nom_utilisateur: '',
    email: '',
    tel: '',
    date_naissance: '',
    localisation: '',
    infos_paiement: '',
    solde: '',
    code_invitation: ''
  });

  useEffect(() => {
    const load = async () => {
      const meta = await fetchAllUsers(token, page, perPage);
      setTotalPages(meta?.last_page ?? 0);
    };
    if (token) load();
  }, [fetchAllUsers, token, page, perPage]);

  const handleChangePage = (_, v) => setPage(v);
  const handleChangePerPage = e => { setPerPage(+e.target.value); setPage(1); };

  const handleMenuOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const openAdd = () => {
    setSelectedId(null);
    setForm({
      nom_famille: '',
      prenom: '',
      nom_utilisateur: '',
      email: '',
      tel: '',
      date_naissance: '',
      localisation: '',
      infos_paiement: '',
      solde: '',
    });
    setModalOpen(true);
  };

  const openEdit = () => {
    const u = users.find(u => u.id === selectedId);
    setForm({ ...u });
    setModalOpen(true);
    handleMenuClose();
  };

  const handleSave = async () => {
    try {
      if (selectedId) await modifyUser(selectedId, form, token);
      else await createUser(form, token);
      openSnackbar(selectedId ? 'Utilisateur modifié avec succès' : 'Utilisateur ajouté avec succès','success');
      setModalOpen(false);
    } catch (err) {
      openSnackbar(err.message || 'Erreur','error');
    }
  };

  const openDelete = () => { setDeleteOpen(true); handleMenuClose(); };
  const handleDelete = async () => {
    await deleteUser(selectedId, token);
    openSnackbar('Supprimé','success');
    setDeleteOpen(false);
  };

  const openBlock = () => { setBlockOpen(true); handleMenuClose(); };
  const handleBlock = async () => {
    const u = users.find(u => u.id === selectedId);
    if (u.supprime) await restoreUser(selectedId, token);
    else await blockUser(selectedId, token);
    openSnackbar(u.supprime ? 'Restauré avec succès' : 'Bloqué avec succès','success');
    setBlockOpen(false);
  };

  return (
    <>
      <MainCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Utilisateurs</Typography>
          <Button variant="contained" startIcon={<PlusOutlined />} onClick={openAdd}>
            Ajouter
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Naissance</TableCell>
                <TableCell>Localisation</TableCell>
                <TableCell>Solde</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell>{u.nom_famille}</TableCell>
                  <TableCell>{u.prenom}</TableCell>
                  <TableCell>{u.nom_utilisateur}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.tel}</TableCell>
                  <TableCell>{u.date_naissance}</TableCell>
                  <TableCell>{u.localisation}</TableCell>
                  <TableCell>{u.solde}</TableCell>
                  <TableCell>
                    <Chip
                      label={u.supprime ? 'Bloqué' : 'Actif'}
                      color={u.supprime ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDateTimeFr(u.created_at)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={e => handleMenuOpen(e, u.id)}>
                      <EllipsisOutlined />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedId === u.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={openEdit}>
                        <EditOutlined style={{ marginRight:8, color:'blue' }} /> Éditer
                      </MenuItem>
                      <MenuItem onClick={openDelete}>
                        <DeleteOutlined style={{ marginRight:8, color: 'red' }} /> Supprimer
                      </MenuItem>
                      <MenuItem onClick={openBlock}>
                        {users.find(x=>x.id===selectedId)?.supprime ? (
                          <><RollbackOutlined style={{ marginRight:8, color: 'yellowgreen' }} /> Restaurer</>
                        ) : (
                          <><BlockOutlined style={{ marginRight:8, color: 'orange' }} /> Bloquer</>
                        )}
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} gap={2}>
          <FormControl size="small">
            <Select value={perPage} onChange={handleChangePerPage}>
              {[5,10,20,50].map(n=> <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>
          <Pagination count={totalPages} page={page} onChange={handleChangePage} color='primary' />
        </Box>
      </MainCard>

      <DeleteModal
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />

      <BlockUserModal
        open={isBlockOpen}
        onClose={() => setBlockOpen(false)}
        onConfirm={handleBlock}
        isBlock={!users.find(u=>u.id===selectedId)?.supprime}
      />

      <UserModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        form={form}
        onChange={setForm}
        onSave={handleSave}
        isEdit={Boolean(selectedId)}
      />
    </>
  );
}
