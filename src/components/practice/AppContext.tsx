import React, { Dispatch, FC, Reducer, useReducer } from "react";
import { ReactNode, createContext, useState } from "react";
interface stateModel {
  _name: string;
  _age: number;
  _password: string;
}
interface actionModel {
  type: "update-name" | "update-age" | "update-password";
  value: string | number;
}
interface IncrementCOntext {
  stateVal: number;
  setStateVal: (param: number) => void;

  notificationIsOpen: boolean;
  setNotificationToggle: (param: boolean) => void;
  profile: stateModel;
  profileDispatch: Dispatch<actionModel>;
}

export const IncrementContext = createContext<IncrementCOntext>({
  stateVal: 0,
  setStateVal: (param: number) => {},
  notificationIsOpen: false,
  setNotificationToggle: (param: boolean) => {},
  profile: { _age: 9, _name: "", _password: "" },
  profileDispatch: () => {},
});
export const AppContextComponent: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stateVal, setStateVal] = useState<number>(0);
  const [notificationIsOpen, setNotificationToggle] = useState<boolean>(false);

  const profileReducer = (state: stateModel, action: actionModel) => {
    switch (action.type) {
      case "update-name":
        return { ...state, _name: action.value as string };
      case "update-age":
        state._age = action.value as number;
        return { ...state };
      case "update-password":
        return { ...state, _password: action.value as string };
      default:
        return state;
    }
  };
  const [profile, profileDispatch] = useReducer<
    Reducer<stateModel, actionModel>
  >(profileReducer, {
    _name: "",
    _age: 0,
    _password: "",
  });

  //console.log(stateVal);
  return (
    <IncrementContext.Provider
      value={{
        stateVal,
        setStateVal,
        setNotificationToggle,
        notificationIsOpen,
        profileDispatch,
        profile,
      }}
    >
      {children}
    </IncrementContext.Provider>
  );
};
