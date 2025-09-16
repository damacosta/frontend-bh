import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Copyright(props: any) {
  return (
    <Box
      sx={{
        py: 2,
        borderTop: 1,
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary" {...props}>
        <Link color="inherit" href="https://univesp.br/">
          Projeto Integrador IV - UNIVESP. <br />
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}