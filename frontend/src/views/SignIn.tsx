import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'

type SignInProps = {
  onContinue: () => void
  onCancel: () => void
}

export function SignInMain({ onContinue, onCancel }: SignInProps) {
  return (
    <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, maxWidth: 480, mx: 'auto' }}>
      <Stack spacing={3}>
        <Typography variant="h5">Sign In</Typography>
        <TextField label="Email" type="email" fullWidth />
        <TextField label="Password" type="password" fullWidth />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={() => onContinue()}>
            Sign In
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default function SignIn({ onContinue, onCancel }: SignInProps) {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Sign In
        </Typography>
        <SignInMain onContinue={onContinue} onCancel={onCancel} />
      </Stack>
    </Container>
  )
}
