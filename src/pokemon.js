
import React, { useState, useEffect } from 'react';
import './pokemon.css'
function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemoncardList, setPokemoncardList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showpokemoncard, setshowpokemoncard] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then((response) => response.json())
      .then((data) => {
        const fetchPokemonDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        
        Promise.all(fetchPokemonDetails).then((detailedData) => {
          setPokemonList(detailedData);
        });
      });
  }, []);

  
  const getClassName = (type) =>{
    if(type === 'fire'){
      return 'badge rounded-pill text-bg-danger';
    }
    if(type === 'grass'){
      return 'badge rounded-pill text-bg-success';
    }
    if(type === 'water'){
      return 'badge rounded-pill text-bg-primary';
    }
    if(type === 'electric'){
      return 'badge rounded-pill text-bg-warning';
    }
    if(type === 'bug'){
      return 'badge rounded-pill badge-bug';
    }
    if(type === 'normal'){
      return 'badge rounded-pill badge-normal';
    }
    if(type === 'poison'){
      return 'badge rounded-pill badge-poison';
    }
    if(type === 'poison'){
      return 'badge rounded-pill badge-poison';
    }
    if(type === 'fairy'){
      return 'badge rounded-pill badge-fairy';
    }
    if(type === 'fighting'){
      return 'badge rounded-pill badge-fighting';
    }
    if(type === 'psychic'){
      return 'badge rounded-pill badge-psychic';
    }
    if(type === 'ground'){
      return 'badge rounded-pill badge-ground';
    }
    if(type === 'rock'){
      return 'badge rounded-pill badge-rock';
    }
    if(type === 'ghost'){
      return 'badge rounded-pill badge-ghost';
    }
    if(type === 'dark'){
      return 'badge rounded-pill  text-bg-dark';
    }
    if(type === 'steel'){
      return 'badge rounded-pill  badge-steel';
    }
    if(type === 'ice'){
      return 'badge rounded-pill text-bg-info';
    }
    if(type === 'dragon'){
      return 'badge rounded-pill badge-dragon';
    }
    
    
  }
  const getColor = (type) => {
    if (type === 'fire') return '#FFD1C1';
    if (type === 'grass') return '#D3EEC2';
    if (type === 'water') return '#C3DFFE';
    if (type === 'electric') return '#FFF2CC'; 
    if (type === 'bug') return '#E5F2A0'; 
    if (type === 'normal') return '#E8E8D5'; 
    if (type === 'poison') return '#E1C7E1'; 
    if (type === 'fairy') return '#FDE0EF'; 
    if (type === 'fighting') return '#F7C4C4'; 
    if (type === 'psychic') return '#FFCCE5'; 
    if (type === 'ground') return '#EEDCC7';
    if (type === 'rock') return '#E0D3A8'; 
    if (type === 'ghost') return '#D7CDE5';    
    if (type === 'dark') return '#D1C7C0';     
    if (type === 'steel') return '#D6D8DC';    
    if (type === 'ice') return '#D8F5F5';       
    if (type === 'dragon') return '#E3D4FD';    
    return '#ECECEC';                           
  };
  const formatId = (id) => {
    return id.toString().padStart(4, '0');

  }
  const handlePokemonClick = (pokemon) => {
    fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemon.name}`).then(response => response.json()).then(data => {
      setPokemoncardList(data.data);
      console.log(data);
    });
    setSelectedPokemon(pokemon);
    setShowModal(true);
    console.log("here");
    
  };
  const handlePokemoncardshow = () =>{
    if(showpokemoncard === true)
    {
      setshowpokemoncard(false);
    }
    else{
      setshowpokemoncard(true);
    }
    
  }
  const closeModal = () =>{
    setShowModal(false);
    setPokemoncardList([]);
    setshowpokemoncard(false);
  }
  const capitalizeFirstLetter = (string) =>{
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }
  return (
    <div className="container" >
      <div className="row">
        {pokemonList.map((pokemon) => (
          <div className="col-12 col-md-4 mb-4" key={pokemon.id}>
            <div
              className="p-4 bg-gray-200 rounded-lg position-relative cursor-pointer"
              onClick={() => handlePokemonClick(pokemon)}
              style={{ fontSize: '1.25rem', overflow: 'hidden', position: 'relative' }}
            >
              {/* Background Text */}
              <span
                className="position-absolute"
                style={{
                  fontSize: '8rem',
                  color: 'rgba(0, 0, 0, 0.1)', 
                  top: '-10%',
                  left: '0%',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                {formatId(pokemon.id)}
              </span>

              {/* Foreground Content */}
              
              <div href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                <img
                  src={pokemon.sprites.front_default}
                  alt={capitalizeFirstLetter(pokemon.name)}
                  className="me-3"
                  style={{ width: '100px', height: '100px' }}
                />
                <span className={getClassName(pokemon.types[0].type.name)}>
                  {capitalizeFirstLetter(pokemon.name)}
                </span>
              </div>
              
            </div>
          </div>

        ))}
      </div>
      {/* Modal */}
      {showModal && (
      <div className = "pokemon">
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor:  'rgba(0,0,0,0.5)' }} > 
          <div className="modal-dialog modal-dialog-centered" role="document"   >
            <div className="modal-content"style={{ backgroundColor:  getColor(selectedPokemon.types[0].type.name) }}>
              <div className="modal-header">
                <h5 className="modal-title">{capitalizeFirstLetter(selectedPokemon?.name)}</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <img src={selectedPokemon?.sprites.front_default} alt={selectedPokemon?.name} style={{ width: '100px', height: '100px' }} />
                  <p>ID: {formatId(selectedPokemon.id)}</p>
                  <p>Type: {selectedPokemon?.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
                  <p>Height: {selectedPokemon?.height/10} meters</p>
                  <p>Weight: {selectedPokemon?.weight/10} kg</p>
                </div>
                <button type="button" onClick={() => handlePokemoncardshow()} className = {getClassName(selectedPokemon.types[0].type.name)}>show pokemon cards</button>
                {showpokemoncard && pokemoncardList.length > 0 && pokemoncardList[3].images?.large && (
                  <ul className="text-center mt-3 list-group list-group-flush">
                    {pokemoncardList.map((card,index) => (
                      <div key={index} className="text-center mt-3">
                      <img
                        src={card.images?.large}
                        alt="Pokemon Card"
                        style={{ width: '150px', height: '200px' }}
                      />
                      <div>
                        Artist: {pokemoncardList[index].artist}
                      
                      </div>
                      <div>
                        ⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺⸺
                      </div>

                    </div>
                    ))}
                    
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
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