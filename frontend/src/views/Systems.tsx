import { Box, Card, CardContent, CardHeader, Container, Grid, Paper, Stack, Typography } from '@mui/material'

export function SystemsAside() {
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Systems Aside
      </Typography>
      <Typography color="text.secondary">
        Use this sidebar to manage filters, system metadata, and quick actions for your systems collection.
      </Typography>
    </Paper>
  )
}

export function SystemsMain() {
  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Systems Main" subheader="Overview of active systems" />
        <CardContent>
          <Typography>
            The systems main region contains detailed system entries, configuration summaries, and the core
            workspace for the Systems view.
          </Typography>
        </CardContent>
      </Card>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Add systems, review definitions, and monitor system status in this main content region.
        </Typography>
      </Box>
    </Stack>
  )
}

export default function Systems() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SystemsAside />
        </Grid>
        <Grid item xs={12} md={8}>
          <SystemsMain />
        </Grid>
      </Grid>
    </Container>
  )
}
