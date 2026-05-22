import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/common/nav-bar';
import ScrollToTopButton from './components/ui/scroll-to-top-button';
import HomePage from './pages/home-page';
import AboutMePage from './pages/about-me-page';
import ProjectsPage from './pages/projects-page';
import ProjectDetailPage from './pages/project-detail-page';

function App() {
  return (
    <BrowserRouter basename='/my-portfolio'>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <NavBar />
        <Box component='main' sx={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutMePage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/projects/:slug' element={<ProjectDetailPage />} />
          </Routes>
        </Box>
        <ScrollToTopButton />
      </Box>
    </BrowserRouter>
  );
}

export default App;
