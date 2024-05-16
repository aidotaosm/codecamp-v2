import { useEffect, useState } from "react";

export default function Increment() {
  const [stateVal, setStateVal] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  console.log(stateVal);

  useEffect(() => {
    console.log("window innerwidth", window.innerWidth);
    setWidth(window.innerWidth + stateVal);
    let resizer = () => {
      console.log(window.innerWidth, "window.innerWidth2");

      setWidth(window.innerWidth + stateVal);
    };
    window.addEventListener("resize", resizer);
    return () => {
      console.log("use effect cleanup initiated");
      window.removeEventListener("resize", resizer);
    };
  }, [stateVal]);

  return (
    <div
      onClick={() => {
        setStateVal(stateVal + 1);
      }}
    >
      {width}
      increment
    </div>
  );
}
