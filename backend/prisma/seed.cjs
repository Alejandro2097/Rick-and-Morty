const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * @typedef {Object} RickAndMortyCharacter
 * @property {number} id
 * @property {string} name
 * @property {string} image
 * @property {string} species
 * @property {string} status
 * @property {string} gender
 * @property {{ name: string }} origin
 * @property {string=} occupation
 */

/**
 * @typedef {Object} RickAndMortyAPIResponse
 * @property {RickAndMortyCharacter[]} results
 */

async function main() {
  // Pide los primeros 15 personajes
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const response = await fetch('https://rickandmortyapi.com/api/character/?page=1');
  /** @type {RickAndMortyAPIResponse} */
  const data = await response.json();

  const characters = data.results.slice(0, 15);

  for (const char of characters) {
    let occupation = 'Unknown';
    if (char.name === 'Rick Sanchez') occupation = 'Scientist';
    else if (char.name === 'Morty Smith') occupation = 'Student';
    else if (char.name === 'Summer Smith') occupation = 'Student';
    else if (char.name === 'Beth Smith') occupation = 'Horse surgeon';
    else if (char.name === 'Jerry Smith') occupation = 'Unemployed';
    else if (char.name === 'Abadango Cluster Princess') occupation = 'Princess';

    await prisma.character.upsert({
      where: { id: char.id.toString() },
      update: {},
      create: {
        id: char.id.toString(),
        name: char.name,
        image: char.image,
        species: char.species,
        status: char.status,
        gender: char.gender,
        origin: char.origin.name,
        occupation,
      },
    });
  }

  console.log('✅ Base de datos poblada con 15 personajes');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 