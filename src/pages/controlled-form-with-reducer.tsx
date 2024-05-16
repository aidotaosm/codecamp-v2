import { IncrementContext } from "@/components/practice/AppContext";
import { FormEvent, Reducer, useContext, useReducer, useState } from "react";

const ControlledForm = () => {
  let { profile, profileDispatch } = useContext(IncrementContext);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(profile._age, profile._name, profile._password);
  };
  return (
    <div className="flex justify-center">
      <form className="p-5" onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onKeyUp={(e) => {
              profileDispatch({
                type: "update-name",
                value: e.currentTarget.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={(e) => {
              profileDispatch({
                type: "update-age",
                value: +e.currentTarget.value,
              });
            }}
            onKeyUp={(e) => {
              profileDispatch({
                type: "update-age",
                value: +e.currentTarget.value,
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            onKeyUp={(e) => {
              profileDispatch({
                type: "update-password",
                value: e.currentTarget.value,
              });
            }}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default ControlledForm;
