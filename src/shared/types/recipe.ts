export type Category = {
  id: number;
  documentId: string;
  name: string;
};

export type RecipeResponse = {
  id: number;
  documentId?: string;
  name?: string;
  preparationTime?: number;
  cookingTime?: number;
  totalTime?: number;
  servings?: number;
  rating?: number;
  likes?: number;
  calories?: number;
  images?: { url: string }[];
  summary?: string;
  description?: string;
  ingradients?: Array<{ name?: string; amount?: string; unit?: string } | string>;
  directions?: Array<{ text?: string; description?: string; step?: string }>;
  equipments?: Array<{ name?: string } | string>;
};

export type Recipe = {
  id: number;
  documentId: string;
  name: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  rating: number;
  reviewCount?: number;
  calories?: number;
  images: { url: string }[];
  description: string;
  ingredients: string[];
  instructions: string[];
  equipment?: string[];
};

export type Favorite = {
  id: number;
  documentId: string;
  recipe: {
    id: number;
    documentId: string;
    name: string;
    images?: { url: string }[];
    cookTime?: number;
    description?: string;
    calories?: number;
  };
};

