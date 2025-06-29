
import {PrismaClient} from '@prisma/client'
import fetch from 'node-fetch';

const prisma = new PrismaClient();

interface RickAndMortyCharacter {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: { name: string };
  occupation?: string;
}

interface RickAndMortyAPIResponse {
  results: RickAndMortyCharacter[];
}

async function main() {
  const response = await fetch('https://rickandmortyapi.com/api/character/?page=1');
  const data = await response.json() as RickAndMortyAPIResponse;

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