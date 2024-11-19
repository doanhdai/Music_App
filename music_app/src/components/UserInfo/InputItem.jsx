import React, { useState } from "react";

const InputItem = (props) => {
  // const type_input = props.type_input =="text" ? "text" : "password";
  return (
    <div className="input-wrap">
      <div className="input-title mt-4">{props.title}</div>
      {props.children}
      <input
        type={props.type_input}
        className="input-text "
        style={{
          width: "340px",
          backgroundColor: "#1E1E1E",
          marginTop: "10px",
          padding: "3px",
        }}
        value={props.valueInput}
        onChange={(e) => props.setValueInput(e.target.value)}
      />
    </div>
  );
};

export default InputItem;
