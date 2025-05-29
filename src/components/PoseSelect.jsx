import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import standingImage from '../assets/images/pose/standing.jpg';
import sittingImage from '../assets/images/pose/sitting.jpg';
import runningImage from '../assets/images/pose/running.jpg';
import jumpImage from '../assets/images/pose/jump.jpg';
import fightImage from '../assets/images/pose/fight.jpg';
import dancingImage from '../assets/images/pose/dance.jpg';
import lyingImage from '../assets/images/pose/lying.jpg';
import stomachImage from '../assets/images/pose/stomach.jpg';
import kneelingImage from '../assets/images/pose/kneeling.jpg';
import stretchImage from '../assets/images/pose/stretch.jpg';
import confiImage from '../assets/images/pose/confi.jpg';
import squattingImage from '../assets/images/pose/squatting.jpg';
import floorImage from '../assets/images/pose/floor.jpg';
import relaxImage from '../assets/images/pose/relax.jpg';
import forwardImage from '../assets/images/pose/forward.jpg';
import sideImage from '../assets/images/pose/side.jpg';
import backImage from '../assets/images/pose/back.jpg';
import foursImage from '../assets/images/pose/fours.jpg';
import nelsonImage from '../assets/images/pose/nelson.jpg';
import happyImage from '../assets/images/emotions/happy.jpg';
import sadImage from '../assets/images/emotions/sad.jpg';
import angryImage from '../assets/images/emotions/angry.jpg';
import shyImage from '../assets/images/emotions/shy.jpg';
import excitedImage from '../assets/images/emotions/excited.jpg';
import ahegaoImage from '../assets/images/emotions/ahegao.jpg';
import cryImage from '../assets/images/emotions/cry.jpg';
import fearImage from '../assets/images/emotions/fear.jpg';
import tearsImage from '../assets/images/emotions/tears.jpg';
import screamImage from '../assets/images/emotions/scream.jpg';
import salivaImage from '../assets/images/emotions/saliva.jpg';
import squintingImage from '../assets/images/emotions/squinting.jpg';
import surprisedImage from '../assets/images/emotions/surprised.jpg';
import blushImage from '../assets/images/emotions/blush.jpg';
import tongueImage from '../assets/images/emotions/tongue.jpg';
import smugImage from '../assets/images/emotions/smug.jpg';
import embarrassedImage from '../assets/images/emotions/embarrassed.jpg';

const PoseSelect = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const characters = queryParams.get('characters')?.split(',').filter(Boolean) || [];
  const costumes = queryParams.get('costumes')?.split(',').filter(Boolean) || [];
  const incomingPrompts = queryParams.get('prompts')?.split(',').filter(Boolean) || [];
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedNsfw, setSelectedNsfw] = useState([]);
  const [activeTab, setActiveTab] = useState('poses');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const isSubscribed = false; // Замените на реальную проверку подписки

  console.log('PoseSelect Params:', { anime, characters, costumes, incomingPrompts, selectedPoses, selectedEmotions, selectedNsfw });

  const poses = [
    { name: 'Standing', image: standingImage, isAdult: false },
    { name: 'Sitting', image: sittingImage, isAdult: false },
    { name: 'Running', image: runningImage, isAdult: false },
    { name: 'Jumping', image: jumpImage, isAdult: false },
    { name: 'Fighting', image: fightImage, isAdult: false },
    { name: 'Dancing', image: dancingImage, isAdult: false },
    { name: 'Lying on Bed', image: lyingImage, isAdult: false },
    { name: 'Lying on Stomach', image: stomachImage, isAdult: false },
    { name: 'Kneeling', image: kneelingImage, isAdult: false },
    { name: 'Stretching', image: stretchImage, isAdult: false },
    { name: 'Confident Pose', image: confiImage, isAdult: false },
    { name: 'Squatting', image: squattingImage, isAdult: false },
    { name: 'Sitting on Floor', image: floorImage, isAdult: false },
    { name: 'Relaxed Pose', image: relaxImage, isAdult: false },
    { name: 'Leaning Forward', image: forwardImage, isAdult: false },
    { name: 'Lying on Side', image: sideImage, isAdult: false },
    { name: 'Lying on Back', image: backImage, isAdult: false },
    { name: 'On All Fours', image: foursImage, isAdult: true },
    { name: 'Full Nelson', image: nelsonImage, isAdult: true },
  ];

  const emotions = [
    { name: 'Happy', image: happyImage, isAdult: false },
    { name: 'Sad', image: sadImage, isAdult: false },
    { name: 'Angry', image: angryImage, isAdult: false },
    { name: 'Shy', image: shyImage, isAdult: false },
    { name: 'Excited', image: excitedImage, isAdult: false },
    { name: 'Squinting', image: squintingImage, isAdult: false },
    { name: 'Ahegao', image: ahegaoImage, isAdult: true },
    { name: 'Crying', image: cryImage, isAdult: false },
    { name: 'Fearful', image: fearImage, isAdult: false },
    { name: 'Tears', image: tearsImage, isAdult: false },
    { name: 'Screaming', image: screamImage, isAdult: false },
    { name: 'Saliva', image: salivaImage, isAdult: true },
    { name: 'Surprised', image: surprisedImage, isAdult: false },
    { name: 'Blushing', image: blushImage, isAdult: false },
    { name: 'Tongue Out', image: tongueImage, isAdult: false },
    { name: 'Smug', image: smugImage, isAdult: false },
    { name: 'Embarrassed', image: embarrassedImage, isAdult: false },
  ];

  const nsfw = [
    'Cum', 'Bondage', 'Sex', 'Huge Breasts', 'Large Breasts', 'Small Breasts', 'Breasts', 'Big Butt', 'Huge Butt', 'Butt', 'Blood', 'Vagina', 'Chubby Vagina', 'Anal Sex', 'Blowjob', 'Masturbation',
    'Orgasm', 'Slut', 'Fisting', 'Fingers', 'Penis', 'Small Penis', 'Large Penis', 'Huge Penis', 'Gangbang', 'Clitoris', 'Chubby Clitoris', 'BDSM', 'Squirt', 'Heavy Squirt', 'Tentacles', 'Torture', 'Bukkake',
    'Defloration', 'Dildo', 'Vibrator', 'Dominatrix', 'Anus', 'Urination', 'Urine', 'Piss', 'Whore', 'Cunnilingus', 'Nipples', 'Chubby Nipples', 'Rimming', 'Rimjob', 'Slave', 'Titjob', 'Nipple Sucking', 'Nipple Licking', 'Handjob', 'Squirting', 'Lactation',
    'Lesbian', 'Strapon', 'Topless', 'Missionary', 'Peeing', 'Mating', 'Footjob', 'Wet Body', 'Oiled Body', 'Hard Nipples', 'Tan Lines', 'Bucket of Cum', 'Bouncing Breasts', 'Jiggling Breasts', 'Bounce Lines', 'Exposed Breasts', 'Doggy Style', 'Belly Bulge from Penetration', 'Penis-Shaped Belly Bulge',
    'Shackles', 'Sex Machine'
  ].map(tag => ({ name: tag, isAdult: true })); // Все NSFW-теги помечены как 18+

  const handleToggle = (name, type, isAdult) => {
    if (isAdult && !isSubscribed) {
      setShowSubscriptionModal(true);
      return;
    }
    if (type === 'poses') {
      setSelectedPoses((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    } else if (type === 'emotions') {
      setSelectedEmotions((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    } else if (type === 'nsfw') {
      setSelectedNsfw((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    }
  };

  const handleNext = () => {
    if (selectedPoses.length === 0 && selectedEmotions.length === 0 && selectedNsfw.length === 0 && !customPrompt.trim() && incomingPrompts.length === 0 && characters.length === 0) {
      console.log('Cannot proceed: no poses, emotions, NSFW, prompt, characters, or incoming prompts selected');
      return;
    }
    const prompts = [...incomingPrompts, customPrompt].filter(Boolean);
    const url = `/backgrounds/${anime}?characters=${encodeURIComponent(
      characters.join(',')
    )}&costumes=${encodeURIComponent(
      costumes.join(',')
    )}&poses=${encodeURIComponent(
      selectedPoses.join(',')
    )}&emotions=${encodeURIComponent(
      selectedEmotions.join(',')
    )}&nsfw=${encodeURIComponent(
      selectedNsfw.join(',')
    )}&prompts=${encodeURIComponent(prompts.join(','))}`;
    console.log('Navigating to:', url);
    navigate(url);
  };

  const handleSkip = () => {
    if (characters.length === 0 && incomingPrompts.length === 0 && !customPrompt.trim()) {
      console.log('Cannot skip: no characters, prompts, or custom prompt provided');
      return;
    }
    const prompts = [...incomingPrompts, customPrompt].filter(Boolean);
    const url = `/backgrounds/${anime}?characters=${encodeURIComponent(
      characters.join(',')
    )}&costumes=${encodeURIComponent(
      costumes.join(',')
    )}&poses=${encodeURIComponent(
      selectedPoses.join(',')
    )}&emotions=${encodeURIComponent(
      selectedEmotions.join(',')
    )}&nsfw=${encodeURIComponent(
      selectedNsfw.join(',')
    )}&prompts=${encodeURIComponent(prompts.join(','))}`;
    console.log('Skipping to:', url);
    navigate(url);
  };

  const handleSavePrompt = () => {
    console.log('Saving prompt:', customPrompt);
    setShowPromptModal(false);
  };

  if (!anime) {
    console.log('Redirecting to / due to missing anime');
    navigate('/');
    return null;
  }

  const renderItems = (items, type) =>
    items.map((item, index) => (
      <div
        key={index}
        className={`flex flex-1 gap-3 rounded-lg border p-4 items-center cursor-pointer relative ${
          (type === 'poses' && selectedPoses.includes(item.name)) ||
          (type === 'emotions' && selectedEmotions.includes(item.name))
            ? 'border-[#445d3e] bg-[#2e3a2b]'
            : 'border-[#445c3d] bg-[#222e1f]'
        } ${item.isAdult && !isSubscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => handleToggle(item.name, type, item.isAdult)}
      >
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" loading="lazy" />
        <h2 className="text-white text-base font-bold leading-tight">{item.name}</h2>
        {item.isAdult && (
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
    ));

  const renderNsfwTags = (tags) =>
    tags.map((tag, index) => (
      <div
        key={index}
        className={`inline-block m-1 px-3 py-1 rounded-full text-white text-sm font-bold cursor-pointer relative ${
          selectedNsfw.includes(tag.name) ? 'bg-[#445d3e] border-[#556b4e]' : 'bg-[#222e1f] border-[#445c3d]'
        } ${tag.isAdult && !isSubscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => handleToggle(tag.name, 'nsfw', tag.isAdult)}
      >
        {tag.name}
        {tag.isAdult && (
          <span className="absolute top-0 right-0 text-red-500 text-xs font-bold flex items-center">
            18+
            {!isSubscribed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12px"
                height="12px"
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
    ));

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#171f14] dark justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-[#171f14] p-4 pb-2 justify-between">
          <div
            className="text-white flex size-12 shrink-0 items-center cursor-pointer"
            onClick={() => navigate(`/costumes/${anime}?characters=${encodeURIComponent(characters.join(','))}&prompts=${encodeURIComponent(incomingPrompts.join(','))}`)}
            data-icon="ArrowLeft"
            data-size="24px"
            data-weight="regular"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Select Poses, Emotions, NSFW
          </h2>
        </div>
        <div className="flex border-b border-[#2f402b] mb-4">
          <button
            className={`flex-1 py-2 text-center text-white font-bold ${
              activeTab === 'poses' ? 'border-b-2 border-[#445d3e]' : ''
            }`}
            onClick={() => setActiveTab('poses')}
          >
            Poses
          </button>
          <button
            className={`flex-1 py-2 text-center text-white font-bold ${
              activeTab === 'emotions' ? 'border-b-2 border-[#445d3e]' : ''
            }`}
            onClick={() => setActiveTab('emotions')}
          >
            Emotions
          </button>
          <button
            className={`flex-1 py-2 text-center text-white font-bold ${
              activeTab === 'nsfw' ? 'border-b-2 border-[#445d3e]' : ''
            }`}
            onClick={() => setActiveTab('nsfw')}
          >
            NSFW
          </button>
        </div>
        <div className="p-4">
          {activeTab === 'poses' && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
              {renderItems(poses, 'poses')}
            </div>
          )}
          {activeTab === 'emotions' && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
              {renderItems(emotions, 'emotions')}
            </div>
          )}
          {activeTab === 'nsfw' && (
            <div className="flex flex-wrap gap-2">
              {renderNsfwTags(nsfw)}
            </div>
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
            disabled={selectedPoses.length === 0 && selectedEmotions.length === 0 && selectedNsfw.length === 0 && !customPrompt.trim() && incomingPrompts.length === 0 && characters.length === 0}
            className={`w-full max-w-md p-2 rounded text-white ${
              selectedPoses.length === 0 && selectedEmotions.length === 0 && selectedNsfw.length === 0 && !customPrompt.trim() && incomingPrompts.length === 0 && characters.length === 0
                ? 'bg-[#2e3a2b] cursor-not-allowed'
                : 'bg-[#445d3e] hover:bg-[#556b4e]'
            }`}
          >
            Next
          </button>
        </div>
        <div className="flex justify-center pb-4">
          <button
            onClick={handleSkip}
            disabled={characters.length === 0 && incomingPrompts.length === 0 && !customPrompt.trim()}
            className={`text-[#a4be9d] text-sm hover:underline ${
              characters.length === 0 && incomingPrompts.length === 0 && !customPrompt.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Skip
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

export default PoseSelect;