import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTempo } from "@/TempoContext";

export default function ConfiguracaoTempo() {
  const { timeRange, setTimeRange } = useTempo();
  const [open, setOpen] = useState(false);
  const [localTimeRange, setLocalTimeRange] = useState(timeRange);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setTimeRange(localTimeRange);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Selecionar intervalo de tempo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Intervalo</InputLabel>
            <Select
              value={localTimeRange}
              label="Intervalo"
              onChange={(e) => setLocalTimeRange(e.target.value)}
            >
              <MenuItem value="-60s">60 segundos</MenuItem>
              <MenuItem value="-30m">30 minutos</MenuItem>
              <MenuItem value="-1h">1 hora</MenuItem>
              <MenuItem value="-1d">1 dia</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <List dense>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={handleOpen}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuração de Tempo" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
