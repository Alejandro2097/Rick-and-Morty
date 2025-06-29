import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../graphql/mutations';

type CharacterDetailProps = {
  character: {
    id: string;
    name: string;
    image: string;
    species: string;
    status: string;
    gender: string;
    origin: string;
    isStarred: boolean;
    comments: { id: string; text: string; createdAt: string }[];
    occupation?: string;
  } | null;
  onToggleStar?: (char: any) => void;
  onClose?: () => void;
};

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onToggleStar, onClose }) => {
  const [comment, setComment] = useState('');
  const [addComment, { loading: adding }] = useMutation(ADD_COMMENT);
  const [localComments, setLocalComments] = useState(character?.comments || []);
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalComments(character?.comments || []);
    setComment('');
    setError('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [character]);

  if (!character) {
    return <div className="p-4">Select a character to see details</div>;
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!comment.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    const res = await addComment({ variables: { characterId: character.id, text: comment } });
    if (res.data?.addComment) {
      setLocalComments([res.data.addComment, ...localComments]);
      setComment('');
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
    }
  };

  return (
    <div className="relative bg-white min-h-screen w-full h-full flex flex-col items-center px-4 pt-8 md:pt-8 md:pl-8 md:rounded-lg md:shadow md:w-auto md:h-auto overflow-y-auto">
      {onClose && (
        <button
          className="absolute top-4 left-4 md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none z-50"
          onClick={onClose}
          aria-label="Volver"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A259FF" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flex flex-col items-center w-full">
        <div className="relative w-24 h-24 mb-4">
          <img src={character.image} alt={character.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mx-auto" />
          <button
            className={`absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-white focus:outline-none transition-colors duration-200 ${character.isStarred ? 'text-green-500' : 'text-gray-300'}`}
            onClick={() => onToggleStar && onToggleStar(character)}
            title={character.isStarred ? 'Unstar' : 'Star'}
            style={{ zIndex: 2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 w-full break-words">{character.name}</h2>
        <div className="w-full max-w-xl">
          <div className="py-4 border-t border-gray-100">
            <div className="font-semibold text-[16px] text-gray-900">Specie</div>
            <div className="text-gray-400 text-[15px]">{character.species}</div>
          </div>
          <div className="py-4 border-t border-gray-100">
            <div className="font-semibold text-[16px] text-gray-900">Status</div>
            <div className="text-gray-400 text-[15px]">{character.status}</div>
          </div>
          <div className="py-4 border-t border-gray-100">
            <div className="font-semibold text-[16px] text-gray-900">Occupation</div>
            <div className="text-gray-400 text-[15px]">{character.occupation || 'Unknown'}</div>
          </div>
        </div>

        <div className="w-full max-w-xl mt-8">
          <div className="py-4 border-t border-gray-100">
            <div className="font-semibold text-[16px] text-gray-900 mb-4">Comments</div>
            
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={adding}
                />
                <button
                  type="submit"
                  disabled={adding || !comment.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? 'Adding...' : 'Add'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>

            <div className="space-y-3">
              {localComments.length === 0 ? (
                <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
              ) : (
                localComments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 bg-gray-50 rounded-lg transition-all duration-300 ${
                      animate ? 'scale-105 bg-purple-50' : ''
                    }`}
                  >
                    <p className="text-gray-800 text-sm">{comment.text}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail; 