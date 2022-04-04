// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const button = document.getElementById("button");
const input = document.getElementById("input");
const PokeHp = document.getElementById("hp");
const PokeAtk = document.getElementById("atk");
const PokeDef = document.getElementById("def");
const PokeSatk = document.getElementById("satk");
const PokeSdef = document.getElementById("sdef");
const PokeSpd = document.getElementById("spd");
const PokeMoves = document.getElementById("moves-list");


// constants and variables
const TYPES = [
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
];


// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};



button.onclick = () => {
    let pokeName = input.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(res => res.json())
    .then(data => {
      resetScreen();

      const dataTypes = data['types'];
      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
      if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide');
        pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
      } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
      }
      mainScreen.classList.add(dataFirstType['type']['name']);

      pokeId.textContent = capitalize(data['name']) + " " + '#' + data['id'].toString().padStart(3, '0');
      pokeWeight.textContent = data['weight'];
      pokeHeight.textContent = data['height'];
      pokeFrontImage.src = data['sprites']['front_default'] || '';
      pokeBackImage.src = data['sprites']['back_default'] || '';
      printPokeStats(data);
      printPokeMoves(data);


    });

    const printPokeStats = (data) => {
        PokeHp.innerText = data.stats[0].base_stat;
        PokeAtk.innerText = data.stats[1].base_stat;
        PokeDef.innerText = data.stats[2].base_stat;
        PokeSatk.innerText = data.stats[3].base_stat;
        PokeSdef.innerText = data.stats[4].base_stat;
        PokeSpd.innerText = data.stats[5].base_stat; 
    }

    const printPokeMoves = (data) => {
        let moves = data.moves;
        PokeMoves.innerHTML = "";
    
        for (let i = 0; i < 5; i++) {
            const move = document.createElement("li");
            PokeMoves.appendChild(move);
    
            move.innerText = moves[i].move.name;
        }
    }
};
