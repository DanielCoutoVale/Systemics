import { Box, Card, CardContent, CardHeader, Container, Grid, Paper, Stack, Typography } from '@mui/material'

export function ExamplesAside() {
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Examples Aside
      </Typography>
      <Typography color="text.secondary">
        See example datasets and usage patterns here while working in the Examples section.
      </Typography>
    </Paper>
  )
}

export function ExamplesMain() {
  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Examples Main" subheader="Practical use cases and data samples" />
        <CardContent>
          <Typography>
            The main region for Examples is where sample content, tutorials, and example workflows are displayed.
          </Typography>
        </CardContent>
      </Card>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Choose examples to explore how your vocabules and corpora work within systems.
        </Typography>
      </Box>
    </Stack>
  )
}

export default function Examples() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ExamplesAside />
        </Grid>
        <Grid item xs={12} md={8}>
          <ExamplesMain />
        </Grid>
      </Grid>
    </Container>
  )
}
