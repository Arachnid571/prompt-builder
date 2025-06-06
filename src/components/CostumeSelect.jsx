import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrompt } from '../App';

const CostumeSelect = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const { selectedAnime, setSelectedCostume, telegramUser } = usePrompt();

  const [showModal, setShowModal] = useState(false); // Для модального окна
  const [isChecking, setIsChecking] = useState(false); // Для состояния загрузки API

  // API для проверки подписки
  const checkSubscription = async (userId) => {
    try {
      const response = await fetch(`/api/subscription/${userId}`);
      if (!response.ok) throw new Error('Ошибка сервера');
      const data = await response.json();
      return data.isSubscribed || false;
    } catch (error) {
      console.error('Ошибка проверки подписки:', error);
      return telegramUser?.isSubscribed || false; // Запасной вариант
    }
  };

  const costumes = [
    { name: '', image: '/images/costumes/def.jpg', isAdult: false },
    { name: 'revealing School Uniform', image: '/images/costumes/school_uniform.jpg', isAdult: false },
    { name: 'revealing Maid Outfit', image: '/images/costumes/maid.jpg', isAdult: false },
    { name: 'Revealing Micro Swimsuit', image: '/images/costumes/micro_swimsuit.jpg', isAdult: false },
    { name: 'Kimono', image: '/images/costumes/kimono.jpg', isAdult: false },
    { name: 'Bunny Costume', image: '/images/costumes/bunny.jpg', isAdult: false },
    { name: 'Cheerleader', image: '/images/costumes/cheerleader.jpg', isAdult: false },
    { name: 'revealing Nurse Outfit', image: '/images/costumes/nurse.jpg', isAdult: false },
    { name: 'revealing Police Uniform', image: '/images/costumes/police.jpg', isAdult: false },
    { name: 'revealing Micro Bikini', image: '/images/costumes/micro_bikini.jpg', isAdult: false },
    { name: 'Towel', image: '/images/costumes/towel.jpg', isAdult: false },
    { name: 'Stockings and Garter', image: '/images/costumes/stockings.jpg', isAdult: false },
    { name: 'Thong', image: '/images/costumes/thong.jpg', isAdult: false },
    { name: 'Foam on body', image: '/images/costumes/foam.jpg', isAdult: false },
    { name: 'Cream on body', image: '/images/costumes/cream.jpg', isAdult: false },
    { name: 'revealing Armor', image: '/images/costumes/armor.jpg', isAdult: false },
    { name: 'Nude', image: '/images/costumes/nude.jpg', isAdult: true },
    { name: 'Fishnet Bodysuit', image: '/images/costumes/fishnet.jpg', isAdult: false },
    { name: 'Shibari', image: '/images/costumes/shibari.jpg', isAdult: true },
    { name: 'Latex', image: '/images/costumes/latex.jpg', isAdult: false },
    { name: 'revealing dress', image: '/images/costumes/dress.jpg', isAdult: false },
    { name: 'revealing nun outfit', image: '/images/costumes/nun.jpg', isAdult: false },
  ];

  const normalizedAnime = anime?.toLowerCase().replace(/\s+/g, '');

  const handleCostumeSelect = async (costume) => {
    if (costume.isAdult && telegramUser) {
      setIsChecking(true);
      const isSubscribed = await checkSubscription(telegramUser.id);
      setIsChecking(false);
      if (!isSubscribed) {
        setShowModal(true);
        return;
      }
    }
    setSelectedCostume(costume);
    navigate(`/poses/${normalizedAnime}`);
  };

  const handleSkip = () => {
    navigate(`/poses/${normalizedAnime}`);
  };

  if (!telegramUser) {
    return (
      <div className="min-h-screen bg-[#171f14] flex items-center justify-center">
        <p className="text-white text-lg">Please open this app in Telegram.</p>
      </div>
    );
  }

  if (!selectedAnime || selectedAnime.name.toLowerCase().replace(/\s+/g, '') !== normalizedAnime) {
    navigate('/');
    return null;
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#171f14] dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-[#171f14] p-4 pb-2 justify-between">
          <div
            className="text-white flex size-12 shrink-0 items-center cursor-pointer"
            onClick={() => navigate(`/characters/${normalizedAnime}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Select Costume
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {costumes.map((costume) => (
            <div
              key={costume.name}
              className={`flex flex-col gap-3 rounded-lg border p-2 cursor-pointer ${
                costume.isAdult && !telegramUser?.isSubscribed ? 'opacity-50 cursor-not-allowed' : 'border-[#445c3d] hover:bg-[#2e3a2b]'
              }`}
              onClick={() => !isChecking && handleCostumeSelect(costume)}
            >
              <img
                src={costume.image}
                alt={costume.name}
                className="w-32 h-32 object-cover rounded-xl"
                onError={(e) => {
                  console.error(`Failed to load image: ${costume.image}`);
                  e.target.src = '/images/fallback-image.jpg';
                }}
              />
              <p className="text-white text-base font-medium">{costume.name}</p>
              {costume.isAdult && (
                <span className="absolute top-2 right-2 text-red-500 text-xs font-bold">18+</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Модальное окно */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#222e1f] p-6 rounded-lg max-w-sm w-full text-center">
            <h3 className="text-white text-lg font-bold mb-4">Subscription required</h3>
            <p className="text-gray-300 mb-6">This content is available to subscribers only. Please subscribe.</p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 bg-[#445d3e] text-white rounded hover:bg-[#556b4e]"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-[#a4be9d] text-[#171f14] rounded hover:bg-[#b8d0b2]"
                onClick={() => {
                  setShowModal(false);
                  window.open('https://t.me/AniGenerator_bot?', '_blank'); // Ссылка на бота подписки
                }}
              >
                Subscribe now
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-center p-4">
          <button
            onClick={handleSkip}
            className="text-[#a4be9d] text-sm hover:underline"
          >
            Skip
          </button>
        </div>
        <div className="flex gap-2 border-t border-[#2f402b] bg-[#222e1f] px-4 py-3">
          <a href="/" className="flex flex-1 flex-col items-center justify-end gap-1 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
            </svg>
          </a>
          <a href="#" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#a4be9d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </a>
          <a href="#" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#a4be9d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM136.44,54.72,164.57,71l-58.90,15.55L77.55,70.27ZM208,200H48V120H208v80Z"></path>
            </svg>
          </a>
          <a href="#" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#a4be9d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CostumeSelect;