import { useContext } from "react";
import { IncrementContext } from "./AppContext";

const FooterComponent = () => {
  //console.log("footer component");
  let { setStateVal, stateVal } = useContext(IncrementContext);
  return (
    <footer className="flex justify-center">
      {/* <button
        onClick={() => {
          setStateVal(stateVal + 1);
        }}
        type="button"
      >
        Increment
      </button> */}
    </footer>
  );
};
export default FooterComponent;
