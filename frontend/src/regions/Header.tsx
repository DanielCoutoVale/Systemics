import { AppBar, Avatar, Box, Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemButton, ListItemText, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { useState, type MouseEvent } from 'react'

type HeaderProps = {
  userState: 'guest' | 'user'
  onSignOut: () => void
  onSignIn?: () => void
  userName?: string
  userPhotoUrl?: string
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

export default function Header({ userState, onSignOut, onSignIn, userName, userPhotoUrl }: HeaderProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [activeMenu, setActiveMenu] = useState<TopMenuKey | null>(null)
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [languageName, setLanguageName] = useState('')
  const [modelName, setModelName] = useState('')
  const [modelVersion, setModelVersion] = useState('')
  const [creating, setCreating] = useState(false)
  const [openDialogOpen, setOpenDialogOpen] = useState(false)
  const [resources, setResources] = useState<Array<{ id: string; languageName: string; modelName: string; modelVersion: string }>>([])
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null)
  const [loadingResources, setLoadingResources] = useState(false)
  const [resourceError, setResourceError] = useState<string | null>(null)

  const openMenu = Boolean(menuAnchor) && activeMenu !== null

  const handleOpenMenu = (menu: TopMenuKey) => (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
    setActiveMenu(menu)
  }

  const handleCloseMenus = () => {
    setMenuAnchor(null)
    setActiveMenu(null)
  }

  const handleMenuOptionClick = async (label: string) => {
    handleCloseMenus()
    if (label === 'New...') {
      setLanguageName('')
      setModelName('')
      setModelVersion('')
      setNewDialogOpen(true)
      return
    }

    if (label === 'Open...') {
      setOpenDialogOpen(true)
      setLoadingResources(true)
      setResourceError(null)
      try {
        const response = await fetch('http://localhost:3000/resources')
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const list = await response.json()
        setResources(list)
        setSelectedResourceId(list.length ? list[0]?.id ?? null : null)
      } catch (error: any) {
        setResourceError(error.message || 'Failed to load resources')
      } finally {
        setLoadingResources(false)
      }
    }
  }

  const createResource = async () => {
    setCreating(true)
    try {
      const payload = {
        languageName: languageName || '',
        modelName: modelName || '',
        modelVersion: modelVersion || '',
        systems: [],
        vocabules: [],
        examples: [],
        corpora: [],
      }

      const res = await fetch('http://localhost:3000/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        throw new Error(err.message || 'Failed to create resource')
      }

      const data = await res.json()
      setNewDialogOpen(false)
      alert(`Resource created: ${data.id}`)
    } catch (e: any) {
      alert(`Create failed: ${e.message ?? e}`)
    } finally {
      setCreating(false)
    }
  }

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }} elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Systemics
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {userState === 'guest' ? (
            onSignIn ? (
              <Button color="inherit" size="small" onClick={onSignIn}>
                Sign In
              </Button>
            ) : null
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={userPhotoUrl} alt={userName ?? 'user'} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {userName}
              </Typography>
              <Button color="inherit" size="small" onClick={onSignOut}>
                Sign Out
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>

      {userState === 'user' && (
        <Toolbar variant="dense" sx={{ backgroundColor: '#1565c0', minHeight: 40, px: 1, gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} component="nav">
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
          </Box>

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
                  <MenuItem key={option.label} onClick={() => handleMenuOptionClick(option.label)}>
                    {option.label}
                  </MenuItem>
                ),
              )}
            </Menu>
          ))}
        </Toolbar>
      )}
    </AppBar>
    <Dialog open={newDialogOpen} onClose={() => setNewDialogOpen(false)} maxWidth="xs" fullWidth>
      <DialogTitle>Create Resource</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Language Name" value={languageName} onChange={(e) => setLanguageName(e.target.value)} fullWidth />
          <TextField label="Model Name" value={modelName} onChange={(e) => setModelName(e.target.value)} fullWidth />
          <TextField label="Model Version" value={modelVersion} onChange={(e) => setModelVersion(e.target.value)} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewDialogOpen(false)} disabled={creating}>Cancel</Button>
        <Button onClick={createResource} variant="contained" disabled={creating || (!languageName && !modelName && !modelVersion)}>
          Create resource
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={openDialogOpen} onClose={() => setOpenDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Open Resource</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {resourceError ? (
            <Typography color="error">{resourceError}</Typography>
          ) : loadingResources ? (
            <Typography>Loading resources...</Typography>
          ) : (
            <List>
              {resources.map((resource) => (
                <ListItemButton
                  key={resource.id}
                  selected={selectedResourceId === resource.id}
                  onClick={() => setSelectedResourceId(resource.id)}
                >
                  <ListItemText
                    primary={resource.languageName}
                    secondary={`${resource.modelName} • ${resource.modelVersion}`}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialogOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            setOpenDialogOpen(false)
          }}
          variant="contained"
          disabled={!selectedResourceId}
        >
          Open resource
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}
