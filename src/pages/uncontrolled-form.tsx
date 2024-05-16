import { FormEvent, useRef, useState } from "react";

const UncontrolledControlledForm = () => {
  const name = useRef<HTMLInputElement | null>(null);
  const age = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      name.current?.value,
      age.current?.value,
      password.current?.value
    );
  };
  return (
    <div className="flex justify-center">
      <form className="p-5" onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            ref={name}
            // onKeyUp={(e) => {
            //   setName(e.currentTarget.value);
            // }}
          />
        </div>
        <div className="mb-3">
          <label>Age</label>
          <input type="number" name="age" ref={age} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" ref={password} />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default UncontrolledControlledForm;
