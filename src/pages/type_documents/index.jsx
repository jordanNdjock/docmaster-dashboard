import { useEffect, useState } from 'react';
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
  Menu
} from '@mui/material';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined
} from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useUserStore } from '../../store/userSlice';
import { useSnackbar } from '../../components/SnackbarContext';
import { formatDateTimeFr } from '../../utils/formatDate';
import DocumentTypeModal from '../../components/modals/typeDocuments/DocumentTypeModal';
import DeleteModal from '../../components/modals/DeleteModal';
import { useTypeDocumentStore } from '../../store/typeDocumentSlice';

export default function DocumentTypesIndex() {
  const token = useUserStore(s => s.token);
  const types = useTypeDocumentStore(s => s.typeDocuments);
  const {
    fetchTypeDocuments,
    createTypeDocument,
    updateTypeDocument,
    deleteTypeDocument
  } = useTypeDocumentStore();
  const openSnackbar = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    titre: '',
    libelle: '',
    frais: '',
    recompense: '',
    validite: false
  });

  useEffect(() => {
    const load = async () => {
      try {
        const meta = await fetchTypeDocuments(token, page, perPage);
        setTotalPages(meta.last_page);
      } catch (err) {
        openSnackbar(err.message, 'error');
      }
    };
    if (token) load();
  }, [fetchTypeDocuments, token, page, perPage, openSnackbar]);

  const handleChangePage = (_, v) => setPage(v);
  const handleChangePerPage = e => { setPerPage(+e.target.value); setPage(1); };

  const handleMenuOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const openAdd = () => {
    setSelectedId(null);
    setForm({ titre:'', libelle:'', frais:'', recompense:'', validite:false });
    setModalOpen(true);
  };

  const openEdit = () => {
    const item = types.find(t => t.id === selectedId);
    setForm({
      titre: item.titre,
      libelle: item.libelle,
      frais: item.frais,
      recompense: item.recompense,
      validite: item.validite
    });
    setModalOpen(true);
    handleMenuClose();
  };

  const handleSave = async () => {
    try {
      if (selectedId)
        await updateTypeDocument(selectedId, form, token);
      else
        await createTypeDocument(form, token);

      openSnackbar(
        selectedId ? 'Modifié avec succès' : 'Créé avec succès',
        'success'
      );
      setModalOpen(false);
    } catch (err) {
      openSnackbar(err.message || 'Erreur', 'error');
    }
  };

  const openDelete = () => { setDeleteOpen(true); handleMenuClose(); };
  const handleDelete = async () => {
    try {
      await deleteTypeDocument(selectedId, token);
      openSnackbar('Supprimé avec succès', 'success');
    } catch (err) {
      openSnackbar(err.message || 'Erreur', 'error');
    } finally {
      setDeleteOpen(false);
    }
  };

  return (
    <>
      <MainCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Types de documents</Typography>
          <Button
            variant="contained"
            startIcon={<PlusOutlined />}
            onClick={openAdd}
          >
            Ajouter
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Libellé</TableCell>
                <TableCell>Frais</TableCell>
                <TableCell>Récompense</TableCell>
                <TableCell>Validité</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {types.map(t => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.titre}</TableCell>
                  <TableCell>{t.libelle}</TableCell>
                  <TableCell>{t.frais}</TableCell>
                  <TableCell>{t.recompense}</TableCell>
                  <TableCell>{t.validite ? '✔️' : '❌'}</TableCell>
                  <TableCell>{formatDateTimeFr(t.created_at)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={e => handleMenuOpen(e, t.id)}>
                      <EllipsisOutlined />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedId === t.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={openEdit}>
                        <EditOutlined style={{ marginRight: 8, color: 'blue' }} /> Éditer
                      </MenuItem>
                      <MenuItem onClick={openDelete}>
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
            <Select value={perPage} onChange={handleChangePerPage}>
              {[5, 10, 20, 50].map(n => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary" />
        </Box>
      </MainCard>

      <DeleteModal
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />

      <DocumentTypeModal
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
