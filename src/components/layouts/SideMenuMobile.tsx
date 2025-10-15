import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuContent from '@/components/ui/MenuContent';
import Box from '@mui/material/Box';
import logo from "/assets/bh.svg";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
          width: {
            xs: '85vw',  // celular
            sm: '70vw',  // tablets
            md: '40vw',  // desktops médios
            lg: '25vw',  // telas grandes
          },
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        {/* Header */}
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1, alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '3.5rem',
                height: '3.5rem',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: 'center',
              flexGrow: 1,
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            {/* <Avatar
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 32, height: 32 }}
            /> */}
            <Typography
              component="p"
              variant="subtitle1"
              noWrap
              sx={{ fontWeight: 500 }}
            >
              Riley Carter
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        {/* Conteúdo */}
        <Stack sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <MenuContent />
        </Stack>

        <Divider />

        {/* Footer */}
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
