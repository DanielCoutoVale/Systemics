import { Box } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './regions/Footer'
import Header from './regions/Header'
import Corpora from './views/Corpora'
import Examples from './views/Examples'
import Home from './views/Home'
import SignIn from './views/SignIn'
import Systems from './views/Systems'
import Vocabules from './views/Vocabules'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Box component="main" sx={{ minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/vocabules" element={<Vocabules />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/corpora" element={<Corpora />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Box>

      <Footer />
    </BrowserRouter>
  )
}

export default App
