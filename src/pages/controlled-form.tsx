import { IncrementContext } from "@/components/practice/AppContext";
import { FormEvent, useContext, useState } from "react";

const ControlledForm = () => {
  console.log("Controlled Form component");
  const { notificationIsOpen, setNotificationToggle } =
    useContext(IncrementContext);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, age, password);
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
              setName(e.currentTarget.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            onKeyUp={(e) => {
              setAge(+e.currentTarget.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            onKeyUp={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>
        <button>Submit</button>
      </form>
      Notification Is Open {notificationIsOpen + ""}
      <button
        onClick={() => {
          setNotificationToggle(!notificationIsOpen);
        }}
      >
        setNotificationToggle
      </button>
    </div>
  );
};
export default ControlledForm;
