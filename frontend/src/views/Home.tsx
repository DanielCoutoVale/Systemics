import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'

type HomeProps = {
  onSignIn?: () => void
}

export function HomeMain({ onSignIn }: HomeProps) {
  return (
    <Paper elevation={1} sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5">Welcome to Systemics</Typography>
          <Typography>
            This homepage introduces the main sections of the platform. Use the navigation above to access
            authentication, system definitions, vocabules, examples, and corpora views.
          </Typography>
          <Typography color="text.secondary">
            Each view supports dedicated regions for layout and content. The app uses a shared Header and Footer
            for consistent navigation.
          </Typography>
        </Box>
        {onSignIn ? (
          <Button variant="contained" size="large" onClick={onSignIn}>
            Sign In
          </Button>
        ) : null}
      </Stack>
    </Paper>
  )
}

export default function Home({ onSignIn }: HomeProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Home
        </Typography>
        <HomeMain onSignIn={onSignIn} />
      </Stack>
    </Container>
  )
}
