import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrompt } from '../App';

const PromptForm = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const {
    selectedAnime,
    selectedCharacter,
    selectedCostume,
    selectedPose,
    selectedBackground,
    prompt,
    generatePrompt,
    sendToBot,
    isSending,
    telegramUser,
    resetSelections,
  } = usePrompt();

  const normalizedAnime = anime?.toLowerCase().replace(/\s+/g, '');

  useEffect(() => {
    if (!selectedAnime || selectedAnime.name.toLowerCase().replace(/\s+/g, '') !== normalizedAnime) {
      navigate('/');
    } else {
      generatePrompt(); // Генерируем промпт при загрузке
    }
  }, [selectedAnime, normalizedAnime, generatePrompt, navigate]);

  const handleReset = () => {
    resetSelections();
    navigate('/');
  };

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      alert('Prompt copied to clipboard!');
    }
  };

  if (!telegramUser) {
    return (
      <div className="min-h-screen bg-[#171f14] flex items-center justify-center">
        <p className="text-white text-lg">Please open this app in Telegram.</p>
      </div>
    );
  }

  const hasNsfw = selectedCostume?.isAdult || selectedPose?.isAdult || selectedCharacter?.isAdult || selectedBackground?.isAdult;
  const isNsfwAllowed = telegramUser?.isSubscribed || !hasNsfw;

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#171f14] dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-between w-full max-w-md mb-6">
          <div
            className="text-white flex size-12 shrink-0 items-center cursor-pointer"
            onClick={() => navigate(`/backgrounds/${normalizedAnime}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Generated Prompt
          </h2>
          <div className="size-12"></div>
        </div>
        <div className="bg-[#222e1f] p-6 rounded-lg w-full max-w-md">
          <h3 className="text-white text-lg font-bold mb-4">Your Prompt:</h3>
          <p className="text-white mb-6">{prompt || 'No prompt generated yet'}</p>
          <div className="space-y-4">
            <button
              onClick={sendToBot}
              disabled={isSending || !prompt || (!isNsfwAllowed && hasNsfw)}
              className={`w-full p-2 rounded text-white ${
                isSending || !prompt || (!isNsfwAllowed && hasNsfw)
                  ? 'bg-[#2e3a2b] cursor-not-allowed'
                  : 'bg-[#445d3e] hover:bg-[#556b4e]'
              }`}
            >
              {isSending ? 'Sending...' : 'Send to Bot'}
            </button>
            <button
              onClick={handleCopy}
              disabled={!prompt}
              className={`w-full p-2 rounded text-white ${
                !prompt ? 'bg-[#2e3a2b] cursor-not-allowed' : 'bg-[#445d3e] hover:bg-[#556b4e]'
              }`}
            >
              Copy Prompt
            </button>
            <button
              onClick={handleReset}
              className="w-full p-2 rounded text-white bg-[#445d3e] hover:bg-[#556b4e]"
            >
              Start Over
            </button>
          </div>
        </div>
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
  );
};

export default PromptForm;