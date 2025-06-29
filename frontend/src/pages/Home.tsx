import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { TOGGLE_STAR_CHARACTER } from '../graphql/mutations';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import CharacterDetail from '../components/CharacterDetail';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedStarred, setSelectedStarred] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      name: search || undefined,
      species: selectedSpecies !== 'all' ? selectedSpecies : undefined,
    },
  });

  const [toggleStar] = useMutation(TOGGLE_STAR_CHARACTER, {
    onCompleted: (res) => {
      refetch();
      if (selectedCharacter && res.toggleStarCharacter.id === selectedCharacter.id) {
        setSelectedCharacter({ ...selectedCharacter, isStarred: res.toggleStarCharacter.isStarred });
      }
    },
  });

  const handleFilter = () => {
    refetch({
      name: search || undefined,
      species: selectedSpecies !== 'all' ? selectedSpecies : undefined,
    });
    setShowFilters(false);
  };

  const handleToggleStar = (char: any) => {
    toggleStar({ variables: { id: char.id } });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const starred = data?.characters?.filter((c: any) => c.isStarred) || [];
  const others = data?.characters?.filter((c: any) => !c.isStarred) || [];

  const visibleStarred = selectedStarred === 'starred' ? starred : selectedStarred === 'others' ? [] : starred;
  const visibleOthers = selectedStarred === 'starred' ? [] : selectedStarred === 'others' ? others : others;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-0 md:p-2">
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-0 md:p-2">
        <section className="w-full md:w-[343px] p-2 md:p-0 md:pl-2 md:pr-1 border-r border-gray-200 bg-white">
          <div className="mb-4 relative flex flex-col items-center">
            <div className="w-full md:w-auto">
              <SearchBar value={search} onChange={setSearch} onFilterClick={() => setShowFilters(true)} />
            </div>
            {showFilters && (
              <div className="relative">
                <div
                  className="fixed inset-0 z-30 bg-black bg-opacity-20 md:bg-transparent"
                  onClick={() => setShowFilters(false)}
                />
                <div
                  ref={modalRef}
                  className="fixed md:absolute left-0 right-0 top-0 md:top-full z-40 flex justify-center md:mt-2"
                  style={{ height: '100vh', maxHeight: '100vh' }}
                >
                  <div
                    className="bg-white w-full h-full md:w-[343px] md:h-auto md:max-h-[400px] border border-gray-200 md:rounded-xl md:z-40 md:relative shadow-none md:shadow-lg relative"
                    style={{ boxShadow: '0 2px 8px 0 rgba(16,30,54,0.04)' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 left-4 md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none"
                      onClick={() => setShowFilters(false)}
                      aria-label="Cerrar filtros"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <Filters
                      selectedStatus={''}
                      setSelectedStatus={() => {}}
                      selectedSpecies={selectedSpecies}
                      setSelectedSpecies={setSelectedSpecies}
                      selectedStarred={selectedStarred}
                      setSelectedStarred={setSelectedStarred}
                      onFilter={() => { handleFilter(); setShowFilters(false); }}
                      onClose={() => setShowFilters(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <h1
            className="mb-4"
            style={{
              color: '#1F2937',
              fontFamily: 'Greycliff CF Figma 001',
              fontSize: 24,
              fontWeight: 700,
              lineHeight: '32px',
              fontStyle: 'normal',
            }}
          >
            Rick and Morty list
          </h1>
          {visibleStarred.length > 0 && (
            <div className="mb-4">
              <div className="font-semibold text-gray-700 mb-2">Starred Characters ({starred.length})</div>
              <ul className="space-y-2">
                {visibleStarred.map((char: any, idx: number) => (
                  <li
                    key={char.id}
                    className={`flex flex-col justify-center items-start self-stretch px-4 py-2 cursor-pointer rounded hover:bg-purple-50 ${selectedCharacter?.id === char.id ? 'bg-purple-100' : ''} ${idx !== visibleStarred.length - 1 ? 'border-b border-gray-200/70' : ''}`}
                    onClick={() => setSelectedCharacter(char)}
                  >
                    <div className="flex items-center w-full">
                      <img src={char.image} alt={char.name} className="w-8 h-8 rounded-full mr-2" />
                      <div className="flex flex-col">
                        <span className="font-medium leading-tight">{char.name}</span>
                        <span className="text-gray-500 text-xs leading-tight">{char.species}</span>
                      </div>
                      <button
                        className="ml-auto focus:outline-none"
                        onClick={e => { e.stopPropagation(); handleToggleStar(char); }}
                        title="Unstar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#22C55E" viewBox="0 0 24 24" className="w-6 h-6">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-700 mb-2">Characters ({others.length})</div>
            <ul className="space-y-2">
              {visibleOthers.map((char: any, idx: number) => (
                <li
                  key={char.id}
                  className={`flex flex-col justify-center items-start self-stretch px-4 py-2 cursor-pointer rounded hover:bg-purple-50 ${selectedCharacter?.id === char.id ? 'bg-purple-100' : ''} ${idx !== visibleOthers.length - 1 ? 'border-b border-gray-200/70' : ''}`}
                  onClick={() => setSelectedCharacter(char)}
                >
                  <div className="flex items-center w-full">
                    <img src={char.image} alt={char.name} className="w-8 h-8 rounded-full mr-2" />
                    <div className="flex flex-col">
                      <span className="font-medium leading-tight">{char.name}</span>
                      <span className="text-gray-500 text-xs leading-tight">{char.species}</span>
                    </div>
                    <button
                      className="ml-auto focus:outline-none"
                      onClick={e => { e.stopPropagation(); handleToggleStar(char); }}
                      title="Star"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#D1D5DB" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {isMobile && selectedCharacter ? (
          <div className="fixed inset-0 z-50 bg-white flex flex-col">
            <CharacterDetail character={selectedCharacter} onToggleStar={handleToggleStar} onClose={() => setSelectedCharacter(null)} />
          </div>
        ) : (
          <section className="flex-1 p-2">
            <CharacterDetail character={selectedCharacter} onToggleStar={handleToggleStar} />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home; 