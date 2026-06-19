import { Box, Tab, Tabs } from '@mui/material'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faBook, faLightbulb, faDatabase } from '@fortawesome/free-solid-svg-icons'
import Footer from './regions/Footer'
import Header from './regions/Header'
import Corpora from './views/Corpora'
import Examples from './views/Examples'
import Home from './views/Home'
import SignIn from './views/SignIn'
import Systems from './views/Systems'
import Vocabules from './views/Vocabules'

type AuthState = 'guest' | 'user'

function RequireAuthenticated({ userState }: { userState: AuthState }) {
  return userState === 'user' ? <Outlet /> : <Navigate replace to="/" />
}

function UserTabLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const tabRoutes = [
    { label: 'Systems', path: '/systems', icon: faCogs },
    { label: 'Vocabules', path: '/vocabules', icon: faBook },
    { label: 'Examples', path: '/examples', icon: faLightbulb },
    { label: 'Corpora', path: '/corpora', icon: faDatabase },
  ]

  const currentTab = tabRoutes.findIndex((tab) => location.pathname === tab.path)

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    navigate(tabRoutes[newValue].path)
  }

  return (
    <Box sx={{ width: '100%', pt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab === -1 ? 0 : currentTab} onChange={handleTabChange}>
          {tabRoutes.map((tab) => (
            <Tab
              key={tab.path}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FontAwesomeIcon icon={tab.icon} />
                  {tab.label}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  )
}

function AppRoutes() {
  const [userState, setUserState] = useState<AuthState>('guest')
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string | null>(null)
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

  const handleSignIn = (name?: string) => {
    const finalName = name ?? 'demo'
    setUserState('user')
    setUserName(finalName)
    setUserPhotoUrl(`https://i.pravatar.cc/40?u=${encodeURIComponent(finalName)}`)
    navigate('/systems')
  }

  const handleSignOut = () => {
    setUserState('guest')
    setUserName(null)
    setUserPhotoUrl(null)
    navigate('/')
  }

  return (
    <>
      <Header
        userState={userState}
        onSignOut={handleSignOut}
        onSignIn={() => navigate('/signin')}
        userName={userName ?? undefined}
        userPhotoUrl={userPhotoUrl ?? undefined}
      />

      <Box component="main" sx={{ minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={userState === 'guest' ? <Home onSignIn={() => navigate('/signin')} /> : <Navigate replace to="/systems" />} />
          <Route
            path="/signin"
            element={
              userState === 'guest' ? (
                <SignIn onContinue={handleSignIn} onCancel={() => navigate('/')} />
              ) : (
                <Navigate replace to="/systems" />
              )
            }
          />

          <Route element={<RequireAuthenticated userState={userState} />}>
            <Route element={<UserTabLayout />}>
              <Route path="/systems" element={<Systems />} />
              <Route path="/vocabules" element={<Vocabules />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/corpora" element={<Corpora />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate replace to={userState === 'guest' ? '/' : '/systems'} />} />
        </Routes>
      </Box>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
