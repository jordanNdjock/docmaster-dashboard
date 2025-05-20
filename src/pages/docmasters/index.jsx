import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  IconButton,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useDocmasterStore } from '../../store/docmasterSlice';
import { formatDateTimeFr } from '../../utils/formatDate';
import DocmasterModal from '../../components/modals/docmasters/DocmasterModal';

export default function DocmastersIndex() {
  const docmasters = useDocmasterStore(s => s.docmasters);
  const { fetchDocmasters } = useDocmasterStore();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const meta = await fetchDocmasters(page, perPage);
      setTotalPages(meta?.last_page ?? 0);
    };
    load();
  }, [fetchDocmasters, page, perPage]);

  useEffect(() => {
    setFiltered(docmasters);
  }, [docmasters]);

  const handleSearch = (value) => {
    setSearch(value);
    const v = value.toLowerCase();
    setFiltered(
      docmasters.filter(d =>
        `${d.nom_trouveur} ${d.tel_trouveur} ${d.type_docmaster}`.toLowerCase().includes(v)
      )
    );
  };

  return (
    <>
      <MainCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Déclarations Docmaster</Typography>
          <TextField
            size="small"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            sx={{ width: '40%' }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom trouveur</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>État</TableCell>
                <TableCell>Confirmé</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(d => (
                <TableRow key={d.id}>
                  <TableCell>{d.nom_trouveur}</TableCell>
                  <TableCell>{d.tel_trouveur}</TableCell>
                  <TableCell>{d.type_docmaster}</TableCell>
                  <TableCell>
                    <Chip
                      label={d.etat_docmaster}
                      color={d.etat_docmaster === 'validé' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={d.confirm ? 'Oui' : 'Non'}
                      color={d.confirm ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDateTimeFr(d.date_action)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { setSelected(d); setModalOpen(true); }}>
                      <EyeOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} gap={2}>
          <FormControl size="small">
            <Select value={perPage} onChange={e => { setPerPage(+e.target.value); setPage(1); }}>
              {[5, 10, 20, 50].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Box>
      </MainCard>

      <DocmasterModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={selected}
      />
    </>
  );
}
