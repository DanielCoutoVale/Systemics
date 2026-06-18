import { AppBar, Box, Button, Divider, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'

type HeaderProps = {
  userState: 'guest' | 'user'
  onSignOut: () => void
  onSignIn?: () => void
}

export default function Header({ userState, onSignOut, onSignIn }: HeaderProps) {
  const [fileAnchorEl, setFileAnchorEl] = useState<null | HTMLElement>(null)
  const [latestAnchorEl, setLatestAnchorEl] = useState<null | HTMLElement>(null)
  const [revertAnchorEl, setRevertAnchorEl] = useState<null | HTMLElement>(null)
  const [editAnchorEl, setEditAnchorEl] = useState<null | HTMLElement>(null)
  const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null)
  const [goAnchorEl, setGoAnchorEl] = useState<null | HTMLElement>(null)

  const openFileMenu = Boolean(fileAnchorEl)
  const openLatestMenu = Boolean(latestAnchorEl)
  const openRevertMenu = Boolean(revertAnchorEl)
  const openEditMenu = Boolean(editAnchorEl)
  const openViewMenu = Boolean(viewAnchorEl)
  const openGoMenu = Boolean(goAnchorEl)

  const handleOpenFileMenu = (event: React.MouseEvent<HTMLElement>) => setFileAnchorEl(event.currentTarget)
  const handleCloseMenus = () => {
    setFileAnchorEl(null)
    setLatestAnchorEl(null)
    setRevertAnchorEl(null)
    setEditAnchorEl(null)
    setViewAnchorEl(null)
    setGoAnchorEl(null)
  }

  const handleOpenLatestMenu = (event: React.MouseEvent<HTMLElement>) => setLatestAnchorEl(event.currentTarget)
  const handleOpenRevertMenu = (event: React.MouseEvent<HTMLElement>) => setRevertAnchorEl(event.currentTarget)
  const handleOpenEditMenu = (event: React.MouseEvent<HTMLElement>) => setEditAnchorEl(event.currentTarget)
  const handleOpenViewMenu = (event: React.MouseEvent<HTMLElement>) => setViewAnchorEl(event.currentTarget)
  const handleOpenGoMenu = (event: React.MouseEvent<HTMLElement>) => setGoAnchorEl(event.currentTarget)

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          Systemics
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
          {userState === 'user' && (
            <>
              <Button color="inherit" size="small" onClick={handleOpenFileMenu}>
                File
              </Button>
          <Menu anchorEl={fileAnchorEl} open={openFileMenu} onClose={handleCloseMenus}>
            <MenuItem onClick={handleCloseMenus}>New...</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Open...</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Import...</MenuItem>
            <MenuItem onClick={handleOpenLatestMenu}>Latest</MenuItem>
            <Menu anchorEl={latestAnchorEl} open={openLatestMenu} onClose={() => setLatestAnchorEl(null)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
              <MenuItem onClick={handleCloseMenus}>Latest item 1</MenuItem>
              <MenuItem onClick={handleCloseMenus}>Latest item 2</MenuItem>
            </Menu>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Close</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Save</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Duplicate</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Rename</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Move...</MenuItem>
            <MenuItem onClick={handleOpenRevertMenu}>Revert to</MenuItem>
            <Menu anchorEl={revertAnchorEl} open={openRevertMenu} onClose={() => setRevertAnchorEl(null)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
              <MenuItem onClick={handleCloseMenus}>Last saved</MenuItem>
              <MenuItem onClick={handleCloseMenus}>Previous version</MenuItem>
            </Menu>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Export</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Publish</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Delete</MenuItem>
          </Menu>

          <Button color="inherit" size="small" onClick={handleOpenEditMenu}>
            Edit
          </Button>
          <Menu anchorEl={editAnchorEl} open={openEditMenu} onClose={handleCloseMenus}>
            <MenuItem onClick={handleCloseMenus}>Undo</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Redo</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Cut</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Copy</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Paste</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Delete</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Select All</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Find...</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Replace...</MenuItem>
          </Menu>

          <Button color="inherit" size="small" onClick={handleOpenViewMenu}>
            View
          </Button>
          <Menu anchorEl={viewAnchorEl} open={openViewMenu} onClose={handleCloseMenus}>
            <MenuItem onClick={handleCloseMenus}>Reload</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Toggle Full Screen</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Show Sidebar</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Show Status Bar</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Zoom In</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Zoom Out</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Actual Size</MenuItem>
          </Menu>

          <Button color="inherit" size="small" onClick={handleOpenGoMenu}>
            Go
          </Button>
          <Menu anchorEl={goAnchorEl} open={openGoMenu} onClose={handleCloseMenus}>
            <MenuItem onClick={handleCloseMenus}>Back</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Forward</MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenus}>Home</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Recent</MenuItem>
            <MenuItem onClick={handleCloseMenus}>Search</MenuItem>
          </Menu>
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
