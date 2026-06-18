import { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ overflow: 'hidden' }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton edge="start" color="inherit" aria-label="coffee">
                <FontAwesomeIcon icon={faCoffee} />
              </IconButton>
              <Typography variant="h6" component="div">
                Systemics UI Demo
              </Typography>
            </Box>
            <Chip
              icon={<FontAwesomeIcon icon={faCoffee} />}
              label="MUI + FontAwesome"
              color="secondary"
              variant="outlined"
            />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={4}>
            <Box>
              <Typography component="h1" variant="h4" gutterBottom>
                Global MUI theme is active
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The app now uses Material UI layout and styling across the page, with
                an application theme provided by ThemeProvider.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Documentation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Learn more about the tools powering this app with responsive
                      MUI cards and buttons.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      href="https://vite.dev/"
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      Vite docs
                    </Button>
                    <Button
                      component={Link}
                      href="https://react.dev/"
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      React docs
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Connect with community
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visit the projects and stay connected with the Vite ecosystem.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      href="https://github.com/vitejs/vite"
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      GitHub
                    </Button>
                    <Button
                      component={Link}
                      href="https://chat.vite.dev/"
                      target="_blank"
                      rel="noopener"
                      size="small"
                    >
                      Discord
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle1">Counter state</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click the button to update the count.
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="contained" onClick={() => setCount((prev) => prev + 1)}>
                    Increase count
                  </Button>
                  <Typography variant="h6">{count}</Typography>
                  <Chip icon={<FontAwesomeIcon icon={faCoffee} />} label="Coffee ready" color="secondary" />
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default App
