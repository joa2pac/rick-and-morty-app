/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CharacterList from './character-list';
import EpisodeList from './episode-list';
import GetCharactersViewModel from '@/app/_presentation/view-models/rick-and-morty/get-characters-view-model';
import GetEpisodesViewModel from '@/app/_presentation/view-models/rick-and-morty/get-episodes-view-model';
import { ClipLoader } from 'react-spinners';

const CharacterSelection: React.FC = () => {
  const [selectedCharacter1, setSelectedCharacter1] = useState<number | null>(null);
  const [selectedCharacter2, setSelectedCharacter2] = useState<number | null>(null);

  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');

  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  const {
    getCharacters: getCharacters1,
    charactersData: charactersData1,
    loading: loading1,
    error: error1,
  } = GetCharactersViewModel();

  const {
    getCharacters: getCharacters2,
    charactersData: charactersData2,
    loading: loading2,
    error: error2,
  } = GetCharactersViewModel();

  const {
    getEpisodesByCharacter,
    getSharedEpisodes,
    loading: loadingEpisodes,
    error: errorEpisodes,
  } = GetEpisodesViewModel();

  useEffect(() => {
    getCharacters1(currentPage1, searchQuery1);
    getCharacters2(currentPage2, searchQuery2);
  }, [currentPage1, currentPage2, searchQuery1, searchQuery2]);

  const handleCharacterSelect1 = (characterId: number) => {
    setSelectedCharacter1(characterId);
  };

  const handleCharacterSelect2 = (characterId: number) => {
    setSelectedCharacter2(characterId);
  };

  const episodesData1 = selectedCharacter1 ? getEpisodesByCharacter(selectedCharacter1) : [];
  const episodesData2 = selectedCharacter2 ? getEpisodesByCharacter(selectedCharacter2) : [];
  const sharedEpisodes = selectedCharacter1 && selectedCharacter2
    ? getSharedEpisodes([selectedCharacter1, selectedCharacter2])
    : [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Character List 1 */}
        <div>
          <input
            type="text"
            value={searchQuery1}
            onChange={(e) => setSearchQuery1(e.target.value)}
            placeholder="Search Characters"
            className="mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          {loading1 ? (
            <div className="flex justify-center items-center h-24">
              <ClipLoader color="#36d7b7" size={50} />
            </div>
          ) : (
            <>
              {error1 ? (
                <div className="text-red-500 mb-4">{error1}</div>
              ) : (
                <CharacterList
                  characters={charactersData1.results}
                  onCharacterSelect={handleCharacterSelect1}
                  selectedCharacterId={selectedCharacter1}
                />
              )}
            </>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage1(currentPage1 > 1 ? currentPage1 - 1 : 1)}
              disabled={currentPage1 === 1}
              className="p-2 bg-gray-700 text-white rounded"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage1(currentPage1 + 1)}
              disabled={!charactersData1.info.next}
              className="p-2 bg-gray-700 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>

        {/* Character List 2 */}
        <div>
          <input
            type="text"
            value={searchQuery2}
            onChange={(e) => setSearchQuery2(e.target.value)}
            placeholder="Search Characters"
            className="mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          {loading2 ? (
            <div className="flex justify-center items-center h-24">
              <ClipLoader color="#36d7b7" size={50} />
            </div>
          ) : (
            <>
              {error2 ? (
                <div className="text-red-500 mb-4">{error2}</div>
              ) : (
                <CharacterList
                  characters={charactersData2.results}
                  onCharacterSelect={handleCharacterSelect2}
                  selectedCharacterId={selectedCharacter2}
                />
              )}
            </>
          )}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage2(currentPage2 > 1 ? currentPage2 - 1 : 1)}
              disabled={currentPage2 === 1}
              className="p-2 bg-gray-700 text-white rounded"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage2(currentPage2 + 1)}
              disabled={!charactersData2.info.next}
              className="p-2 bg-gray-700 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedCharacter1 && selectedCharacter2 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <EpisodeList title="Character #1 - Only Episodes" episodes={episodesData1} />
          <EpisodeList title="Characters #1 & #2 - Shared Episodes" episodes={sharedEpisodes} />
          <EpisodeList title="Character #2 - Only Episodes" episodes={episodesData2} />
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
