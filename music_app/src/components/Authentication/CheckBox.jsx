import React, { useState, useEffect } from "react";
const CheckBox = (props) => {
  const { boolean } = props;
  const [isChecked, setIsChecked] = useState(boolean);
  useEffect(() => {
    setIsChecked(boolean);
  }, [boolean]);
  return (
    <div className="checkbox-container">
      <div className={`circle ${isChecked ? "checked" : ""}`}>
        {isChecked && <span className="checkmark">✔</span>}{" "}
      </div>
      <span className="checkBox-title">{props.title}</span>
    </div>
  );
};

export default CheckBox;
