import React, { useState } from "react";

const InputItem = (props) => {
  return (
    <div className="input-wrap">
      <div className="input-title mt-4">{props.title}</div>
      {props.children}
      <input
        type="text"
        className="input-text "
        style={{
          width: "340px",
          backgroundColor: "#1E1E1E",
          marginTop: "10px",
          padding: "3px",
        }}
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
      />
    </div>
  );
};

export default InputItem;
