import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";


// Ícones do Material UI
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HistoryIcon from "@mui/icons-material/History";
import ConfiguracaoTempo from "./ConfiguracaoTempo";

const mainListItems = [
  { text: "Página Inicial", icon: <HomeRoundedIcon />, path: "/" },
  { text: "Histórico", icon: <HistoryIcon />, path: "/historico" },
  // { text: "Clientes", icon: <PeopleRoundedIcon />, path: "/clientes" },
  // { text: "Tarefas", icon: <AssignmentRoundedIcon />, path: "/tarefas" },
];


export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {/* Lista principal */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={index === 0} // marca o primeiro item como selecionado
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Lista secundária */}
       <ConfiguracaoTempo />
    </Stack>
  );
}
