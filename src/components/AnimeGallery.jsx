import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompt } from '../App';

const AnimeGallery = () => {
  const navigate = useNavigate();
  const { setSelectedAnime, resetSelections } = usePrompt();

  const animeList = [
    { name: 'General', image: '/images/anime/general.jpg' },
    { name: 'Naruto', image: '/images/anime/naruto.jpg' },
    { name: 'One Piece', image: '/images/anime/onepiece.jpg' },
    { name: 'Bleach', image: '/images/anime/bleach.jpg' },
    { name: 'Pokemon', image: '/images/anime/pokemon.jpg' },
    { name: 'Overwatch', image: '/images/anime/overwatch.jpg' },
    { name: 'Genshin', image: '/images/anime/genshin.jpg' },
    { name: 'StarRail', image: '/images/anime/star.jpg' },
    { name: 'Fairy Tail', image: '/images/anime/fairytail.jpg' },
    { name: 'Other', image: '/images/anime/other.jpg' },
  ];

  const handleSelect = (anime) => {
    resetSelections(); // Сбрасываем все выборы
    setSelectedAnime(anime); // Устанавливаем выбранное аниме
    navigate(`/characters/${anime.name.toLowerCase().replace(/\s+/g, '')}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-white text-center mb-6">Anime Title</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {animeList.map((anime) => (
          <div
            key={anime.name}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition max-w-xs mx-auto"
            onClick={() => handleSelect(anime)}
          >
            <img
              src={anime.image}
              alt={anime.name}
              className="w-full h-32 object-cover"
              width={300} // Укажите ожидаемую ширину изображения
              height={128} // Укажите ожидаемую высоту изображения
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load image: ${anime.image}`);
                e.target.src = '/images/fallback-image.jpg';
              }}
            />
            <div className="p-3">
              <h2 className="text-base font-semibold text-white">{anime.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeGallery;