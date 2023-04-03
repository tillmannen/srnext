import axios from 'axios';

const baseUrl = 'https://api.sr.se/api/v2';

export interface Program {
  id: number;
  name: string;
  description: string;
  programimage: string;
}

export const fetchProgramsByCategory = async (category: string): Promise<Program[]> => {
  const response = await axios.get(`${baseUrl}/programs/index?filter=programcategory.name:${encodeURIComponent(category)}&format=json&pagination=false`);
  return response.data.programs;
};
