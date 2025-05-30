import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrompt } from '../App';

const BackgroundSelect = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const { selectedAnime, setSelectedBackground, telegramUser } = usePrompt();

  const backgrounds = [
    { name: 'City', image: '/images/backgrounds/city.jpg', isAdult: false },
    { name: 'School', image: '/images/backgrounds/school.jpg', isAdult: false },
    { name: 'Beach', image: '/images/backgrounds/beach.jpg', isAdult: false },
    { name: 'Forest', image: '/images/backgrounds/forest.jpg', isAdult: false },
    { name: 'Hot Springs', image: '/images/backgrounds/hot_springs.jpg', isAdult: false },
    { name: 'Cafe', image: '/images/backgrounds/cafe.jpg', isAdult: false },
    { name: 'Japanese House', image: '/images/backgrounds/japanese_house.jpg', isAdult: false }, // Исправлено Japanese_house
    { name: 'Dungeon', image: '/images/backgrounds/dungeon.jpg', isAdult: false },
    { name: 'Street', image: '/images/backgrounds/street.jpg', isAdult: false },
    { name: 'Sauna', image: '/images/backgrounds/sauna.jpg', isAdult: false },
    { name: 'Pool', image: '/images/backgrounds/pool.jpg', isAdult: false },
    { name: 'Bedroom', image: '/images/backgrounds/bedroom.jpg', isAdult: false },
    { name: 'Bathroom', image: '/images/backgrounds/bathroom.jpg', isAdult: false },
    { name: 'Island', image: '/images/backgrounds/island.jpg', isAdult: false },
    { name: 'Waterfall', image: '/images/backgrounds/waterfall.jpg', isAdult: false },
  ];

  const normalizedAnime = anime?.toLowerCase().replace(/\s+/g, '');

  const handleBackgroundSelect = (background) => {
    setSelectedBackground(background);
    navigate(`/prompt/${normalizedAnime}`);
  };

  const handleSkip = () => {
    navigate(`/prompt/${normalizedAnime}`);
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
            onClick={() => navigate(`/poses/${normalizedAnime}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Select Background
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {backgrounds.map((bg) => (
            <div
              key={bg.name}
              className={`flex flex-col gap-3 rounded-lg border p-2 cursor-pointer ${
                bg.isAdult && !telegramUser?.isSubscribed ? 'opacity-50 cursor-not-allowed' : 'border-[#445c3d] hover:bg-[#2e3a2b]'
              }`}
              onClick={() => !bg.isAdult || telegramUser?.isSubscribed ? handleBackgroundSelect(bg) : null}
            >
              <img
                src={bg.image}
                alt={bg.name}
                className="w-32 h-32 object-cover rounded-xl"
                onError={(e) => {
                  console.error(`Failed to load image: ${bg.image}`);
                  e.target.src = '/images/fallback-image.jpg';
                }}
              />
              <p className="text-white text-base font-medium">{bg.name}</p>
              {bg.isAdult && (
                <span className="absolute top-2 right-2 text-red-500 text-xs font-bold">18+</span>
              )}
            </div>
          ))}
        </div>
      </div>
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

export default BackgroundSelect;