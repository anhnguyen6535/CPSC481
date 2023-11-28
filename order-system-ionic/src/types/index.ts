export interface Diet {
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
  halal: boolean;
  pescatarian: boolean;
  nutFree: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  imagePath: string;
  price: number;
  labels: string[];
  diets: Diet;
  isAlcoholic?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}
