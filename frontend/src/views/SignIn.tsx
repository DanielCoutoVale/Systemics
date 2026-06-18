import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'

export function SignInMain() {
  return (
    <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, maxWidth: 480, mx: 'auto' }}>
      <Stack spacing={3}>
        <Typography variant="h5">Sign In</Typography>
        <TextField label="Email" type="email" fullWidth />
        <TextField label="Password" type="password" fullWidth />
        <Button variant="contained" size="large">
          Continue
        </Button>
      </Stack>
    </Paper>
  )
}

export default function SignIn() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Sign In
        </Typography>
        <SignInMain />
      </Stack>
    </Container>
  )
}
