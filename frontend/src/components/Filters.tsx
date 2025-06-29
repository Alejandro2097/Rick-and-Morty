import React from 'react';

type FilterProps = {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedSpecies: string;
  setSelectedSpecies: (species: string) => void;
  selectedStarred: string;
  setSelectedStarred: (starred: string) => void;
  onFilter: () => void;
};

type FilterPropsWithClose = FilterProps & { onClose?: () => void };

const Filters: React.FC<FilterPropsWithClose> = ({
  selectedStatus,
  setSelectedStatus,
  selectedSpecies,
  setSelectedSpecies,
  selectedStarred,
  setSelectedStarred,
  onFilter,
  onClose,
}) => {
  return (
    <div className="relative md:static h-full flex flex-col bg-white md:rounded-lg md:shadow-none md:mb-4">
      <div className="flex-1 overflow-y-auto md:overflow-visible p-4 pb-28 md:pb-4 pt-14 md:pt-4">
        <h2 className="text-lg font-semibold mb-6 text-center">Filters</h2>
        <div className="mb-8">
          <div className="font-medium mb-2 text-gray-700">Characters</div>
          <div className="flex gap-3">
            <button
              className={`px-5 py-2 rounded-xl border text-base font-medium transition-all duration-150 ${selectedStarred === 'all' ? 'bg-[#F4F1FA] text-[#A259FF] border-[#A259FF]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setSelectedStarred('all')}
            >
              All
            </button>
            <button
              className={`px-5 py-2 rounded-xl border text-base font-medium transition-all duration-150 ${selectedStarred === 'starred' ? 'bg-[#F4F1FA] text-[#A259FF] border-[#A259FF]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setSelectedStarred('starred')}
            >
              Starred
            </button>
            <button
              className={`px-5 py-2 rounded-xl border text-base font-medium transition-all duration-150 ${selectedStarred === 'others' ? 'bg-[#F4F1FA] text-[#A259FF] border-[#A259FF]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setSelectedStarred('others')}
            >
              Others
            </button>
          </div>
        </div>
        <div className="mb-8">
          <div className="font-medium mb-2 text-gray-700">Specie</div>
          <div className="flex gap-3">
            <button
              className={`px-5 py-2 rounded-xl border text-base font-medium transition-all duration-150 ${selectedSpecies === 'all' ? 'bg-[#F4F1FA] text-[#A259FF] border-[#A259FF]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setSelectedSpecies('all')}
            >
              All
            </button>
            <button
              className={`px-5 py-2 rounded-xl border text-base font-medium transition-all duration-150 ${selectedSpecies === 'Human' ? 'bg-[#F4F1FA] text-[#A259FF] border-[#A259FF]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setSelectedSpecies('Human')}
            >
              Human
            </button>
            <button
              className={`px-5 py-2 rounded-xl border text-base font-medium transition-all duration-150 ${selectedSpecies === 'Alien' ? 'bg-[#F4F1FA] text-[#A259FF] border-[#A259FF]' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => setSelectedSpecies('Alien')}
            >
              Alien
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-4 bg-white">
        <button
          className="w-full py-4 rounded-xl bg-gray-100 text-[#A1A1AA] text-lg font-semibold fixed md:static bottom-0 left-0 right-0 z-50 md:z-auto"
          onClick={onFilter}
        >
          Filter
        </button>
      </div>
      <button
        className="absolute top-4 left-4 md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none z-50"
        onClick={onClose}
        aria-label="Cerrar filtros"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};

export default Filters; 