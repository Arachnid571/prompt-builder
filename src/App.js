import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import AnimeGallery from './components/AnimeGallery';
import CharacterSelect from './components/CharacterSelect';
import CostumeSelect from './components/CostumeSelect';
import PoseSelect from './components/PoseSelect';
import BackgroundSelect from './components/BackgroundSelect';
import PromptForm from './components/PromptForm';
import axios from 'axios'

// Создаём контекст для хранения состояния
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

  // Инициализация Telegram Web App или эмуляция для локальной разработки
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Эмуляция пользователя для локального тестирования
      setTelegramUser({
        id: 'test_user_123',
        firstName: 'Тестовый',
        lastName: 'Пользователь',
        username: 'testuser',
        isSubscribed: false, // Для тестирования NSFW-контента
      });
      console.log('Локальная эмуляция Telegram пользователя');
      return;
    }

    try {
      WebApp.ready();
      WebApp.expand();
      const user = WebApp.initDataUnsafe?.user;
      if (user) {
        setTelegramUser({ ...user, isSubscribed: false }); // Заглушка для подписки
        console.log('Пользователь Telegram:', user);
      } else {
        console.warn('Приложение не запущено в Telegram Web App');
      }
    } catch (error) {
      console.error('Ошибка инициализации Telegram Web App:', error);
    }
  }, []);

  // Формирование промпта
  const generatePrompt = () => {
    const parts = [];
    if (selectedCharacter?.name) parts.push(selectedCharacter.name);
    if (selectedAnime?.name && !['General', 'Other'].includes(selectedAnime.name)) {
      parts.push(``);
    }
    if (selectedCostume?.name) parts.push(`${selectedCostume.name.toLowerCase()}`);
    if (selectedPose?.name) parts.push(selectedPose.name.toLowerCase());
    if (selectedEmotions.length > 0) parts.push(`${selectedEmotions.join(', ').toLowerCase()}`);
    if (selectedNsfw.length > 0) parts.push(selectedNsfw.join(', ').toLowerCase());
    if (selectedBackground?.name) parts.push(`${selectedBackground.name.toLowerCase()}`);
    const newPrompt = parts.filter(Boolean).join(', ');
    setPrompt(newPrompt);
    return newPrompt;
  };

  // Отправка промпта в бот
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
      } else {
        const response = await axios.post('/api/generate', {
          userId: telegramUser.id,
          character: selectedCharacter?.name || '',
          costume: selectedCostume?.name || '',
          pose: selectedPose?.name || '',
          background: selectedBackground?.name || '',
        });
        alert('Генерация начата! Проверьте Telegram для результата.');
      }
    } catch (error) {
      console.error('Ошибка отправки данных в бот:', error);
      alert('Не удалось отправить промпт в бот');
    } finally {
      setIsSending(false);
    }
  };

  // Очистка выбора
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

  // Значение контекста
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
              Hi, {telegramUser.firstName}!
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