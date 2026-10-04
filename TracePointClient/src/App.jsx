import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import CasePage from './pages/CasePage.jsx';
import EvidencePage from './pages/EvidencePage.jsx';
import HomePage from './pages/HomePage.jsx';
import InvestigationPage from './pages/InvestigationPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SuspectsPage from './pages/SuspectsPage.jsx';

// React routing (Part N): /  /case  /suspects  /evidence  /investigation
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/case" element={<CasePage />} />
        <Route path="/suspects" element={<SuspectsPage />} />
        <Route path="/evidence" element={<EvidencePage />} />
        <Route path="/investigation" element={<InvestigationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
