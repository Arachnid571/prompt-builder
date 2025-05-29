import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const PromptForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { anime } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const characters = queryParams.get('characters')?.split(',').filter(Boolean) || [];
  const costumes = queryParams.get('costumes')?.split(',').filter(Boolean) || [];
  const poses = queryParams.get('poses')?.split(',').filter(Boolean) || [];
  const emotions = queryParams.get('emotions')?.split(',').filter(Boolean) || [];
  const nsfw = queryParams.get('nsfw')?.split(',').filter(Boolean) || [];
  const backgrounds = queryParams.get('backgrounds')?.split(',').filter(Boolean) || [];
  const incomingPrompts = queryParams.get('prompts')?.split(',').filter(Boolean) || [];
  const [style, setStyle] = useState('');
  const [details, setDetails] = useState('');
  const [isNsfwRestricted, setIsNsfwRestricted] = useState(false);
  const isSubscribed = false; // Замените на реальную проверку подписки

  console.log('PromptForm Params:', { anime, characters, costumes, poses, emotions, nsfw, backgrounds, incomingPrompts, style, details });

  // Проверка обязательных параметров
  if (!anime) {
    console.log('Redirecting to / due to missing anime');
    navigate('/');
    return null;
  }

  // Проверка NSFW-тегов на наличие подписки
  const hasNsfwContent = nsfw.length > 0;
  const isNsfwAllowed = isSubscribed || !hasNsfwContent;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNsfwAllowed) {
      setIsNsfwRestricted(true);
      return;
    }
    const prompt = [
      characters.length > 0 ? `${characters.join(', ')} from ${anime}` : '',
      costumes.length > 0 ? `wearing ${costumes.join(', ')}` : '',
      poses.length > 0 ? `${poses.join(', ')}` : '',
      emotions.length > 0 ? `${emotions.join(', ')}` : '',
      nsfw.length > 0 ? `${nsfw.join(', ')}` : '',
      backgrounds.length > 0 ? `in ${backgrounds.join(', ')}` : '',
      ...incomingPrompts,
      style ? `${style}` : '',
      details ? `${details}` : '',
    ].filter(Boolean).join(', ');
    console.log('Generated Prompt:', prompt);
    // TODO: Добавить вызов API или переход на страницу результата
    // Например: navigate('/result', { state: { prompt } });
  };

  const fullPrompt = [
    characters.length > 0 ? `${characters.join(', ')} from ${anime}` : '',
    costumes.length > 0 ? `wearing ${costumes.join(', ')}` : '',
    poses.length > 0 ? `${poses.join(', ')}` : '',
    emotions.length > 0 ? `${emotions.join(', ')}` : '',
    nsfw.length > 0 ? `${nsfw.join(', ')}` : '',
    backgrounds.length > 0 ? `in ${backgrounds.join(', ')}` : '',
    ...incomingPrompts,
    style ? `${style}` : '',
    details ? `${details}` : '',
  ].filter(Boolean).join(', ');

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#171f14] dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-between w-full max-w-md mb-6">
          <div
            className="text-white flex size-12 shrink-0 items-center cursor-pointer"
            onClick={() => {
              const url = `/backgrounds/${anime}?characters=${encodeURIComponent(
                characters.join(',')
              )}&costumes=${encodeURIComponent(
                costumes.join(',')
              )}&poses=${encodeURIComponent(
                poses.join(',')
              )}&emotions=${encodeURIComponent(
                emotions.join(',')
              )}&nsfw=${encodeURIComponent(
                nsfw.join(',')
              )}&backgrounds=${encodeURIComponent(
                backgrounds.join(',')
              )}&prompts=${encodeURIComponent(incomingPrompts.join(','))}`;
              console.log('Navigating back to:', url);
              navigate(url);
            }}
            data-icon="ArrowLeft"
            data-size="24px"
            data-weight="regular"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Create a Prompt
          </h2>
          <div className="size-12"></div>
        </div>
        <div className="bg-[#222e1f] p-6 rounded-lg w-full max-w-md">
          <h3 className="text-white text-lg font-bold mb-4">Selected Prompt:</h3>
          <p className="text-white mb-6">{fullPrompt || 'No prompt generated yet'}</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Style (e.g., realistic, anime)"
              className="w-full p-2 rounded bg-[#2e3a2b] text-white border border-[#445c3d]"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
            <textarea
              placeholder="Additional details"
              className="w-full p-2 rounded bg-[#2e3a2b] text-white border border-[#445c3d] h-24"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={!isNsfwAllowed && hasNsfwContent}
              className={`w-full p-2 rounded text-white ${
                !isNsfwAllowed && hasNsfwContent
                  ? 'bg-[#2e3a2b] cursor-not-allowed'
                  : 'bg-[#445d3e] hover:bg-[#556b4e]'
              }`}
            >
              Generate
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(fullPrompt)}
              disabled={!fullPrompt}
              className={`w-full p-2 rounded text-white ${
                !fullPrompt ? 'bg-[#2e3a2b] cursor-not-allowed' : 'bg-[#445d3e] hover:bg-[#556b4e]'
              }`}
            >
              Copy Prompt
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 border-t border-[#2f402b] bg-[#222e1f] px-4 py-3">
        {[
          { icon: 'House', href: '/', active: true },
          { icon: 'MagnifyingGlass', href: '#', active: false },
          { icon: 'FilmSlate', href: '#', active: false },
          { icon: 'User', href: '#', active: false },
        ].map((nav, index) => (
          <a
            key={index}
            className={`flex flex-1 flex-col items-center justify-end gap-1 ${
              nav.active ? 'text-white' : 'text-[#a4be9d]'
            }`}
            href={nav.href}
          >
            <div
              className={`flex h-8 items-center justify-center ${nav.active ? 'text-white' : 'text-[#a4be9d]'}`}
              data-icon={nav.icon}
              data-size="24px"
            >
              {nav.icon === 'House' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                </svg>
              )}
              {nav.icon === 'MagnifyingGlass' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              )}
              {nav.icon === 'FilmSlate' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM136.44,54.72,164.57,71l-58.90,15.55L77.55,70.27ZM208,200H48V120H208v80Z"></path>
                </svg>
              )}
              {nav.icon === 'User' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="h-5 bg-[#222e1f]"></div>
      {isNsfwRestricted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#222e1f] p-6 rounded-lg max-w-md text-white">
            <h3 className="text-lg font-bold mb-4">18+ Content</h3>
            <p className="mb-4">NSFW content is restricted to users with an active subscription.</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-[#445d3e] rounded hover:bg-[#556b4e]"
                onClick={() => setIsNsfwRestricted(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptForm;