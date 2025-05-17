import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import MainCard from 'components/MainCard';
import { Button, Table, TableBody, TableContainer, TableHead, Paper, TableRow, Box, Typography, IconButton, TableCell, Pagination, FormControl, Select, MenuItem, Menu } from '@mui/material';
import { useUserStore } from "../../store/userSlice";
import { useAbonnementStore } from "../../store/abonnementSlice";
import { useSnackbar } from '../../components/SnackbarContext';
import { formatDateTimeFr } from '../../utils/formatDate';
import DeleteModal from '../../components/modals/DeleteModal';
import AbonnementModal from '../../components/modals/abonnements/AbonnementModal';


export default function AbonnementsIndex() {
    const token = useUserStore(state => state.token);
    const abonnements = useAbonnementStore(state => state.abonnements);
    const { fetchAbonnements, removeAbonnement, createAbonnement, modifyAbonnement } = useAbonnementStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAbonnementId, setSelectedAbonnementId] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const openSnackbar = useSnackbar();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
      titre: '',
      montant: '',
      nombre_docs_par_type: ''
    });

    const handleChangePage = (e, value) => {
      setPage(value);
    };
    const handleChangePerPage = e => {
      setPerPage(parseInt(e.target.value, 10));
      setPage(1);
    };
    const handleMenuOpen = (event, id) => {
      setAnchorEl(event.currentTarget);
      setSelectedAbonnementId(id);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleDelete = () => {
      setDeleteModalOpen(true);
      handleMenuClose();
    };
    const openAdd = () => {
      setSelectedAbonnementId(null);
      setForm({ titre: '', montant: '', nombre_docs_par_type: '' });
      setModalOpen(true);
    };

    const openEdit = () => {
      const item = abonnements.find(a => a.id === selectedAbonnementId);
      setForm({
        titre: item.titre,
        montant: item.montant,
        nombre_docs_par_type: item.nombre_docs_par_type
      });
      setModalOpen(true);
      handleMenuClose();
    };

    const handleSave = async () => {
      try {
        if (selectedAbonnementId)
          await modifyAbonnement(selectedAbonnementId, form, token);
        else
          await createAbonnement(form, token);
        openSnackbar(
          selectedAbonnementId ? 'Abonnement modifié avec succès' : 'Abonnement créé avec succès',
          'success'
        );
        setModalOpen(false);
      } catch (err) {
        openSnackbar(err.message || 'Erreur', 'error');
      }
    };

    const handleDeleteAbonnement = async () => {
      try {
        await removeAbonnement(selectedAbonnementId, token);
        openSnackbar('Véhicule supprimé avec succès !','success');
        setDeleteModalOpen(false);
      } catch (error) {
        const message = error.message || error.response?.data?.message || 'La supression de l\'abonnement a échoué';
        openSnackbar(message,'error');
      }
    };

    useEffect(() => {
      const load = async () => {
        try {
          const meta = await fetchAbonnements(token, page, perPage);
          setTotalPages(meta?.last_page ?? 0);
        } catch (err) {
          openSnackbar(err.message, 'error');
        }
      };
      load();
    }, [fetchAbonnements, token, page, perPage, openSnackbar]);


    return (
    <>
      <MainCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Liste des abonnements</Typography>
          <Button variant="contained" size="medium" startIcon={<PlusOutlined />} onClick={openAdd}>
            Ajouter
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="abonnements table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Nombre de documents par type</TableCell>
                <TableCell>Date d'enregistrement</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {abonnements.map((abonnement) => (
                <TableRow key={abonnement.id}>
                  <TableCell>{abonnement.id}</TableCell>
                  <TableCell>{abonnement.titre}</TableCell>
                  <TableCell>{abonnement.montant}</TableCell>
                  <TableCell>{abonnement.nombre_docs_par_type}</TableCell>
                  <TableCell>{formatDateTimeFr(abonnement.created_at)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(event) => handleMenuOpen(event, abonnement.id)}>
                      <EllipsisOutlined style={{ fontSize: '20px' }} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={openEdit}>
                        <EditOutlined style={{ marginRight: 8, color: 'blue' }} /> Editer
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <DeleteOutlined style={{ marginRight: 8, color: 'red' }} /> Supprimer
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
            <Select
              labelId="per-page-label"
              value={perPage}
              label="Par page"
              onChange={handleChangePerPage}
            >
              {[5, 10, 20, 50].map(n => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
      </Box>
      </MainCard>
      <DeleteModal open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleDeleteAbonnement} />
      <AbonnementModal open={isModalOpen} onClose={() => setModalOpen(false)} form={form} onChange={setForm} onSave={handleSave} isEdit={Boolean(selectedAbonnementId)}/>
    </>
    );
}