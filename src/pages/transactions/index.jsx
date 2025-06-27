import { CheckCircleOutlined, DeleteOutlined, EllipsisOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Box, Chip, FormControl, IconButton, InputAdornment, Menu, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import MainCard from 'components/MainCard';
import { useTransactionStore } from "../../store/transactionSlice";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../components/SnackbarContext";
import React from "react";
import Loading from "../../components/Loading";
import { formatDateTimeFr } from "../../utils/formatDate";

export default function TransactionsIndex() {
  const transactions = useTransactionStore(s => s.transactions);
    const [search, setSearch] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const {
      fetchAllTransactions,
    } = useTransactionStore();
  const openSnackbar = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangePage = (_, v) => setPage(v);
  const handleChangePerPage = e => { setPerPage(+e.target.value); setPage(1); };
   const handleMenuOpen = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedId(id);
  };
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
      const load = async () => {
        try {
          const meta = await fetchAllTransactions(page, perPage);
          setTotalPages(meta?.last_page ?? 0);
        } catch (error) {
          openSnackbar(error.message, 'error')
        }
      };
      load();
    }, [fetchAllTransactions, page, perPage, openSnackbar]);

  useEffect(() => {
      setFilteredTransactions(transactions);
  }, [transactions]);

  return (
  <>
      <MainCard>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Transactions</Typography>
                 <TextField
                    sx={{width: '40%'}}
                    variant="outlined"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase();
                      setSearch(value);
                      const filtered = transactions.filter(u =>
                        `${u.transactionable_type} ${u.montant} ${u.statut} ${u.created_at}`.toLowerCase().includes(value)
                      );
                      setFilteredTransactions(filtered);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type de transaction</TableCell>
                      <TableCell>Statut</TableCell>
                      <TableCell>Montant</TableCell>
                      <TableCell>identifiant de transaction</TableCell>
                      <TableCell>nom utilisateur</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions?.length > 0 ? filteredTransactions.map(u => (
                      <TableRow key={u.id}>
                        <TableCell>{u.transactionable_type.substr(11,15)}</TableCell>
                        <TableCell>
                          {u.statut === "PENDING" ?
                          (
                            <Chip label="En attente" color="warning" size="small" icon={<ReloadOutlined style={{ marginLeft:8}} />}/>
                          ) : (
                            <Chip label="Succès" color="success" size="small" icon={<CheckCircleOutlined style={{ marginLeft:8}} />} />
                          )
                          }
                        </TableCell>
                        <TableCell>{u.montant}</TableCell>
                        <TableCell>{u.identifiant}</TableCell>
                        <TableCell>{u.user.nom_utilisateur}</TableCell>
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
                            <MenuItem>
                              <DeleteOutlined style={{ marginRight:8, color: 'red' }} /> Supprimer
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    )): (
                          <TableCell colSpan={11}>
                              <Loading />
                          </TableCell>
                        )
                  }
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
  </>
);
}