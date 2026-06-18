import { Box, Container, Link, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.100', py: 3, mt: 5 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Systemics. Built with React, MUI, and React Router.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link href="https://mui.com/" target="_blank" rel="noreferrer" underline="hover">
            Material UI
          </Link>{' '}
          ·{' '}
          <Link href="https://reactrouter.com/" target="_blank" rel="noreferrer" underline="hover">
            React Router
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}
