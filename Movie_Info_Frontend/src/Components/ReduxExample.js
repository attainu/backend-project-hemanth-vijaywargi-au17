import React, { useState } from "react";
import { changeMessage } from "../Store";
import { useDispatch, useSelector } from "react-redux";

export default function ReduxExample() {
  let message = useSelector((state) => {
    return state.message;
  });
  let dispatcher = useDispatch();
  const [input, setInput] = useState("");

  const handleClick = () => {
    let action = changeMessage(input);
    dispatcher(action);
  };

  return (
    <>
      <h1 className="text-4xl">{message}</h1>
      <input
        className="bg-gray-400 text-black placeholder-black"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="input text here..."
      />
      <button className="hover:bg-gray-300" onClick={handleClick}>Change Text</button>
    </>
  );
}
