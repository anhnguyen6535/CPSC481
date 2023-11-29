import cheesePizzaImage from "./images/cheese-pizza.png";
import caesarSaladImage from "./images/caesar-salad.jpg";
import chocolateCakeImage from "./images/chocolate-cake.jpg";
import icedCoffeeImage from "./images/iced-coffee.jpg";
import capreseWrapImage from "./images/caprese-wrap.jpeg";
import greenTeaImage from "./images/green-tea.jpg";
import pepperoniPizzaImage from "./images/pepperoni-pizza.jpg";
import mangoSmoothieImage from "./images/mango-smoothie.jpg";
import tiramisuImage from "./images/tiramisu.jpg";
import vegetarianPizzaImage from "./images/vegetarian-pizza.jpg";
import margarita from "./images/margarita.jpg";
import whiskeySour from "./images/whiskey-sour.jpg";
import chickenAlfredoPasta from "./images/chicken-alfredo-pasta.jpg";
import grilledSalmon from "./images/grilled-salmon.jpg";

export const getFoodImageUri = (image: string) => {
  switch (image) {
    case "cheese-pizza.png":
      return cheesePizzaImage;
    case "caesar-salad.jpg":
      return caesarSaladImage;
    case "chocolate-cake.jpg":
      return chocolateCakeImage;
    case "iced-coffee.jpg":
      return icedCoffeeImage;
    case "caprese-wrap.jpeg":
      return capreseWrapImage;
    case "green-tea.jpg":
      return greenTeaImage;
    case "pepperoni-pizza.jpg":
      return pepperoniPizzaImage;
    case "mango-smoothie.jpg":
      return mangoSmoothieImage;
    case "tiramisu.jpg":
      return tiramisuImage;
    case "vegetarian-pizza.jpg":
      return vegetarianPizzaImage;
    case "margarita.jpg":
      return margarita;
    case "whiskey-sour.jpg":
      return whiskeySour;
    case "chicken-alfredo-pasta.jpg":
      return chickenAlfredoPasta;
    case "grilled-salmon.jpg":
      return grilledSalmon;
    default:
      return "";
  }
};
