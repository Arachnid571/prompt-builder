import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeGallery from './components/AnimeGallery';
import CharacterSelect from './components/CharacterSelect';
import CostumeSelect from './components/CostumeSelect';
import PoseSelect from './components/PoseSelect';
import BackgroundSelect from './components/BackgroundSelect';
import PromptForm from './components/PromptForm';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#171f14] text-white p-4">
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AnimeGallery />} />
          <Route path="/characters/:anime" element={<ErrorBoundary><CharacterSelect /></ErrorBoundary>} />
          <Route path="/costumes/:anime" element={<ErrorBoundary><CostumeSelect /></ErrorBoundary>} />
          <Route path="/poses/:anime" element={<ErrorBoundary><PoseSelect /></ErrorBoundary>} />
          <Route path="/backgrounds/:anime" element={<ErrorBoundary><BackgroundSelect /></ErrorBoundary>} />
          <Route path="/prompt/:anime" element={<ErrorBoundary><PromptForm /></ErrorBoundary>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;