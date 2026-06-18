import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

type HeaderProps = {
  userState: 'guest' | 'user'
  onSignOut: () => void
}

const guestNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Sign In', path: '/signin' },
]

export default function Header({ userState, onSignOut }: HeaderProps) {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Systemics
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
            Navigation across all sections
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: { xs: 1, sm: 0 } }}>
          {userState === 'guest' ? (
            guestNavItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                color="inherit"
                size="small"
                sx={{
                  '&.active': {
                    bgcolor: 'rgba(255,255,255,0.16)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))
          ) : (
            <Button color="inherit" size="small" onClick={onSignOut}>
              Sign Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
