import { Box, Card, CardContent, CardHeader, Container, Grid, Paper, Stack, Typography } from '@mui/material'

export function VocabulesAside() {
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Vocabules Aside
      </Typography>
      <Typography color="text.secondary">
        Browse definitions, semantic tags, and vocabulary categories from the sidebar.
      </Typography>
    </Paper>
  )
}

export function VocabulesMain() {
  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Vocabules Main" subheader="Vocabulary and language components" />
        <CardContent>
          <Typography>
            This main section surfaces vocabularies, terms, and example usages for your application.
          </Typography>
        </CardContent>
      </Card>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Use the Vocabules view to manage language elements and terminology for your systems.
        </Typography>
      </Box>
    </Stack>
  )
}

export default function Vocabules() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <VocabulesAside />
        </Grid>
        <Grid item xs={12} md={8}>
          <VocabulesMain />
        </Grid>
      </Grid>
    </Container>
  )
}
