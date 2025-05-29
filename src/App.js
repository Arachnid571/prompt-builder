import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeGallery from './components/AnimeGallery';
import CharacterSelect from './components/CharacterSelect';
import CostumeSelect from './components/CostumeSelect';
import PoseSelect from './components/PoseSelect';
import BackgroundSelect from './components/BackgroundSelect';
import PromptForm from './components/PromptForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AnimeGallery />} />
          <Route path="/characters/:anime" element={<CharacterSelect />} />
          <Route path="/costumes/:anime" element={<CostumeSelect />} />
          <Route path="/poses/:anime" element={<PoseSelect />} />
          <Route path="/backgrounds/:anime" element={<BackgroundSelect />} />
          <Route path="/prompt/:anime" element={<PromptForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;