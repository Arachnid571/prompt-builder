import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


const CharacterSelect = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const incomingPrompts = queryParams.get('prompts')?.split(',').filter(Boolean) || [];
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const isSubscribed = false;

  console.log('CharacterSelect Params:', { anime, selectedCharacters, incomingPrompts });

  const charactersByAnime = {
    naruto: [
      { name: 'Sakura Haruno', image: '/images/characters/sakura.jpg' },
      { name: 'Hyuuga Hinata', image: '/images/characters/hinata.jpg' },
      { name: 'Tsunade', image: '/images/characters/tsunade.jpg', isAdult: false },
      { name: 'Yamanaka Ino', image: '/images/characters/ino.jpg', isAdult: false },
      { name: 'Nara Temari', image: '/images/characters/tamari.jpg', isAdult: false },
      { name: 'Konan (Naruto)', image: '/images/characters/Konan.jpg', isAdult: false },
    ],
    bleach: [
      { name: 'Rukia Kuchiki', image: '/images/characters/Rukia.jpg', isAdult: false },
      { name: 'Orihime Inoue', image: '/images/characters/Orihime.jpg', isAdult: false },
      { name: 'Rangiku Matsumoto', image: '/images/characters/Rangiku.jpg', isAdult: false },
      { name: 'Yoruichi Shihouin', image: '/images/characters/Yoruichi.jpg', isAdult: false },
    ],
    onepiece: [
      { name: 'Boa Hancock', image: '/images/characters/Boa.jpg', isAdult: false },
      { name: 'Nami (one Piece)', image: '/images/characters/nami.jpg', isAdult: false },
      { name: 'Nico Robin', image: '/images/characters/nico.jpg', isAdult: false },
    ],
    fairytail: [
      { name: 'Erza Scarlet', image: '/images/characters/Erza.jpg', isAdult: false },
      { name: 'Lucy Heartfilia', image: '/images/characters/lucy.jpg', isAdult: false },
      { name: 'Juvia Lockser', image: '/images/characters/juvia.jpg', isAdult: false },
      { name: 'Mirajane Strauss', image: '/images/characters/mirajane.jpg', isAdult: false },
    ],
    genshin: [
      { name: 'Barbara Pegg', image: '/images/characters/pegg.jpg', isAdult: false },
      { name: 'Ningguang', image: '/images/characters/ning.jpg', isAdult: false },
      { name: 'Beidou', image: '/images/characters/Beidou.jpg', isAdult: false },
      { name: 'Ganyu', image: '/images/characters/Ganyu.jpg', isAdult: false },
      { name: 'Jean Gunnhildr', image: '/images/characters/jean.jpg', isAdult: false },
      { name: 'Dehya', image: '/images/characters/Dehya.jpg', isAdult: false },
      { name: 'Yehlan', image: '/images/characters/yelan.jpg', isAdult: false },
      { name: 'Keqing', image: '/images/characters/keqing.jpg', isAdult: false },
      { name: 'Candace', image: '/images/characters/candace.jpg', isAdult: false },
      { name: 'Lisa Minci', image: '/images/characters/lisa.jpg', isAdult: false },
      { name: 'Rozaria', image: '/images/characters/rozaria.jpg', isAdult: false },
      { name: 'Shenhe', image: '/images/characters/shenhe.jpg', isAdult: false },
      { name: 'Yae Miko', image: '/images/characters/yae.jpg', isAdult: false },
      { name: 'Raiden', image: '/images/characters/raiden.jpg', isAdult: false },
      { name: 'Xinyan', image: '/images/characters/xin.jpg', isAdult: false },
      { name: 'Furina', image: '/images/characters/furina.jpg', isAdult: false },
      { name: 'Hu Tao', image: '/images/characters/hu.jpg', isAdult: false },
    ],
    other: [
      { name: 'Rem (Re:Zero)', image: '/images/characters/rem.jpg', isAdult: false },
      { name: 'Mikasa Ackerman', image: '/images/characters/mikasa.jpg', isAdult: false },
      { name: 'Power (Chainsaw Man)', image: '/images/characters/power.jpg', isAdult: false },
      { name: 'Zero Two (Darling in the Franxx)', image: '/images/characters/zero.jpg', isAdult: false },
      { name: 'Frieren', image: '/images/characters/frieren.jpg', isAdult: false },
      { name: 'Fern from Frieren: Beyond Journey End', image: '/images/characters/fern.jpg', isAdult: false },
      { name: 'Saber', image: '/images/characters/saber.jpg', isAdult: false },
      { name: 'Asuna (SAO)', image: '/images/characters/asuna.jpg', isAdult: false },
      { name: 'Zelda', image: '/images/characters/zelda.jpg', isAdult: false },
      { name: 'Yor Briar', image: '/images/characters/yor.jpg', isAdult: false },
      { name: 'Nezuko Kamado', image: '/images/characters/nezuko.jpg', isAdult: false },
      { name: 'Sailor Moon', image: '/images/characters/sailor.jpg', isAdult: false },
      { name: 'Yuri (Doki Doki Literature club)', image: '/images/characters/yuri.jpg', isAdult: false },
      { name: 'Miku', image: '/images/characters/miku.jpg', isAdult: false },
      { name: 'Lala Satalin Deviluke', image: '/images/characters/lala.jpg', isAdult: false },
      { name: 'Nagatoru Hayase', image: '/images/characters/nagatoro.jpg', isAdult: false },
      { name: 'Bulma', image: '/images/characters/bulma.jpg', isAdult: false },
      { name: 'Inui Sajuna', image: '/images/characters/inui.jpg', isAdult: false },
      { name: 'Mitsuri Kanroji', image: '/images/characters/mits.jpg', isAdult: false },
      { name: 'Darkness (Konosuba)', image: '/images/characters/dark.jpg', isAdult: false },
      { name: 'Aqua (Konosuba)', image: '/images/characters/aqua.jpg', isAdult: false },
      { name: 'Esdeath from Akame ga Kill!', image: '/images/characters/ezd.jpg', isAdult: false },
      { name: 'Tatsumaki', image: '/images/characters/tatsumaki.jpg', isAdult: false },
      { name: 'Soraka', image: '/images/characters/soraka.jpg', isAdult: false },
      { name: '2B (nier:automata)', image: '/images/characters/2b.jpg', isAdult: false },
      { name: 'ChunLi', image: '/images/characters/chunli.jpg', isAdult: false },
      { name: 'Ayanami Rei', image: '/images/characters/rei.jpg', isAdult: false },
      { name: 'Sona from League of Legend', image: '/images/characters/sona.jpg', isAdult: false },
      { name: 'Nidalee from League of Legend', image: '/images/characters/nidalee.jpg', isAdult: false },
      { name: 'Ahri (League of Legend)', image: '/images/characters/ahri.jpg', isAdult: false },
      { name: 'Erina Nakiri', image: '/images/characters/erina.jpg', isAdult: false },
      { name: 'Eris Greyrat', image: '/images/characters/eris.jpg', isAdult: false },
      { name: 'Nonna from (Girls and panzer)', image: '/images/characters/nona.jpg', isAdult: false },
      { name: 'Jinx', image: '/images/characters/jinx.jpg', isAdult: false },
      { name: 'Albedo (overlord)', image: '/images/characters/albedo.jpg', isAdult: false },
      { name: 'Rin Tohsaka', image: '/images/characters/rin.jpg', isAdult: false },
    ],
    general: [
      { name: 'Girl', image: '/images/characters/girl.jpg', isAdult: false },
      { name: 'Women', image: '/images/characters/women.jpg', isAdult: false },
      { name: 'MILF', image: '/images/characters/milf.jpg', isAdult: true },
      { name: 'Demon', image: '/images/characters/demon.jpg', isAdult: false },
      { name: 'Monster', image: '/images/characters/monster.jpg', isAdult: false },
      { name: 'Goblin', image: '/images/characters/goblin.jpg', isAdult: false },
      { name: 'Orc', image: '/images/characters/orc.jpg', isAdult: false },
      { name: 'Elf', image: '/images/characters/elf.jpg', isAdult: false },
      { name: 'Boy', image: '/images/characters/boy.jpg', isAdult: false },
      { name: 'Catgirl', image: '/images/characters/catgirl.jpg', isAdult: false },
      { name: 'Man', image: '/images/characters/man.jpg', isAdult: false },
      { name: 'Werewolf', image: '/images/characters/werewolf.jpg', isAdult: false },
      { name: 'Minotaur', image: '/images/characters/minotaur.jpg', isAdult: false },
      { name: 'Mom', image: '/images/characters/mom.jpg', isAdult: true },
      { name: 'Son', image: '/images/characters/son.jpg', isAdult: true },
      { name: 'Succubus', image: '/images/characters/succubus.jpg', isAdult: true },
      { name: 'Tentacles', image: '/images/characters/tentacles.jpg', isAdult: true },
      { name: 'Tomboy', image: '/images/characters/tomboy.jpg', isAdult: true },
      { name: 'Futanari', image: '/images/characters/futa.jpg', isAdult: true },
      { name: '2girls,girls', image: '/images/characters/girls.jpg', isAdult: false },
    ],
  };

  const characters = charactersByAnime[anime] || [];

  const handleCharacterToggle = (characterName, isAdult) => {
    if (isAdult && !isSubscribed) {
      setShowSubscriptionModal(true);
      return;
    }
    setSelectedCharacters((prev) =>
      prev.includes(characterName)
        ? prev.filter((name) => name !== characterName)
        : [...prev, characterName]
    );
  };

  const handleNext = () => {
    if (selectedCharacters.length === 0 && !customPrompt.trim()) {
      console.log('No characters or prompt selected');
      return;
    }
    const prompts = [...incomingPrompts, customPrompt].filter(Boolean);
    const url = `/costumes/${anime}?characters=${encodeURIComponent(
      selectedCharacters.join(',')
    )}&prompts=${encodeURIComponent(prompts.join(','))}`;
    console.log('Navigating to:', url);
    navigate(url);
  };

  const handleSavePrompt = () => {
    console.log('Saving prompt:', customPrompt);
    setShowPromptModal(false);
  };

  if (!anime) {
    console.log('Redirecting to /: Missing anime param');
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
            onClick={() => navigate('/')}
            data-icon="ArrowLeft"
            data-size="24px"
            data-weight="regular"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Select Characters
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {characters.length > 0 ? (
            characters.map((character, index) => (
              <div
                key={index}
                className={`flex flex-1 gap-3 rounded-lg border p-4 items-center cursor-pointer relative ${
                  selectedCharacters.includes(character.name)
                    ? 'border-[#445d3e] bg-[#2e3a2b]'
                    : 'border-[#445c3d] bg-[#222e1f]'
                } ${character.isAdult && !isSubscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleCharacterToggle(character.name, character.isAdult)}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-16 h-16 object-cover rounded-lg"                   
                />
                <h2 className="text-white text-base font-bold leading-tight">{character.name}</h2>
                {character.isAdult && (
                  <span className="absolute top-2 right-2 text-red-500 text-xs font-bold flex items-center">
                    18+
                    {!isSubscribed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="ml-1"
                      >
                        <path d="M192,136v24a8,8,0,0,1-8,8H72a8,8,0,0,1-8-8V136a8,8,0,0,1,16,0v16H176V136a8,8,0,0,1,16,0Zm24-88V208a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Zm-16,0H56V208H200Z"></path>
                      </svg>
                    )}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="text-white text-center col-span-full">No characters available for this anime.</div>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-center p-4 gap-4">
          <button
            onClick={() => setShowPromptModal(true)}
            className="w-full max-w-md p-2 rounded text-white bg-[#445d3e] hover:bg-[#556b4e]"
          >
            Add Custom Prompt
          </button>
          <button
            onClick={handleNext}
            disabled={selectedCharacters.length === 0 && !customPrompt.trim()}
            className={`w-full max-w-md p-2 rounded text-white ${
              selectedCharacters.length === 0 && !customPrompt.trim()
                ? 'bg-[#2e3a2b] cursor-not-allowed'
                : 'bg-[#445d3e] hover:bg-[#556b4e]'
            }`}
          >
            Next
          </button>
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
      </div>
      {showPromptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#222e1f] p-6 rounded-lg max-w-md text-white">
            <h3 className="text-lg font-bold mb-4">Add Custom Prompt</h3>
            <textarea
              className="w-full p-2 mb-4 bg-[#2e3a2b] text-white rounded border border-[#445c3d]"
              rows="4"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your prompt..."
            />
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-[#445d3e] rounded hover:bg-[#556b4e]"
                onClick={handleSavePrompt}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-[#2e3a2b] rounded hover:bg-[#3a4a36]"
                onClick={() => setShowPromptModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#222e1f] p-6 rounded-lg max-w-md text-white">
            <h3 className="text-lg font-bold mb-4">18+ Content</h3>
            <p className="mb-4">This content is restricted to users with an active subscription.</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-[#445d3e] rounded hover:bg-[#556b4e]"
                onClick={() => setShowSubscriptionModal(false)}
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

export default CharacterSelect;