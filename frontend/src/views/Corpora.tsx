import { Box, Card, CardContent, CardHeader, Container, Grid, Paper, Stack, Typography } from '@mui/material'

export function CorporaAside() {
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Corpora Aside
      </Typography>
      <Typography color="text.secondary">
        Filter corpora, manage corpora sources, and inspect corpus metadata from the aside.
      </Typography>
    </Paper>
  )
}

export function CorporaMain() {
  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Corpora Main" subheader="Large text collections and datasets" />
        <CardContent>
          <Typography>
            This main region is dedicated to corpora content, annotations, and dataset management.
          </Typography>
        </CardContent>
      </Card>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Use corpora to analyze language patterns across your examples and vocabules.
        </Typography>
      </Box>
    </Stack>
  )
}

export default function Corpora() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CorporaAside />
        </Grid>
        <Grid item xs={12} md={8}>
          <CorporaMain />
        </Grid>
      </Grid>
    </Container>
  )
}
