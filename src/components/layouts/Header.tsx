import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import NavbarBreadcrumbs from '@/components/ui/NavbarBreadcrumbs';
import ColorModeIconDropdown from '@/components/ui/ColorModeIconDropdown';
import Search from '@/components/ui/Search';

dayjs.locale('pt-br');

export default function Header() {
  const today = dayjs().format('dddd, DD [de] MMMM [de] YYYY');

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Stack>
        <NavbarBreadcrumbs />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {today}
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}