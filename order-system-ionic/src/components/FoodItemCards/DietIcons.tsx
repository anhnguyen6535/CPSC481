import { LuVegan } from "react-icons/lu";
import Icon from "@mdi/react";
import { mdiFoodHalal, mdiBarleyOff, mdiFish, mdiPeanutOff } from "@mdi/js";
import { Diet } from "../../types";

interface DietProps {
  diets: Diet;
}

const DietIcons: React.FC<DietProps> = ({diets}) => {
  return (
    <div style={{ display: "flex", paddingTop: "0.5rem" }}>
      {/* {diets.vegan ? <LuVegan style={{ marginRight: "0.1rem" }} /> : null} */}
      {diets.vegetarian ? <LuVegan style={{ marginRight: "0.1rem" }} /> : null}
      {diets.glutenFree ? <Icon path={mdiBarleyOff} size={0.6} /> : null}
      {diets.halal ? <Icon path={mdiFoodHalal} size={0.6} /> : null}
      {diets.pescatarian ? <Icon path={mdiFish} size={0.6} /> : null}
      {diets.nutFree ? <Icon path={mdiPeanutOff} size={0.6} /> : null}
    </div>
  );
};

export default DietIcons;
export type { DietProps };
