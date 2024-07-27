import CharacterService from '@/app/features/marvel/characters/service/character';
import api from '@/config/http';

export const characterService = new CharacterService(api)