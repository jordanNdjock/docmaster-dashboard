import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined, FileProtectOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import MainCard from 'components/MainCard';
import { Button, Table, TableBody, TableContainer, TableHead, Paper, TableRow, Box, Typography, IconButton, TableCell } from '@mui/material';
import { useUserStore } from "../../store/userSlice";
import { useAbonnementStore } from "../../store/abonnementSlice";


export default function AbonnementsIndex() {
    const navigate = useNavigate();
    const token = useUserStore(state => state.token);
    const abonnements = useAbonnementStore(state => state.abonnements);
    const { fetchAbonnements } = useAbonnementStore();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAbonnementId, setSelectedAbonnementId] = useState(null);

    useEffect(() => {
        fetchAbonnements(token);
    },[fetchAbonnements, token]);


    return (
    <>
      <MainCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Liste des abonnements</Typography>
          <Button variant="contained" size="medium" startIcon={<PlusOutlined />} onClick={() => setAddModalOpen(true)}>
            Ajouter un abonnement
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
                  <TableCell>{abonnement.created_at}</TableCell>
                  <TableCell align="center">
                    {/* <IconButton onClick={(event) => handleMenuOpen(event, car.id)}>
                      <EllipsisOutlined style={{ fontSize: '20px' }} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={handleView}>
                        <EyeOutlined style={{ marginRight: 8, color: 'yellow' }} /> Voir
                      </MenuItem>
                      <MenuItem onClick={handleUpdate}>
                        <EditOutlined style={{ marginRight: 8, color: 'blue' }} /> Editer
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <DeleteOutlined style={{ marginRight: 8, color: 'red' }} /> Supprimer
                      </MenuItem>
                    </Menu> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </>
    );
}