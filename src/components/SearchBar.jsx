import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Recherche:', searchQuery);
      // Ici vous pouvez ajouter votre logique de recherche
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <div className="position-absolute top-50 end-0 translate-middle-y" style={{ zIndex: 30, right: '2rem', maxWidth: '320px', width: '320px' }}>
      <div className="position-relative">
        <div className={`
          position-relative d-flex align-items-center bg-white rounded-pill shadow transition-all
          ${isFocused ? 'shadow-lg' : 'shadow hover:shadow-md'}
        `} style={{ transition: 'all 0.3s ease' }}>
          
          <div className="position-absolute start-0 ps-4 d-flex align-items-center" style={{ pointerEvents: 'none', top: '50%', transform: 'translateY(-50%)' }}>
            <Search
              size={20}
              className={`transition-colors ${
                isFocused ? 'text-primary' : 'text-muted'
              }`}
              style={{ transition: 'color 0.2s' }}
            />
          </div>
         
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            placeholder="Rechercher une destination..."
            className="w-100 py-3 ps-5 pe-5 text-dark bg-transparent rounded-pill border-0 fs-6"
            style={{ 
              paddingLeft: '3rem', 
              paddingRight: searchQuery ? '6rem' : '4rem',
              outline: 'none',
              fontSize: '1.1rem'
            }}
          />
         
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="position-absolute btn btn-link text-muted p-0 d-flex align-items-center justify-content-center"
              style={{ 
                right: '3.5rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '2rem',
                height: '2rem',
                transition: 'color 0.2s'
              }}
            >
              <X size={18} />
            </button>
          )}
         
          <button
            type="button"
            onClick={handleSearch}
            className={`
              position-absolute rounded-pill d-flex align-items-center justify-content-center border-0 transition-all
              ${searchQuery.trim()
                ? 'btn btn-primary shadow-sm'
                : 'btn btn-light text-muted'
              }
            `}
            style={{ 
              right: '0.5rem', 
              top: '0.5rem', 
              bottom: '0.5rem',
              width: '2.5rem',
              transition: 'all 0.2s'
            }}
            disabled={!searchQuery.trim()}
          >
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
