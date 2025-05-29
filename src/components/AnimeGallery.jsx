import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnimeGallery = () => {
  const navigate = useNavigate();

  const animeList = [
    { name: 'Naruto', image: '/images/anime/naruto.jpg' },
    { name: 'One Piece', image: '/images/anime/onepiece.jpg' },
    { name: 'Bleach', image: '/images/anime/bleach.jpg' },
    { name: 'Genshin', image: '/images/anime/genshin.jpg' },
    { name: 'Fairy Tail', image: '/images/anime/fairytail.jpg' },
    { name: 'Other', image: '/images/anime/other.jpg' },
    { name: 'General', image: '/images/anime/general.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-white text-center mb-6">Anime title</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {animeList.map((anime) => (
          <div
            key={anime.name}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition"
            onClick={() => navigate(`/characters/${anime.name.toLowerCase().replace(/\s+/g, '')}`)} // Нормализуем: "One Piece" → "onepiece"
          >
            <img src={anime.image} alt={anime.name} className="w-full h-48 object-cover" /> {/* Исправлено title на name */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white">{anime.name}</h2> {/* Исправлено title на name */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeGallery;