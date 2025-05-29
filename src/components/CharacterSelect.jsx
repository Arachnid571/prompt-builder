import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import sakuraImage from '../assets/images/characters/sakura.jpg';
import hinataImage from '../assets/images/characters/hinata.jpg';
import tsunadeImage from '../assets/images/characters/tsunade.jpg';
import inoImage from '../assets/images/characters/ino.jpg';
import tamariImage from '../assets/images/characters/tamari.jpg';
import konanImage from '../assets/images/characters/Konan.jpg';
import rukiaImage from '../assets/images/characters/Rukia.jpg';
import rangikuImage from '../assets/images/characters/Rangiku.jpg';
import yoruichiImage from '../assets/images/characters/Yoruichi.jpg';
import orihimeImage from '../assets/images/characters/Orihime.jpg';
import boaImage from '../assets/images/characters/Boa.jpg';
import namiImage from '../assets/images/characters/nami.jpg';
import nicoImage from '../assets/images/characters/nico.jpg';
import erzaImage from '../assets/images/characters/Erza.jpg';
import lucyImage from '../assets/images/characters/lucy.jpg';
import juviaImage from '../assets/images/characters/juvia.jpg';
import mirajaneImage from '../assets/images/characters/mirajane.jpg';
import peggImage from '../assets/images/characters/pegg.jpg';
import ningImage from '../assets/images/characters/ning.jpg';
import beidouImage from '../assets/images/characters/Beidou.jpg';
import ganyuImage from '../assets/images/characters/Ganyu.jpg';
import jeanImage from '../assets/images/characters/jean.jpg';
import dehyaImage from '../assets/images/characters/Dehya.jpg';
import yelanImage from '../assets/images/characters/yelan.jpg';
import keqingImage from '../assets/images/characters/keqing.jpg';
import candaceImage from '../assets/images/characters/candace.jpg';
import lisaImage from '../assets/images/characters/lisa.jpg';
import rozariaImage from '../assets/images/characters/rozaria.jpg';
import shenheImage from '../assets/images/characters/shenhe.jpg';
import yaeImage from '../assets/images/characters/yae.jpg';
import raidenImage from '../assets/images/characters/raiden.jpg';
import xinImage from '../assets/images/characters/xin.jpg';
import furinaImage from '../assets/images/characters/furina.jpg';
import huImage from '../assets/images/characters/hu.jpg';
import remImage from '../assets/images/characters/rem.jpg';
import mikasaImage from '../assets/images/characters/mikasa.jpg';
import powerImage from '../assets/images/characters/power.jpg';
import zeroImage from '../assets/images/characters/zero.jpg';
import frierenImage from '../assets/images/characters/frieren.jpg';
import fernImage from '../assets/images/characters/fern.jpg';
import saberImage from '../assets/images/characters/saber.jpg';
import asunaImage from '../assets/images/characters/asuna.jpg';
import zeldaImage from '../assets/images/characters/zelda.jpg';
import yorImage from '../assets/images/characters/yor.jpg';
import nezukoImage from '../assets/images/characters/nezuko.jpg';
import sailorImage from '../assets/images/characters/sailor.jpg';
import yuriImage from '../assets/images/characters/yuri.jpg';
import mikuImage from '../assets/images/characters/miku.jpg';
import lalaImage from '../assets/images/characters/lala.jpg';
import nagataroImage from '../assets/images/characters/nagatoro.jpg';
import bulmaImage from '../assets/images/characters/bulma.jpg';
import inuiImage from '../assets/images/characters/inui.jpg';
import mitsImage from '../assets/images/characters/mits.jpg';
import darkImage from '../assets/images/characters/dark.jpg';
import aquaImage from '../assets/images/characters/aqua.jpg';
import ezdImage from '../assets/images/characters/ezd.jpg';
import tatsumakiImage from '../assets/images/characters/tatsumaki.jpg';
import sorakaImage from '../assets/images/characters/soraka.jpg';
import bImage from '../assets/images/characters/2b.jpg';
import chunliImage from '../assets/images/characters/chunli.jpg';
import reiImage from '../assets/images/characters/rei.jpg';
import sonaImage from '../assets/images/characters/sona.jpg';
import nidaleeImage from '../assets/images/characters/nidalee.jpg';
import ahriImage from '../assets/images/characters/ahri.jpg';
import erinaImage from '../assets/images/characters/erina.jpg';
import erisImage from '../assets/images/characters/eris.jpg';
import nonaImage from '../assets/images/characters/nona.jpg';
import jinxImage from '../assets/images/characters/jinx.jpg';
import albedoImage from '../assets/images/characters/albedo.jpg';
import rinImage from '../assets/images/characters/rin.jpg';
import girlImage from '../assets/images/characters/girl.jpg';
import womenImage from '../assets/images/characters/women.jpg';
import milfImage from '../assets/images/characters/milf.jpg';
import demonImage from '../assets/images/characters/demon.jpg';
import monsterImage from '../assets/images/characters/monster.jpg';
import goblinImage from '../assets/images/characters/goblin.jpg';
import orcImage from '../assets/images/characters/orc.jpg';
import elfImage from '../assets/images/characters/elf.jpg';
import boyImage from '../assets/images/characters/boy.jpg';
import catgirlImage from '../assets/images/characters/catgirl.jpg';
import manImage from '../assets/images/characters/man.jpg';
import werewolfImage from '../assets/images/characters/werewolf.jpg';
import minotaurImage from '../assets/images/characters/minotaur.jpg';
import momImage from '../assets/images/characters/mom.jpg';
import sonImage from '../assets/images/characters/son.jpg';
import succubusImage from '../assets/images/characters/succubus.jpg';
import tentaclesImage from '../assets/images/characters/tentacles.jpg';
import tomboyImage from '../assets/images/characters/tomboy.jpg';
import futaImage from '../assets/images/characters/futa.jpg';

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
  const isSubscribed = false; // Replace with actual subscription check

  console.log('CharacterSelect Params:', { anime, selectedCharacters, incomingPrompts });

  const charactersByAnime = {
    naruto: [
      { name: 'Sakura Haruno', image: sakuraImage, isAdult: false },
      { name: 'Hyuuga Hinata', image: hinataImage, isAdult: false },
      { name: 'Tsunade', image: tsunadeImage, isAdult: false },
      { name: 'Yamanaka Ino', image: inoImage, isAdult: false },
      { name: 'Nara Temari', image: tamariImage, isAdult: false },
      { name: 'Konan', image: konanImage, isAdult: false },
    ],
    bleach: [
      { name: 'Rukia Kuchiki', image: rukiaImage, isAdult: false },
      { name: 'Orihime Inoue', image: orihimeImage, isAdult: false },
      { name: 'Rangiku Matsumoto', image: rangikuImage, isAdult: false },
      { name: 'Yoruichi Shihouin', image: yoruichiImage, isAdult: false },
    ],
    onepiece: [
      { name: 'Boa Hancock', image: boaImage, isAdult: false },
      { name: 'Nami', image: namiImage, isAdult: false },
      { name: 'Nico Robin', image: nicoImage, isAdult: false },
    ],
    fairytail: [
      { name: 'Erza Scarlet', image: erzaImage, isAdult: false },
      { name: 'Lucy Heartfilia', image: lucyImage, isAdult: false },
      { name: 'Juvia Lockser', image: juviaImage, isAdult: false },
      { name: 'Mirajane Strauss', image: mirajaneImage, isAdult: false },
    ],
    genshin: [
      { name: 'Barbara Pegg', image: peggImage, isAdult: false },
      { name: 'Ningguang', image: ningImage, isAdult: false },
      { name: 'Beidou', image: beidouImage, isAdult: false },
      { name: 'Ganyu', image: ganyuImage, isAdult: false },
      { name: 'Jean Gunnhildr', image: jeanImage, isAdult: false },
      { name: 'Dehya', image: dehyaImage, isAdult: false },
      { name: 'Yelan', image: yelanImage, isAdult: false },
      { name: 'Keqing', image: keqingImage, isAdult: false },
      { name: 'Candace', image: candaceImage, isAdult: false },
      { name: 'Lisa Minci', image: lisaImage, isAdult: false },
      { name: 'Rozaria', image: rozariaImage, isAdult: false },
      { name: 'Shenhe', image: shenheImage, isAdult: false },
      { name: 'Yae Miko', image: yaeImage, isAdult: false },
      { name: 'Raiden', image: raidenImage, isAdult: false },
      { name: 'Xinyan', image: xinImage, isAdult: false },
      { name: 'Furina', image: furinaImage, isAdult: false },
      { name: 'Hu Tao', image: huImage, isAdult: false },
    ],
    other: [
      { name: 'Rem', image: remImage, isAdult: false },
      { name: 'Mikasa Ackerman', image: mikasaImage, isAdult: false },
      { name: 'Power', image: powerImage, isAdult: false },
      { name: 'Zero Two', image: zeroImage, isAdult: false },
      { name: 'Frieren', image: frierenImage, isAdult: false },
      { name: 'Fern', image: fernImage, isAdult: false },
      { name: 'Saber', image: saberImage, isAdult: false },
      { name: 'Asuna', image: asunaImage, isAdult: false },
      { name: 'Zelda', image: zeldaImage, isAdult: false },
      { name: 'Yor Briar', image: yorImage, isAdult: false },
      { name: 'Nezuko Kamado', image: nezukoImage, isAdult: false },
      { name: 'Sailor Moon', image: sailorImage, isAdult: false },
      { name: 'Yuri', image: yuriImage, isAdult: false },
      { name: 'Miku', image: mikuImage, isAdult: false },
      { name: 'Lala Satalin Deviluke', image: lalaImage, isAdult: false },
      { name: 'Nagatoro Hayase', image: nagataroImage, isAdult: false },
      { name: 'Bulma', image: bulmaImage, isAdult: false },
      { name: 'Inui Sajuna', image: inuiImage, isAdult: false },
      { name: 'Mitsuri Kanroji', image: mitsImage, isAdult: false },
      { name: 'Darkness', image: darkImage, isAdult: false },
      { name: 'Aqua', image: aquaImage, isAdult: false },
      { name: 'Esdeath', image: ezdImage, isAdult: false },
      { name: 'Tatsumaki', image: tatsumakiImage, isAdult: false },
      { name: 'Soraka', image: sorakaImage, isAdult: false },
      { name: '2B', image: bImage, isAdult: false },
      { name: 'ChunLi', image: chunliImage, isAdult: false },
      { name: 'Ayanami Rei', image: reiImage, isAdult: false },
      { name: 'Sona', image: sonaImage, isAdult: false },
      { name: 'Nidalee', image: nidaleeImage, isAdult: false },
      { name: 'Ahri', image: ahriImage, isAdult: false },
      { name: 'Erina Nakiri', image: erinaImage, isAdult: false },
      { name: 'Eris Greyrat', image: erisImage, isAdult: false },
      { name: 'Nonna', image: nonaImage, isAdult: false },
      { name: 'Jinx', image: jinxImage, isAdult: false },
      { name: 'Albedo', image: albedoImage, isAdult: false },
      { name: 'Rin Tohsaka', image: rinImage, isAdult: false },
    ],
    general: [
      { name: 'Girl', image: girlImage, isAdult: false },
      { name: 'Woman', image: womenImage, isAdult: false },
      { name: 'MILF', image: milfImage, isAdult: true },
      { name: 'Demon', image: demonImage, isAdult: false },
      { name: 'Monster', image: monsterImage, isAdult: false },
      { name: 'Goblin', image: goblinImage, isAdult: false },
      { name: 'Orc', image: orcImage, isAdult: false },
      { name: 'Elf', image: elfImage, isAdult: false },
      { name: 'Boy', image: boyImage, isAdult: false },
      { name: 'Catgirl', image: catgirlImage, isAdult: false },
      { name: 'Man', image: manImage, isAdult: false },
      { name: 'Werewolf', image: werewolfImage, isAdult: false },
      { name: 'Minotaur', image: minotaurImage, isAdult: false },
      { name: 'Mom', image: momImage, isAdult: true },
      { name: 'Son', image: sonImage, isAdult: true },
      { name: 'Succubus', image: succubusImage, isAdult: true },
      { name: 'Tentacles', image: tentaclesImage, isAdult: true },
      { name: 'Futanari', image: futaImage, isAdult: true },
      { name: 'Tomboy', image: tomboyImage, isAdult: true },
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
                  loading="lazy"
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