import { FC, ReactNode } from "react";

export const MyNameListComponent: FC<{ nameListArray?: NameAge[] }> = ({
  nameListArray,
}) => {
  console.log("MNL C");
  return (
    <div>
      Name Age List
      <ul className="p-5">
        {nameListArray?.map((x) => {
          return <li key={x.name}>{x.name + " - " + x.age}</li>;
        })}
      </ul>
    </div>
  );
};
