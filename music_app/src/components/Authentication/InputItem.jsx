import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
const InputItem = (props) => {
  return (
    <div className="input-wrap">
      <div className="input-title">{props.title}</div>
      {props.children}
      <div className="relative">
        <input
          type={props.show == null ? 'text' : (props.show ? 'test' : 'password')}
          className="input-text"
          value={props.valueInput}
          onChange={(e) => props.setValueInput(e.target.value)}
          required
        />
        {
          props.show != null && (<span className="absolute top-0 right-0 translate-y-full translate-x-full cursor-pointer text-white pl-2"> {props.show ? <FaRegEye className="w-[30px] h-[30px]" onClick={() => props.setShow((prev) => !prev)} /> : <IoEyeOffOutline className="w-[30px] h-[30px]" onClick={() => props.setShow((prev) => !prev)} />}</span>)
        }

      </div>
    </div>
  );
};

export default InputItem;
