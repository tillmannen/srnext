import axios from "axios";

const baseUrl = "https://api.sr.se/api/v2";

export interface Program {
  id: number;
  name: string;
  description: string;
  programimage: string;
}

const replaceSwedishCharacters = (input: string): string => {
  return input.replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o");
};

const findBestMatchingCategory = (
  urlCategory: string,
  categories: Category[]
): Category | undefined => {
  return categories.find((category) => {
    const categoryName = replaceSwedishCharacters(category.name.toLowerCase());
    return categoryName.startsWith(urlCategory);
  });
};

export const fetchProgramsByCategory = async (
  urlCategory: string
): Promise<Program[]> => {
  const categories = await fetchCategories();
  const bestMatchingCategory = findBestMatchingCategory(
    urlCategory,
    categories
  );

  if (!bestMatchingCategory) {
    return [];
  }

  const response = await axios.get(
    `${baseUrl}/programs/index?programcategoryid=${bestMatchingCategory.id}&format=json&pagination=false`
  );
  return response.data.programs;
};

export interface Category {
  id: number;
  name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(
    `${baseUrl}/programcategories?format=json&pagination=false`
  );
  return response.data.programcategories;
};
