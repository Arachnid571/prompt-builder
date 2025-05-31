import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
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
      if (process.env.NODE_ENV === 'development') {
        const testUser = {
          id: '381349971',
          firstName: 'Тестовый',
          lastName: 'Пользователь',
          username: 'testuser',
          isSubscribed: false,
        };
        try {
          const response = await axios.get('/api/subscription', { params: { userId: testUser.id } });
          setTelegramUser({ ...testUser, isSubscribed: response.data.isSubscribed });
        } catch (error) {
          console.error('Ошибка проверки подписки:', error);
          setTelegramUser({ ...testUser, isSubscribed: true }); // Для тестов NSFW
        }
        return;
      }

      try {
        WebApp.ready();
        WebApp.expand();
        const user = WebApp.initDataUnsafe?.user;
        if (user) {
          const response = await axios.get('/api/subscription', { params: { userId: user.id } });
          setTelegramUser({ ...user, isSubscribed: response.data.isSubscribed });
          console.log('Пользователь Telegram:', { ...user, isSubscribed: response.data.isSubscribed });
        } else {
          console.warn('Приложение не запущено в Telegram Web App');
        }
      } catch (error) {
        console.error('Ошибка инициализации Telegram Web App:', error);
      }
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
    if (!telegramUser) {
      alert('Это приложение должно быть открыто в Telegram');
      return;
    }
    setIsSending(true);
    try {
      if (process.env.NODE_ENV === 'development') {
        // Эмуляция отправки для логов
        console.log('Эмуляция отправки данных в бот:', {
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
      }

      // Отправляем команду /generate от имени пользователя
      const command = `/generate ${prompt}`;
      if (process.env.NODE_ENV !== 'development' && window.Telegram?.WebApp) {
        // Используем WebApp для отправки сообщения в чат
        window.Telegram.WebApp.sendData(JSON.stringify({ command }));
        alert('Команда отправлена в чат с ботом!');
      } else {
        // Локальная отправка через API для тестов
        const response = await axios.post('/api/generate', {
          userId: telegramUser.id,
          character: selectedCharacter?.name || '',
          costume: selectedCostume?.name || '',
          pose: selectedPose?.name || '',
          background: selectedBackground?.name || '',
        });
        console.log('Отправлено через API:', response.data);
        alert('Генерация начата! Проверьте Telegram для результата.');
      }
    } catch (error) {
      console.error('Ошибка отправки данных в бот:', error);
      alert(`Не удалось отправить промпт в бот: ${error.message}`);
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
          {telegramUser ? (
            <p className="p-4 text-center text-lg">
              Hi {telegramUser.firstName}!
            </p>
          ) : (
            <p className="p-4 text-center text-red-500 text-lg">
              Пожалуйста, откройте приложение в Telegram
            </p>
          )}
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