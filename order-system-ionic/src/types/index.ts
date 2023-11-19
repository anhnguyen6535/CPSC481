export interface Diet {
  vegan: boolean;
  vegetarian: boolean;
  glutenFree: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
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
