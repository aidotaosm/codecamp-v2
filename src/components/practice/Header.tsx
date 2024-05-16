import { useContext } from "react";
import { IncrementContext } from "./AppContext";

const HeaderComponent = () => {
  console.log("heaer component");
  let { stateVal, setStateVal } = useContext(IncrementContext);
  return (
    <header className="flex justify-center">
      <div>{/* <p> state variable {stateVal}</p> */}</div>
    </header>
  );
};
export default HeaderComponent;
