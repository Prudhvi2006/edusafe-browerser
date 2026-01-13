
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ExamPage from './pages/ExamPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-blue-500/30">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/login" element={<Landing />} /> {/* Redirect to landing for demo */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
