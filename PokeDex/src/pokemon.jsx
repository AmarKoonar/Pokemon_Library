import React, { useState, useEffect } from 'react';
import './pokemon.css';

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemoncardList, setPokemoncardList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showpokemoncard, setshowpokemoncard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [priceData, setPriceData] = useState({});

  const pokemonTypes = [
    'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'
  ];

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then((response) => response.json())
      .then((data) => {
        const fetchPokemonDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(fetchPokemonDetails).then((detailedData) => {
          setPokemonList(detailedData);
          setLoading(false);
        });
      })
      .catch(error => {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      });
  }, []);

  const fetchCardPrices = async (cards) => {
    const prices = {};
    await Promise.all(cards.map(card =>
      fetch(`https://api.pokemontcg.io/v2/cards/${card.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.data?.tcgplayer?.prices) {
            prices[card.id] = data.data.tcgplayer.prices;
          }
        })
        .catch(err => console.error(`Price error for ${card.id}:`, err))
    ));
    return prices;
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
    setshowpokemoncard(false);
    setPokemoncardList([]);
  };

  const handlePokemoncardshow = async () => {
    if (!showpokemoncard) {
      const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"${selectedPokemon.name}"&pageSize=10`);
      const data = await res.json();
      const cards = data.data || [];
      setPokemoncardList(cards);

      const prices = await fetchCardPrices(cards);
      setPriceData(prices);
    }
    setshowpokemoncard(!showpokemoncard);
  };

  const closeModal = () => {
    setShowModal(false);
    setPokemoncardList([]);
    setshowpokemoncard(false);
  };

  const getClassName = (type) => {
    const classes = {
      fire: 'text-bg-danger', grass: 'text-bg-success', water: 'text-bg-primary',
      electric: 'text-bg-warning', ice: 'text-bg-info', dark: 'text-bg-dark',
    };
    return `badge rounded-pill ${classes[type] || `badge-${type}`}`;
  };

  const getColor = (type) => {
    const colors = {
      fire: '#FFD1C1', grass: '#D3EEC2', water: '#C3DFFE', electric: '#FFF2CC',
      bug: '#E5F2A0', normal: '#E8E8D5', poison: '#E1C7E1', fairy: '#FDE0EF',
      fighting: '#F7C4C4', psychic: '#FFCCE5', ground: '#EEDCC7', rock: '#E0D3A8',
      ghost: '#D7CDE5', dark: '#D1C7C0', steel: '#D6D8DC', ice: '#D8F5F5',
      dragon: '#E3D4FD', flying: '#E1F0FF'
    };
    return colors[type] || '#ECECEC';
  };

  const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
  const formatId = id => id.toString().padStart(4, '0');

  const filteredPokemon = pokemonList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || filterType === 'all' || p.types.some(t => t.type.name === filterType))
  );

  const getRandomPokemon = () => {
    const rand = Math.floor(Math.random() * pokemonList.length);
    handlePokemonClick(pokemonList[rand]);
  };

  return (
    <div className="container pokemon-container">
      <div className="row mb-4 mt-4">
        <div className="col-md-6">
          <input className="form-control" placeholder="Search Pokémon..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            {pokemonTypes.map(type => <option key={type} value={type}>{capitalizeFirstLetter(type)}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={getRandomPokemon}>Random</button>
        </div>
      </div>

      {loading && <div className="text-center my-5"><div className="spinner-border"></div><p>Loading Pokémon data...</p></div>}

      <div className="row">
        {filteredPokemon.map(pokemon => (
          <div key={pokemon.id} className="col-12 col-md-4 col-lg-3 mb-4">
            <div className="p-4 rounded-lg pokemon-card position-relative"
              style={{ backgroundColor: getColor(pokemon.types[0].type.name), cursor: 'pointer' }}
              onClick={() => handlePokemonClick(pokemon)}
            >
              {/* ✅ Centered ID */}
              <span
                className="position-absolute w-100 text-center"
                style={{
                  fontSize: '6rem',
                  color: 'rgba(0, 0, 0, 0.05)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                {formatId(pokemon.id)}
              </span>

              {/* Card Content Above ID */}
              <div className="d-flex align-items-center position-relative" style={{ zIndex: 1 }}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} width="80" height="80" className="me-3" />
                <div>
                  <span className={getClassName(pokemon.types[0].type.name)}>{capitalizeFirstLetter(pokemon.name)}</span>
                  <div className="mt-2">
                    {pokemon.types.map((t, i) => (
                      <span key={i} className={`me-1 ${getClassName(t.type.name)}`}>{capitalizeFirstLetter(t.type.name)}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPokemon.length === 0 && !loading && (
        <div className="alert alert-info text-center">No Pokémon found matching your search.</div>
      )}

      {showModal && selectedPokemon && (
  <div className="pokemon-modal">
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content" style={{ backgroundColor: getColor(selectedPokemon.types[0].type.name) }}>
          <div className="modal-header">
            <h5 className="modal-title">{capitalizeFirstLetter(selectedPokemon.name)}</h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 text-center">
                <img src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default}
                     width="200" height="200" alt="Artwork" />
                <p><strong>ID:</strong> {formatId(selectedPokemon.id)}</p>
                <p><strong>Type:</strong> {selectedPokemon.types.map((t, i) => (
                  <span key={i} className={`ms-1 ${getClassName(t.type.name)}`}>{capitalizeFirstLetter(t.type.name)}</span>
                ))}</p>
                <p><strong>Height:</strong> {selectedPokemon.height / 10} m</p>
                <p><strong>Weight:</strong> {selectedPokemon.weight / 10} kg</p>
              </div>
              <div className="col-md-6">
                <h6>Base Stats</h6>
                {selectedPokemon.stats.map((stat, i) => (
                  <div key={i} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{capitalizeFirstLetter(stat.stat.name)}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar"
                           style={{ width: `${Math.min(100, stat.base_stat / 150 * 100)}%` }}>
                      </div>
                    </div>
                  </div>
                ))}
                <h6 className="mt-3">Abilities</h6>
                <ul className="list-group">
                  {selectedPokemon.abilities.map((a, i) => (
                    <li key={i} className="list-group-item bg-transparent border-0 p-1">
                      {capitalizeFirstLetter(a.ability.name)}
                      {a.is_hidden && <span className="ms-2 badge bg-secondary">Hidden</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

                      {/* Cards Section */}
                      <div className="mt-4">
                        <button className={`btn ${getClassName(selectedPokemon.types[0].type.name)}`} onClick={handlePokemoncardshow}>
                          {showpokemoncard ? 'Hide' : 'Show'} Pokémon Cards
                        </button>

                        {showpokemoncard && (
                          <div className="mt-3">
                            {pokemoncardList.length > 0 ? (
                              <div className="row">
                                {pokemoncardList.map((card, i) => {
                                  const hasImage = card?.images?.large;
                                  const setName = card?.set?.name || 'Unknown Set';
                                  const artist = card?.artist || 'Unknown Artist';
                                  const cardPrices = priceData[card.id];

                                  return hasImage ? (
                                    <div key={i} className="col-md-4 mb-3">
                                      <div className="card h-100 bg-info">
                                        <img src={card.images.large} className="card-img-top" alt={card.name || 'Card Image'} />
                                        <div className="card-body">
                                          <h6>{card.name || 'Unnamed Card'}</h6>
                                          <p>Set: {setName}</p>
                                          <p>Artist: {artist}</p>
                                          {cardPrices && (
                                            <div className="mt-2">
                                              {Object.entries(cardPrices).map(([type, val]) => (
                                                <div key={type}>
                                                  <small>{capitalizeFirstLetter(type)}:</small>
                                                  <span className="ms-1 badge bg-success">
                                                    ${val.market?.toFixed(2) || val.mid?.toFixed(2) || 'N/A'}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            ) : (
                              <div className="alert alert-info">No cards found.</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}

export default Pokemon;
