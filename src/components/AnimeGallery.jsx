import React from 'react';
import { useNavigate } from 'react-router-dom';
import narutoImage from '../assets/images/anime/naruto.jpg';
import onePieceImage from '../assets/images/anime/onepiece.jpg';
import bleachImage from '../assets/images/anime/bleach.jpg';
import genshinImage from '../assets/images/anime/genshin.jpg';
import fairytailImage from '../assets/images/anime/fairytail.jpg';
import otherlImage from '../assets/images/anime/other.jpg';
import generalImage from '../assets/images/anime/general.jpg';

const AnimeGallery = () => {
  const navigate = useNavigate();

  const animeList = [
    { id: 'naruto', title: 'Naruto', image: narutoImage },
    { id: 'onepiece', title: 'One Piece', image: onePieceImage  },
    { id: 'bleach', title: 'Bleach', image: bleachImage },
    { id: 'genshin', title: 'Genshin Impact', image: genshinImage },
    { id: 'fairytail', title: 'Fairy Tail', image: fairytailImage },
    { id: 'other', title: 'Other', image: otherlImage },
    { id: 'general', title: 'General', image: generalImage },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-white text-center mb-6">Anime title</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition"
            onClick={() => navigate(`/characters/${anime.id}`)}
          >
            <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white">{anime.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeGallery;