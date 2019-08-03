import React, {Component} from 'react';
import axios from 'axios';
import { Card, Badge, ProgressBar } from 'react-bootstrap';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

class Pokemon extends Component {
  state ={
    name: '',
    pokemonIndex: '',
    spriteURL: '',
    shinySpriteURL: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    eggGroups: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
  }

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params; 
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonRes = await axios.get(pokemonURL)
    const name = pokemonRes.data.name;
    const spriteURL = pokemonRes.data.sprites.front_default;
    const shinySpriteURL = pokemonRes.data.sprites.front_shiny;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;
    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;
    const types = pokemonRes.data.types.map(type => type.type.name);

    const abilities = pokemonRes.data.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', ');

      const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');

      await axios.get(pokemonSpeciesURL).then(res => {
        let description = '';
        res.data.flavor_text_entries.some(flavor => {
          if (flavor.language.name === 'en') {
            description = flavor.flavor_text;
            return;
          }
        });
        
        const femaleRate = res.data['gender_rate'];
        const genderRatioFemale = 12.5 * femaleRate;
        const genderRatioMale = 12.5 * (8 - femaleRate);
        const catchRate = res.data['capture_rate'];
        
        const eggGroups = res.data['egg_groups']
        .map(group => {
          return group.name
          .toLowerCase()
          .split(' ')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
        })
        .join(', ');
        
        const hatchSteps = 255 * (res.data['hatch_counter'] + 1);
        
        this.setState({
          description,
          genderRatioFemale,
          genderRatioMale,
          catchRate,
          eggGroups,
          hatchSteps
        });
      });

      this.setState({
        spriteURL,
        shinySpriteURL,
        pokemonIndex,
        name,
        types,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense
        },
        height,
        weight,
        abilities,
        evs
    });
  }

  render() {
    return(
      <div className='col'>
        <Card className='cardDetails col-md-8 mx-auto'>
          <Card.Header>
            <div className='row' style={{paddingTop: '10px'}}>
              <div className='col-5'>
                <h3>#{this.state.pokemonIndex}</h3>
              </div>
              <div className='col-7'>
                <div className='float-right'>
                  {this.state.types.map(type =>(
                    <Badge pill className='mr-1' style={{ backgroundColor: `#${[TYPE_COLORS[type]]}`, border: 'solid #d4d4d4 2px', color: 'white', fontSize: '20px'}}>
                      {type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className='row align-items-center'>
              <div className='col-md-2'>
                <img className='card-img-top rounded mx-auto' src={this.state.spriteURL} />
              </div>
              <div className='col-md-2'>
                <img className='card-img-top rounded mx-auto' src={this.state.shinySpriteURL} />
              </div>
              <div className='col-md-8'>
                <h3 className='mx-auto'>{this.state.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h3>
                <h5 style={{textDecoration: 'underline'}}>Base Stats</h5>
                <h6 style={{fontSize: '10px'}}>(Compared to Highest in Each Category)</h6>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>HP</div>
                  <div className='col-12 col-md-9'>
                    <ProgressBar now={this.state.stats.hp} label={`${this.state.stats.hp}`} max='255' />
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Attack</div>
                  <div className='col-12 col-md-9'>
                    <ProgressBar now={this.state.stats.attack} label={`${this.state.stats.attack}`} max='190' />
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Defense</div>
                  <div className='col-12 col-md-9'>
                    <ProgressBar now={this.state.stats.defense} label={`${this.state.stats.defense}`} max='230' />
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Special Attack</div>
                  <div className='col-12 col-md-9'>
                    <ProgressBar now={this.state.stats.specialAttack} label={`${this.state.stats.specialAttack}`} max='194' />
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Special Defense</div>
                  <div className='col-12 col-md-9'>
                    <ProgressBar now={this.state.stats.specialDefense} label={`${this.state.stats.specialDefense}`} max='230' />
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Speed</div>
                  <div className='col-12 col-md-9'>
                    <ProgressBar now={this.state.stats.speed} label={`${this.state.stats.speed}`} max='180' />
                  </div>
                </div>
              </div>
              <div className='row mt-3 align-items-center'>
                <div className="col-12">
                  <h5 className='mt-3 pl-5 pr-5' style={{textDecoration: 'underline'}}>Pokedex Description</h5>
                  <p className='pl-5 pr-5 font-weight-bold'>{this.state.description}</p>
                </div>
              </div>
            </div>
          </Card.Body>
          <hr />
          <Card.Body>
            <Card.Title className='text-center'>Profile</Card.Title>
            <div className='row'>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Height:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.height} ft.</h6>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Weight:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.weight} lbs.</h6>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Catch Rate:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.catchRate}</h6>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Gender Ratio:</h6>
                  </div>
                  <div className='col-md-6'>
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: '#c2185b'
                        }}
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {this.state.genderRatioFemale}
                      </div>
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: '#1976d2'
                        }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {this.state.genderRatioMale}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Egg Groups:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.eggGroups}</h6>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Hatch Steps:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.hatchSteps} steps</h6>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>Abilities:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.abilities}</h6>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <h6 className='float-right'>EVs:</h6>
                  </div>
                  <div className='col-md-6'>
                    <h6 className='float-left'>{this.state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className='text-muted'>
            Data From{' '}<a href="https://pokeapi.co/" target="_blank" className="card-link">PokeAPI.co</a>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}

export default Pokemon;