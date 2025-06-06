import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimeGallery from './components/AnimeGallery';
import CharacterSelect from './components/CharacterSelect';
import CostumeSelect from './components/CostumeSelect';
import PoseSelect from './components/PoseSelect';
import BackgroundSelect from './components/BackgroundSelect';
import PromptForm from './components/PromptForm';
import axios from 'axios';

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

function App() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedCostume, setSelectedCostume] = useState(null);
  const [selectedPose, setSelectedPose] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedNsfw, setSelectedNsfw] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState('poses');

  useEffect(() => {
    const initializeUser = async () => {
      // Устанавливаем тестового пользователя по умолчанию
      const defaultUser = {
        id: '381349971',
        firstName: 'Traveler',
        lastName: 'Пользователь',
        username: 'testuser',
        isSubscribed: true, // Подписка включена (из предыдущего запроса)
      };
      setTelegramUser(defaultUser);
      console.log('Пользователь установлен:', defaultUser);
    };

    initializeUser();
  }, []);

  const generatePrompt = () => {
    const parts = [];
    if (selectedCharacter?.name) parts.push(selectedCharacter.name);
    if (selectedCostume?.name) parts.push(`${selectedCostume.name.toLowerCase()}`);
    if (selectedPose?.name) parts.push(selectedPose.name.toLowerCase());
    if (selectedEmotions.length > 0) parts.push(`${selectedEmotions.join(', ').toLowerCase()}`);
    if (selectedNsfw.length > 0) parts.push(selectedNsfw.join(', ').toLowerCase());
    if (selectedBackground?.name) parts.push(`${selectedBackground.name.toLowerCase()}`);
    const newPrompt = parts.filter(Boolean).join(', ');
    console.log('Generated prompt:', newPrompt);
    setPrompt(newPrompt);
    return newPrompt;
  };

  const sendToBot = async () => {
    if (!prompt) {
      alert('Пожалуйста, выберите все опции для создания промпта');
      return;
    }
    setIsSending(true);
    try {
      console.log('Отправка данных в бот:', {
        userId: telegramUser.id,
        prompt,
        anime: selectedAnime?.name,
        character: selectedCharacter?.name,
        costume: selectedCostume?.name,
        pose: selectedPose?.name,
        emotions: selectedEmotions,
        nsfw: selectedNsfw,
        background: selectedBackground?.name,
      });

      // Отправка через API (как в режиме разработки)
      const response = await axios.post('/api/generate', {
        userId: telegramUser.id,
        character: selectedCharacter?.name || '',
        costume: selectedCostume?.name || '',
        pose: selectedPose?.name || '',
        background: selectedBackground?.name || '',
      });
      console.log('Отправлено через API:', response.data);
      alert('Генерация начата! Проверьте Telegram для результата или консоль для логов.');
    } catch (error) {
      console.error('Ошибка отправки данных в бот:', error);
      alert(`Не удалось отправить промпт: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  const resetSelections = () => {
    setSelectedAnime(null);
    setSelectedCharacter(null);
    setSelectedCostume(null);
    setSelectedPose(null);
    setSelectedEmotions([]);
    setSelectedNsfw([]);
    setSelectedBackground(null);
    setPrompt('');
    setActiveTab('poses');
  };

  const promptContextValue = {
    selectedAnime,
    setSelectedAnime,
    selectedCharacter,
    setSelectedCharacter,
    selectedCostume,
    setSelectedCostume,
    selectedPose,
    setSelectedPose,
    selectedEmotions,
    setSelectedEmotions,
    selectedNsfw,
    setSelectedNsfw,
    selectedBackground,
    setSelectedBackground,
    prompt,
    setPrompt,
    generatePrompt,
    sendToBot,
    isSending,
    telegramUser,
    activeTab,
    setActiveTab,
    resetSelections,
  };

  return (
    <PromptContext.Provider value={promptContextValue}>
      <Router>
        <div className="min-h-screen bg-[#171f14] text-gray-100">
          <p className="p-4 text-center text-lg">
            Hi {telegramUser?.firstName || 'User'}!
          </p>
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
    </PromptContext.Provider>
  );
}

export default App;