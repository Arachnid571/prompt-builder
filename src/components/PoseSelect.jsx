import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrompt } from '../App';

const PoseSelect = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const {
    selectedAnime,
    selectedCharacter,
    selectedCostume,
    selectedPose,
    setSelectedPose,
    selectedEmotions,
    setSelectedEmotions,
    selectedNsfw,
    setSelectedNsfw,
    telegramUser,
    activeTab,
    setActiveTab,
  } = usePrompt();

  const [showModal, setShowModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkSubscription = async (userId) => {
    try {
      const response = await fetch(`/api/subscription/${userId}`);
      if (!response.ok) throw new Error('Ошибка сервера');
      const data = await response.json();
      return data.isSubscribed || false;
    } catch (error) {
      console.error('Ошибка проверки подписки:', error);
      return telegramUser?.isSubscribed || false;
    }
  };

  const poses = [
    { name: 'Standing', image: '/images/poses/standing.jpg', isAdult: false },
    { name: 'Sitting', image: '/images/poses/sitting.jpg', isAdult: false },
    { name: 'Running', image: '/images/poses/running.jpg', isAdult: false },
    { name: 'Jumping', image: '/images/poses/jump.jpg', isAdult: false },
    { name: 'Fighting', image: '/images/poses/fight.jpg', isAdult: false },
    { name: 'Dancing', image: '/images/poses/dance.jpg', isAdult: false },
    { name: 'Lying on Bed', image: '/images/poses/lying.jpg', isAdult: false },
    { name: 'Lying on Stomach', image: '/images/poses/stomach.jpg', isAdult: false },
    { name: 'Kneeling', image: '/images/poses/kneeling.jpg', isAdult: false },
    { name: 'Stretching', image: '/images/poses/stretch.jpg', isAdult: false },
    { name: 'Confident Pose', image: '/images/poses/confi.jpg', isAdult: false },
    { name: 'Squatting', image: '/images/poses/squatting.jpg', isAdult: false },
    { name: 'Sitting on Floor', image: '/images/poses/floor.jpg', isAdult: false },
    { name: 'Relaxed Pose', image: '/images/poses/relax.jpg', isAdult: false },
    { name: 'Leaning Forward', image: '/images/poses/forward.jpg', isAdult: false },
    { name: 'Lying on Side', image: '/images/poses/side.jpg', isAdult: false },
    { name: 'Lying on Back', image: '/images/poses/back.jpg', isAdult: false },
    { name: 'On All Fours', image: '/images/poses/fours.jpg', isAdult: false },
    { name: 'Full Nelson', image: '/images/poses/nelson.jpg', isAdult: true },
    { name: 'jack-o challenge', image: '/images/poses/jack.jpg', isAdult: true },
  ];

  const emotions = [
    { name: 'Happy', image: '/images/emotions/happy.jpg', isAdult: false },
    { name: 'Sad', image: '/images/emotions/sad.jpg', isAdult: false },
    { name: 'Angry', image: '/images/emotions/angry.jpg', isAdult: false },
    { name: 'Shy', image: '/images/emotions/shy.jpg', isAdult: false },
    { name: 'Excited', image: '/images/emotions/excited.jpg', isAdult: false },
    { name: 'squatting', image: '/images/emotions/squinting.jpg', isAdult: false },
    { name: 'Ahegao', image: '/images/emotions/ahegao.jpg', isAdult: true },
    { name: 'Crying', image: '/images/emotions/cry.jpg', isAdult: false },
    { name: 'Fear', image: '/images/emotions/fear.jpg', isAdult: false },
    { name: 'Tears', image: '/images/emotions/tears.jpg', isAdult: false },
    { name: 'Screaming', image: '/images/emotions/scream.jpg', isAdult: false },
    { name: 'Saliva', image: '/images/emotions/saliva.jpg', isAdult: false },
    { name: 'Surprised', image: '/images/emotions/surprised.jpg', isAdult: false },
    { name: 'Blushing', image: '/images/emotions/blush.jpg', isAdult: false },
    { name: 'Tongue Out', image: '/images/emotions/tongue.jpg', isAdult: false },
    { name: 'Smug', image: '/images/emotions/smug.jpg', isAdult: false },
    { name: 'Embarrassed', image: '/images/emotions/embarrassed.jpg', isAdult: false },
    { name: 'Horny', image: '/images/emotions/horny.jpg', isAdult: false },
    { name: 'Shaking', image: '/images/emotions/shaking.jpg', isAdult: false },
  ];

  const nsfw = [
    'Cum', 'Bondage', 'spread pussy', 'spread ass', 'Sex', 'butt plug', 'gag', 'Huge boobs', 'Large boobs', 'Small boobs', 'boobs', 'Big Butt', 'Huge Butt', 'Butt', 'Blood', 'Vagina', 'puffy Vagina', 'Anal Sex', 'Blowjob', 'Masturbation',
    'Orgasm', 'Slut', 'Fisting', 'Fingering', 'Penis', 'Small Penis', 'Large Penis', 'Huge Penis', 'Gangbang', 'Clitoris', 'puffy Clitoris', 'BDSM', 'Squirt', 'strong squirt', 'Tentacles', 'Torture', 'Bukkake',
    'Defloration', 'Dildo', 'Vibrator', 'Dominatrix', 'Anus', 'pee', 'Urine', 'Piss', 'Whore', 'Cunnilingus', 'strong nipples', ' Nipples', 'Rimming', 'Rimjob', 'Slave', 'Titjob', 'Nipple Sucking', 'Nipple Licking', 'Handjob', 'Squirting', 'Lactation',
    'Lesbian', 'Strapon', 'Topless', 'Missionary', 'Peeing', 'Mating', 'Footjob', 'Wet Body', 'Oiled Body', 'Hard Nipples', 'puffy nipples', 'Tan Lines', 'Bucket of Cum', 'Bouncing Breasts', 'Jiggling Breasts', 'Bounce Lines', 'Exposed Breasts', 'Doggy Style', 'Belly Bulge from Penetration', 'Penis-Shaped Belly Bulge',
    'Shackles', 'Sex Machine', 'laps up cum from a dog bowl', 'boobs grab', 'mating'
  ].map(tag => ({ name: tag, isAdult: true }));

  const normalizedAnime = anime?.toLowerCase().replace(/\s+/g, '');

  const handleToggle = async (name, type, isAdult) => {
    if (isAdult && telegramUser) {
      setIsChecking(true);
      const isSubscribed = await checkSubscription(telegramUser.id);
      setIsChecking(false);
      if (!isSubscribed) {
        setShowModal(true);
        return;
      }
    }
    if (type === 'poses') {
      console.log(`Pose selected: ${name}, switching to emotions tab`);
      setSelectedPose({ name, isAdult });
      setActiveTab('emotions');
    } else if (type === 'emotions') {
      setSelectedEmotions(prev =>
        prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
      );
    } else if (type === 'nsfw') {
      setSelectedNsfw(prev =>
        prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
      );
    }
  };

  const handleNext = () => {
    if (!selectedCharacter) {
      alert('Please select a character first.');
      return;
    }
    navigate(`/backgrounds/${normalizedAnime}`);
  };

  const handleSkip = () => {
    if (!selectedCharacter) {
      alert('Please select a character first.');
      return;
    }
    navigate(`/backgrounds/${normalizedAnime}`);
  };

  if (!telegramUser) {
    return (
      <div className="min-h-screen bg-[#171f14] flex items-center justify-center">
        <p className="text-white text-lg">Please open this app in Telegram..</p>
      </div>
    );
  }

  if (!selectedAnime || selectedAnime.name.toLowerCase().replace(/\s+/g, '') !== normalizedAnime) {
    navigate('/');
    return null;
  }

  const renderItems = (items, type) =>
    items.map((item, index) => (
      <div
        key={index}
        className={`flex flex-col gap-3 rounded-lg border p-2 cursor-pointer relative ${
          (type === 'poses' && selectedPose?.name === item.name) ||
          (type === 'emotions' && selectedEmotions.includes(item.name))
            ? 'border-[#445d3e] bg-[#2e3a2b]'
            : 'border-[#445c3d]'
        } ${item.isAdult && !telegramUser?.isSubscribed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2e3a2b]'}`}
        onClick={() => !isChecking && handleToggle(item.name, type, item.isAdult)}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-cover rounded-xl"
          onError={(e) => {
            console.error(`Ошибка загрузки изображения: ${item.image}`);
            e.target.src = '/images/fallback-image.jpg';
          }}
        />
        <p className="text-white text-base font-medium">{item.name}</p>
        {item.isAdult && (
          <span className="absolute top-2 right-2 text-red-500 text-xs font-bold">18+</span>
        )}
      </div>
    ));

  const renderNsfwTags = (tags) =>
    tags.map((tag, index) => (
      <div
        key={index}
        className={`inline-block m-1 px-3 py-1 rounded-full text-white text-sm font-medium cursor-pointer relative ${
          selectedNsfw.includes(tag.name) ? 'bg-[#445d3e] border-[#556b4e]' : 'bg-[#222e1f] border-[#445c3d]'
        } ${tag.isAdult && !telegramUser?.isSubscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !isChecking && handleToggle(tag.name, 'nsfw', tag.isAdult)}
      >
        {tag.name}
        {tag.isAdult && (
          <span className="absolute top-0 right-0 text-red-500 text-xs font-bold">18+</span>
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
            onClick={() => navigate(`/costumes/${normalizedAnime}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,0,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 pr-12 text-center">
            Choose poses, emotions, NSFW
          </h2>
        </div>
        <div className="flex border-b border-[#2f402b] mb-4">
          <button
            className={`flex-1 py-2 text-center text-white font-bold ${
              activeTab === 'poses' ? 'border-b-2 border-[#445d3e]' : ''
            }`}
            onClick={() => setActiveTab('poses')}
          >
            Pose
          </button>
          <button
            className={`flex-1 py-2 text-center text-white font-bold ${
              activeTab === 'emotions' ? 'border-b-2 border-[#445d3e]' : ''
            }`}
            onClick={() => setActiveTab('emotions')}
          >
            emotions
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
                  window.open('https://t.me/AniGenerator_bot?', '_blank');
                }}
              >
                Subscribe now
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-center p-4 gap-4">
          <button
            onClick={handleNext}
            className="w-full max-w-md p-2 rounded text-white bg-[#445d3e] hover:bg-[#556b4e]"
          >
            Next
          </button>
        </div>
        <div className="flex justify-center pb-4">
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

export default PoseSelect;