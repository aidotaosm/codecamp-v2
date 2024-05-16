import { FC, ReactNode } from "react";
import { MyNameListComponent } from "./MyNameListComponent";

export const MyFirstComponent: FC<{ children: ReactNode }> = ({ children }) => {
  console.log("F C");
  let aList = [
    { name: "Name one", age: 1 },
    { name: "Name two", age: 2 },
    { name: "Name three", age: 3 },
  ];
  return (
    <div className=" flex w-full items-center justify-center flex-col flex-grow">
      <div>
        <MyNameListComponent nameListArray={aList} />
        {children}
      </div>
    </div>
  );
};
