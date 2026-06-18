import { AppBar, Box, Button, Divider, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState, type MouseEvent } from 'react'

type HeaderProps = {
  userState: 'guest' | 'user'
  onSignOut: () => void
  onSignIn?: () => void
}

type TopMenuKey = 'file' | 'edit' | 'view' | 'go'

const menuConfig: Array<{
  key: TopMenuKey
  label: string
  options: Array<{ label: string; divider?: boolean }>
}> = [
  {
    key: 'file',
    label: 'File',
    options: [
      { label: 'New...' },
      { label: 'Open...' },
      { label: 'Import...' },
      { divider: true, label: 'divider' },
      { label: 'Close' },
      { label: 'Save' },
      { label: 'Duplicate' },
      { label: 'Rename' },
      { label: 'Move...' },
      { divider: true, label: 'divider' },
      { label: 'Export' },
      { label: 'Publish' },
      { divider: true, label: 'divider' },
      { label: 'Delete' },
    ],
  },
  {
    key: 'edit',
    label: 'Edit',
    options: [
      { label: 'Undo' },
      { label: 'Redo' },
      { divider: true, label: 'divider' },
      { label: 'Cut' },
      { label: 'Copy' },
      { label: 'Paste' },
      { label: 'Delete' },
      { divider: true, label: 'divider' },
      { label: 'Select All' },
      { label: 'Find...' },
      { label: 'Replace...' },
    ],
  },
  {
    key: 'view',
    label: 'View',
    options: [
      { label: 'Reload' },
      { label: 'Toggle Full Screen' },
      { divider: true, label: 'divider' },
      { label: 'Show Sidebar' },
      { label: 'Show Status Bar' },
      { divider: true, label: 'divider' },
      { label: 'Zoom In' },
      { label: 'Zoom Out' },
      { label: 'Actual Size' },
    ],
  },
  {
    key: 'go',
    label: 'Go',
    options: [
      { label: 'Back' },
      { label: 'Forward' },
      { divider: true, label: 'divider' },
      { label: 'Home' },
      { label: 'Recent' },
      { label: 'Search' },
    ],
  },
]

export default function Header({ userState, onSignOut, onSignIn }: HeaderProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [activeMenu, setActiveMenu] = useState<TopMenuKey | null>(null)

  const openMenu = Boolean(menuAnchor) && activeMenu !== null

  const handleOpenMenu = (menu: TopMenuKey) => (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
    setActiveMenu(menu)
  }

  const handleCloseMenus = () => {
    setMenuAnchor(null)
    setActiveMenu(null)
  }

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Systemics
        </Typography>

        <Box component="nav" sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
          {userState === 'user' && (
            <>
              {menuConfig.map((menu) => (
                <Button
                  key={menu.key}
                  color="inherit"
                  size="small"
                  onClick={handleOpenMenu(menu.key)}
                  sx={{ textTransform: 'none', fontWeight: 600, minWidth: 72, px: 1.5 }}
                >
                  {menu.label}
                </Button>
              ))}

              {menuConfig.map((menu) => (
                <Menu
                  key={menu.key}
                  anchorEl={menuAnchor}
                  open={openMenu && activeMenu === menu.key}
                  onClose={handleCloseMenus}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  MenuListProps={{ 'aria-labelledby': `${menu.key}-button` }}
                >
                  {menu.options.map((option, index) =>
                    option.divider ? (
                      <Divider key={`divider-${menu.key}-${index}`} />
                    ) : (
                      <MenuItem key={option.label} onClick={handleCloseMenus}>
                        {option.label}
                      </MenuItem>
                    ),
                  )}
                </Menu>
              ))}
            </>
          )}
        </Box>

        <Box>
          {userState === 'guest' && onSignIn ? (
            <Button color="inherit" size="small" onClick={onSignIn}>
              Sign In
            </Button>
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
