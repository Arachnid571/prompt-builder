import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrompt } from '../App';

const CharacterSelect = () => {
  const navigate = useNavigate();
  const { anime } = useParams();
  const { selectedAnime, setSelectedCharacter, telegramUser } = usePrompt();

  const [showModal, setShowModal] = useState(false); // Для модального окна
  const [isChecking, setIsChecking] = useState(false); // Для состояния загрузки API

  // API для проверки подписки
  const checkSubscription = async (userId) => {
    try {
      const response = await fetch(`/api/subscription/${userId}`);
      if (!response.ok) throw new Error('Ошибка сервера');
      const data = await response.json();
      return data.isSubscribed || false;
    } catch (error) {
      console.error('Ошибка проверки подписки:', error);
      return telegramUser?.isSubscribed || false; // Запасной вариант
    }
  };

  const charactersByAnime = {
    naruto: [
      { name: 'Sakura Haruno', image: '/images/characters/sakura.jpg', isAdult: false },
      { name: 'Hyuuga Hinata', image: '/images/characters/hinata.jpg', isAdult: false },
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
      { name: 'Yelan', image: '/images/characters/yelan.jpg', isAdult: false },
      { name: 'Keqing', image: '/images/characters/keqing.jpg', isAdult: false },
      { name: 'Candace', image: '/images/characters/candace.jpg', isAdult: false },
      { name: 'Lisa Minci', image: '/images/characters/lisa.jpg', isAdult: false },
      { name: 'Rosaria from Genshin Impact', image: '/images/characters/rozaria.jpg', isAdult: false },
      { name: 'Shenhe', image: '/images/characters/shenhe.jpg', isAdult: false },
      { name: 'Yae Miko', image: '/images/characters/yae.jpg', isAdult: false },
      { name: 'Raiden Shogun', image: '/images/characters/raiden.jpg', isAdult: false },
      { name: 'Xinyan', image: '/images/characters/xin.jpg', isAdult: false },
      { name: 'Furina', image: '/images/characters/furina.jpg', isAdult: false },
      { name: 'Hu Tao', image: '/images/characters/hu.jpg', isAdult: false },
      { name: 'lumine', image: '/images/characters/lumine.jpg', isAdult: false },
      { name: 'Nilou', image: '/images/characters/nilou.jpg', isAdult: false },
    ],
    other: [
      { name: 'Rem (Re:Zero)', image: '/images/characters/rem.jpg', isAdult: false },
      { name: 'Ram (Re:Zero)', image: '/images/characters/ram.jpg', isAdult: false },
      { name: 'Mikasa Ackerman', image: '/images/characters/mikasa.jpg', isAdult: false },
      { name: 'Power (Chainsaw Man)', image: '/images/characters/power.jpg', isAdult: false },
      { name: 'Zero Two (Darling in the Franxx)', image: '/images/characters/zero.jpg', isAdult: false },
      { name: 'Frieren', image: '/images/characters/frieren.jpg', isAdult: false },
      { name: 'Fern from Frieren: Beyond Journey End', image: '/images/characters/fern.jpg', isAdult: false },
      { name: 'Saber', image: '/images/characters/saber.jpg', isAdult: false },
      { name: 'Asuna (SAO)', image: '/images/characters/asuna.jpg', isAdult: false },
      { name: 'Leafa', image: '/images/characters/leafa.jpg', isAdult: false },
      { name: 'Zelda', image: '/images/characters/zelda.jpg', isAdult: false },
      { name: 'Yor Briar', image: '/images/characters/yor.jpg', isAdult: false },
      { name: 'Nezuko Kamado', image: '/images/characters/nezuko.jpg', isAdult: false },
      { name: 'Kochou shinobu', image: '/images/characters/kochou.jpg', isAdult: false },
      { name: 'Sailor Moon', image: '/images/characters/sailor.jpg', isAdult: false },
      { name: 'Yuri (Doki Doki Literature club)', image: '/images/characters/yuri.jpg', isAdult: false },
      { name: 'Miku Hatsune', image: '/images/characters/miku.jpg', isAdult: false },
      { name: 'Lala Satalin Deviluke', image: '/images/characters/lala.jpg', isAdult: false },
      { name: 'Nagatoro hayase', image: '/images/characters/nagatoro.jpg', isAdult: false },
      { name: 'Bulma', image: '/images/characters/bulma.jpg', isAdult: false },
      { name: 'Inui Sajuna', image: '/images/characters/inui.jpg', isAdult: false },
      { name: 'Mitsuri Kanroji', image: '/images/characters/mits.jpg', isAdult: false },
      { name: 'Darkness (Konosuba)', image: '/images/characters/dark.jpg', isAdult: false },
      { name: 'Aqua (Konosuba)', image: '/images/characters/aqua.jpg', isAdult: false },
      { name: 'Esdeath from Akame ga Kill!', image: '/images/characters/ezd.jpg', isAdult: false },
      { name: 'Tatsumaki', image: '/images/characters/tatsumaki.jpg', isAdult: false },
      { name: 'Soraka', image: '/images/characters/soraka.jpg', isAdult: false },
      { name: '2b (nier:automata)', image: '/images/characters/2b.jpg', isAdult: false },
      { name: 'Chun-Li', image: '/images/characters/chunli.jpg', isAdult: false },
      { name: 'Cammy White', image: '/images/characters/cammy.jpg', isAdult: false },
      { name: 'Kazama asuka from tekken', image: '/images/characters/kazama.jpg', isAdult: false },
      { name: 'Ayanami Rei', image: '/images/characters/rei.jpg', isAdult: false },
      { name: 'Sona from League of Legend', image: '/images/characters/sona.jpg', isAdult: false },
      { name: 'Nidalee from League of Legend', image: '/images/characters/nidalee.jpg', isAdult: false },
      { name: 'Ahri (League of Legend)', image: '/images/characters/ahri.jpg', isAdult: false },
      { name: 'Caitlyn kiramman from League of Legend', image: '/images/characters/caitlyn.jpg', isAdult: false },
      { name: 'Erina Nakiri', image: '/images/characters/erina.jpg', isAdult: false },
      { name: 'Eris Greyrat', image: '/images/characters/eris.jpg', isAdult: false },
      { name: 'Sylphiette', image: '/images/characters/sylphiette.jpg', isAdult: false },
      { name: 'Nonna from (Girls and Panzer)', image: '/images/characters/nona.jpg', isAdult: false },
      { name: 'Jinx', image: '/images/characters/jinx.jpg', isAdult: false },
      { name: 'Albedo (Overlord)', image: '/images/characters/albedo.jpg', isAdult: false },
      { name: 'Rin Tohsaka', image: '/images/characters/rin.jpg', isAdult: false },
      { name: 'hoshino ai', image: '/images/characters/ai.jpg', isAdult: false },
      { name: 'Raphtalia', image: '/images/characters/Raphtalia.jpg', isAdult: false },
      { name: 'Kurokawa Akane from Oshi no Ko', image: '/images/characters/Kurokawa.jpg', isAdult: false },
      { name: 'Busujima Saeko', image: '/images/characters/Saeko.jpg', isAdult: false },
      { name: 'Winry Rockbell', image: '/images/characters/Winry.jpg', isAdult: false },
      { name: 'Marikawa Shizuka from Highschool of the Dead', image: '/images/characters/Marikawa.jpg', isAdult: false },
      { name: 'Matoi Ryuuko', image: '/images/characters/Matoi.jpg', isAdult: false },
      { name: 'Satsuki kiryuin from kill la kill', image: '/images/characters/satsuki.jpg', isAdult: false },
      { name: 'Inori Yuzuriha from Guilty Crown', image: '/images/characters/Inori.jpg', isAdult: false },
      { name: 'holo from Ookami to Koushinryou: Merchant Meets the Wise Wolf', image: '/images/characters/holo.jpg', isAdult: false },
      { name: 'Revy from Black Lagoon', image: '/images/characters/Revy.jpg', isAdult: false },
      { name: 'Lucy from Elfen Lied', image: '/images/characters/Lucyelfen.jpg', isAdult: false },
      { name: 'Hibana from Enen no Shouboutai', image: '/images/characters/Hibana.jpg', isAdult: false },
      { name: 'Roxy Migurdia', image: '/images/characters/Roxy.jpg', isAdult: false },
      { name: 'Hana Midorikawa from Prison School', image: '/images/characters/Hana.jpg', isAdult: false },
      { name: 'Mari Kurihara from Prison School', image: '/images/characters/Mari.jpg', isAdult: false },
      { name: 'Marin Kitagawa', image: '/images/characters/marin.jpg', isAdult: false },
      { name: 'Rachel Gardner from Satsuriku no Tenshi', image: '/images/characters/Rachel.jpg', isAdult: false },
      { name: 'Kaguya Shinomiya', image: '/images/characters/Kaguya.jpg', isAdult: false },
      { name: 'Ishtar', image: '/images/characters/Ishtar.jpg', isAdult: false },
      { name: 'Re-l Mayer from Ergo Proxy', image: '/images/characters/Re.jpg', isAdult: false },
      { name: 'Megumin', image: '/images/characters/Megumin.jpg', isAdult: false },
      { name: 'Miyuki Shiba from Mahouka Koukou no Rettousei', image: '/images/characters/Miyuki.jpg', isAdult: false },
      { name: 'Bridget Satellizer from Freezing', image: '/images/characters/Bridget.jpg', isAdult: false },
      { name: 'Mai Sakurajima', image: '/images/characters/Mai.jpg', isAdult: false },
      { name: 'Siesta from Tantei wa Mou, Shindeiru', image: '/images/characters/Siesta.jpg', isAdult: false },
      { name: 'Sumireko Sanshokuin from Ore wo Suki nano wa Omae dake ka yo', image: '/images/characters/Sumireko.jpg', isAdult: false },
      { name: 'Tsubasa Hanekawa from monogatari', image: '/images/characters/Tsubasa.jpg', isAdult: false },
      { name: 'Hitagi Senjougahara from monogatari', image: '/images/characters/Hitagi.jpg', isAdult: false },
      { name: 'Shinobu Oshino from monogatari', image: '/images/characters/Shinobu.jpg', isAdult: false },
      { name: 'Tifa Lockhart', image: '/images/characters/tifa.jpg', isAdult: false },
      { name: 'Aerith Gainsborough', image: '/images/characters/aerith.jpg', isAdult: false },
      { name: 'Samus Aran', image: '/images/characters/aran.jpg', isAdult: false },
      { name: 'Ranni the witch from elden ring', image: '/images/characters/ranni.jpg', isAdult: false },
      { name: 'Bayonetta', image: '/images/characters/bayonetta.jpg', isAdult: false },
      { name: 'Himejima akeno from dxd', image: '/images/characters/himejima.jpg', isAdult: false },
      { name: 'Elsa from frozen', image: '/images/characters/elsa.jpg', isAdult: false },
      { name: 'Nobara Kugisaki', image: '/images/characters/nobara.jpg', isAdult: false },
      { name: 'Mushoku tensei ghislaine', image: '/images/characters/mushoku.jpg', isAdult: false }, 
      { name: 'Harley Quinn', image: '/images/characters/harley.jpg', isAdult: false },
      { name: 'Hestia danmachi', image: '/images/characters/hestia.jpg', isAdult: false },      
      { name: 'Princess Peach', image: '/images/characters/peach.jpg', isAdult: false },
      { name: 'Bowsette', image: '/images/characters/bowsette.jpg', isAdult: false },
      { name: 'Yang Xiao-Long from RWBY', image: '/images/characters/yang.jpg', isAdult: false },
      { name: 'Komi', image: '/images/characters/komi.jpg', isAdult: false },
      { name: 'Takanashi Kiara', image: '/images/characters/kiara.jpg', isAdult: false },
      { name: 'Mori calliope', image: '/images/characters/mori.jpg', isAdult: false },
      { name: 'Ramlethal from guilty gear', image: '/images/characters/ramlethal.jpg', isAdult: false },
      { name: 'May from guilty gear', image: '/images/characters/may.jpg', isAdult: false },
      { name: 'Bridget from guilty gear', image: '/images/characters/bridgetg.jpg', isAdult: false },
      { name: 'Ann Takamaki Persona 5', image: '/images/characters/takamaki.jpg', isAdult: false },
      { name: 'Olga dark elf discordia kuroinu', image: '/images/characters/olga.jpg', isAdult: false },
      { name: 'Shirase sakuya from idol master', image: '/images/characters/shirase.jpg', isAdult: false },
      { name: 'Cerestia of life from lastorigin', image: '/images/characters/cerestia.jpg', isAdult: false },
      { name: 'shiranui Mai', image: '/images/characters/maishir.jpg', isAdult: false },
      { name: 'charlie morningstar from hazbin hotel', image: '/images/characters/charlie.jpg', isAdult: false },
      { name: 'Jessica Rabbit', image: '/images/characters/jessica.jpg', isAdult: false },
      { name: 'Lucy from Cyberpunk', image: '/images/characters/lucycy.jpg', isAdult: false },
      { name: 'Hilda valentine goneril', image: '/images/characters/hilda.jpg', isAdult: false },
      { name: 'Marianne von edmund', image: '/images/characters/marianne.jpg', isAdult: false },
      { name: 'Edelgard von hresvelg', image: '/images/characters/edelgard.jpg', isAdult: false },
      { name: 'Daiwa scarlet from uma musume', image: '/images/characters/daiwa.jpg', isAdult: false },
      { name: 'Miia from monster musume,lamia body type', image: '/images/characters/miia.jpg', isAdult: false },
      { name: 'Centorea Shianus from monster musume,centaur', image: '/images/characters/centorea.jpg', isAdult: false },
      { name: 'Rachnera Arachnera from monster musume', image: '/images/characters/rachnera.jpg', isAdult: false },
      { name: 'Papi from monster musume,harpy', image: '/images/characters/papi.jpg', isAdult: false },
      { name: 'Velma', image: '/images/characters/velma.jpg', isAdult: false },
      { name: 'Makoto Nanaya from Blazblue', image: '/images/characters/makoto.jpg', isAdult: false },
      { name: 'Noel Vermillion from Blazblue', image: '/images/characters/noel.jpg', isAdult: false }, 
      { name: 'Litchi Faye-Ling from Blazblue', image: '/images/characters/litchi.jpg', isAdult: false }, 
      { name: 'Rachel Alucard from Blazblue', image: '/images/characters/alucard.jpg', isAdult: false },
      { name: 'Spider Gwen from SpiderVerse,undercut blonde hair with pink highlights', image: '/images/characters/gwen.jpg', isAdult: false },
      { name: 'Morrigan Aensland', image: '/images/characters/morrigan.jpg', isAdult: false },
      { name: 'Tharja from fire emblem', image: '/images/characters/tharja.jpg', isAdult: false },
      
    ],
    general: [
      { name: 'Girl', image: '/images/characters/girl.jpg', isAdult: false },
      { name: 'Woman', image: '/images/characters/woman.jpg', isAdult: false },
      { name: 'Milf', image: '/images/characters/milf.jpg', isAdult: true },
      { name: 'Demon', image: '/images/characters/demon.jpg', isAdult: false },
      { name: 'Monster', image: '/images/characters/monster.jpg', isAdult: false },
      { name: 'Goblin', image: '/images/characters/goblin.jpg', isAdult: false },
      { name: 'Orc', image: '/images/characters/orc.jpg', isAdult: false },
      { name: 'Elf', image: '/images/characters/elf.jpg', isAdult: false },
      { name: 'Dark Elf', image: '/images/characters/delf.jpg', isAdult: false },
      { name: '1Boy,boy', image: '/images/characters/boy.jpg', isAdult: false },
      { name: 'Catgirl', image: '/images/characters/catgirl.jpg', isAdult: false },
      { name: '1Man,man', image: '/images/characters/man.jpg', isAdult: false },
      { name: 'Werewolf', image: '/images/characters/werewolf.jpg', isAdult: false },
      { name: 'Minotaur', image: '/images/characters/minotaur.jpg', isAdult: false },
      { name: 'Mom', image: '/images/characters/mom.jpg', isAdult: false },
      { name: '1Son,son', image: '/images/characters/son.jpg', isAdult: false },
      { name: 'Succubus', image: '/images/characters/succubus.jpg', isAdult: false },
      { name: 'Tentacles', image: '/images/characters/tentacles.jpg', isAdult: true },
      { name: 'Tomboy', image: '/images/characters/tomboy.jpg', isAdult: false },
      { name: '1Futanari,futanari', image: '/images/characters/futa.jpg', isAdult: true },
      { name: '2girls,girls', image: '/images/characters/girls.jpg', isAdult: false },
      { name: '1mom,1little son', image: '/images/characters/momson.jpg', isAdult: false },
      { name: '2girls,milfs', image: '/images/characters/milfs.jpg', isAdult: true },
      { name: 'gyaru', image: '/images/characters/gyaru.jpg', isAdult: false },
      { name: 'draenei from warcraft', image: '/images/characters/draenei.jpg', isAdult: false },
      { name: 'Blood elf from warcraft', image: '/images/characters/bloodelf.jpg', isAdult: false },
      { name: 'Night elf from warcraft', image: '/images/characters/nightelf.jpg', isAdult: false },
      { name: 'Dryad', image: '/images/characters/dryad.jpg', isAdult: false },
    ],
    overwatch: [
      { name: 'd.va from Overwatch', image: '/images/characters/diva.jpg', isAdult: false },
      { name: 'Mercy', image: '/images/characters/mercy.jpg', isAdult: false },
      { name: 'Widowmaker', image: '/images/characters/widowmaker.jpg', isAdult: false },
      { name: 'Mei from Overwatch', image: '/images/characters/mei.jpg', isAdult: false },
      { name: 'Sombra', image: '/images/characters/sombra.jpg', isAdult: false },
      { name: 'Tracer', image: '/images/characters/tracer.jpg', isAdult: false },
      { name: 'Symmetra', image: '/images/characters/symmetra.jpg', isAdult: false },
      { name: 'Pharah', image: '/images/characters/pharah.jpg', isAdult: false },
    ],  
    pokemon: [
      { name: 'Misty from Pokemon', image: '/images/characters/misty.jpg', isAdult: false },
      { name: 'Cynthia From Pokemon', image: '/images/characters/cynthia.jpg', isAdult: false },
      { name: 'Jessie from team rocket', image: '/images/characters/jessie.jpg', isAdult: false },
      { name: 'Rosa from Pokémon', image: '/images/characters/rosa.jpg', isAdult: false },
      { name: 'Erika from Pokémon', image: '/images/characters/erika.jpg', isAdult: false },
      { name: 'Skyla from Pokémon', image: '/images/characters/skyla.jpg', isAdult: false },
      { name: 'Hex maniac from Pokémon', image: '/images/characters/hex.jpg', isAdult: false },
      { name: 'Jenny from Pokémon', image: '/images/characters/jenny.jpg', isAdult: false },
      { name: 'Elesa from Pokémon', image: '/images/characters/elesa.jpg', isAdult: false },
      { name: 'Lillie from Pokémon', image: '/images/characters/lillie.jpg', isAdult: false },
    ],
    starrail:[
      { name: 'Asta from Honkai: Star Rail', image: '/images/characters/asta.jpg', isAdult: false },
      { name: 'Acheron', image: '/images/characters/acheron.jpg', isAdult: false },
      { name: 'Black Swan', image: '/images/characters/swan.jpg', isAdult: false },
      { name: 'Bronya', image: '/images/characters/bronya.jpg', isAdult: false },
      { name: 'Firefly from Honkai: Star Rail', image: '/images/characters/firefly.jpg', isAdult: false },
      { name: 'Fu Xuan', image: '/images/characters/fu.jpg', isAdult: false },
      { name: 'Guinaifen from Honkai: Star Rail', image: '/images/characters/guinaifen.jpg', isAdult: false },
      { name: 'Hanya from Honkai: Star Rail', image: '/images/characters/hanya.jpg', isAdult: false },
      { name: 'Herta', image: '/images/characters/herta.jpg', isAdult: false },
      { name: 'Himeko from Honkai: Star Rail', image: '/images/characters/himeko.jpg', isAdult: false },
      { name: 'Kafka from Honkai: Star Rail', image: '/images/characters/kafka.jpg', isAdult: false },
      { name: 'March 7th from Honkai: Star Rail', image: '/images/characters/march.jpg', isAdult: false },
      { name: 'Pela from Honkai: Star Rail', image: '/images/characters/pela.jpg', isAdult: false },
      { name: 'Qingque from Honkai: Star Rail', image: '/images/characters/qingque.jpg', isAdult: false },
      { name: 'Robin from Honkai: Star Rail', image: '/images/characters/robin.jpg', isAdult: false },
      { name: 'Ruan Mei from Honkai: Star Rail', image: '/images/characters/ruan.jpg', isAdult: false },
      { name: 'Seele', image: '/images/characters/seele.jpg', isAdult: false },
      { name: 'Silver Wolf', image: '/images/characters/wolf.jpg', isAdult: false },
      { name: 'Sparkle from Honkai: Star Rail', image: '/images/characters/sparkle.jpg', isAdult: false },
      { name: 'Jingliu', image: '/images/characters/jingliu.jpg', isAdult: false }, 
      { name: 'Tingyun', image: '/images/characters/tingyun.jpg', isAdult: false },
         
    ],
  };

  const normalizedAnime = anime?.toLowerCase().replace(/\s+/g, '');
  const characters = charactersByAnime[normalizedAnime] || [];

  const handleCharacterSelect = async (character) => {
    if (character.isAdult && telegramUser) {
      setIsChecking(true);
      const isSubscribed = await checkSubscription(telegramUser.id);
      setIsChecking(false);
      if (!isSubscribed) {
        setShowModal(true);
        return;
      }
    }
    setSelectedCharacter(character);
    navigate(`/costumes/${normalizedAnime}`);
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
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.34,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Select Character
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {characters.length > 0 ? (
            characters.map((character) => (
              <div
                key={character.name}
                className={`flex flex-col gap-3 rounded-lg border p-2 cursor-pointer ${
                  character.isAdult && !telegramUser?.isSubscribed ? 'opacity-50 cursor-not-allowed' : 'border-[#445c3d] hover:bg-[#2e3a2b]'
                }`}
                onClick={() => !isChecking && handleCharacterSelect(character)}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-32 h-32 object-cover rounded-xl"
                  onError={(e) => {
                    console.error(`Failed to load image: ${character.image}`);
                    e.target.src = '/images/fallback-image.jpg';
                  }}
                />
                <p className="text-white text-base font-medium">{character.name}</p>
                {character.isAdult && (
                  <span className="absolute top-2 right-2 text-red-500 text-xs font-bold">18+</span>
                )}
              </div>
            ))
          ) : (
            <div className="text-white text-center col-span-full">No characters available for this anime.</div>
          )}
        </div>
      </div>
      {/* Модальное окно */}
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
                  window.open('https://t.me/AniGenerator_bot?', '_blank'); // Ссылка на бота подписки
                }}
              >
                Subscribe now
              </button>
            </div>
          </div>
        </div>
      )}
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

export default CharacterSelect;