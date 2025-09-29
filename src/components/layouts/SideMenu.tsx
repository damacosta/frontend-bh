import type { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuContent from "@/components/ui/MenuContent";
import logo from "@/assets/logo.svg";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

type SideMenuProps = {
  children?: ReactNode;
};

export default function SideMenu({ children }: SideMenuProps) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer lateral */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: "calc(var(--template-frame-height, 0px) + 4px)",
            p: 1.5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "240px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "5rem", height: "5rem" }}
            />
          </Box>
        </Box>
        <Divider />

        {/* Menu lateral fixo */}
        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuContent />
        </Box>

        {/* Avatar + opções (se quiser ativar depois) */}
        {/*
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              Riley Carter
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              riley@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
        */}
      </Drawer>

      {/* Área de conteúdo da página */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
