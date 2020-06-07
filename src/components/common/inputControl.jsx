import React from "react";

const InputControl = (props) => {
  const { label, name, value, type, onChange } = props;
  const id = "input-" + label;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className="form-control"
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

export default InputControl;
