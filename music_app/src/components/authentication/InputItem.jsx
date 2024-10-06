import React, { useState } from "react";

const InputItem = (props) => {
  return (
    <div className="input-wrap">
      <div className="input-title">{props.title}</div>
      {props.children}
      <input
        type="text"
        className="input-text"
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
      />
    </div>
  );
};

export default InputItem;
