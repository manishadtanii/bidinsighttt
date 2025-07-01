import React, { useState } from "react";

function FormPassword({
  label = "Password",
  placeholder = "e.g. m@rkJos6ph",
  name = "password",
  id = "password",
  delay = 100,
}) {
  const [passToggle, setPassToggle] = useState(false);

  return (
    <div>
      <div
        className="form-field flex flex-col mb-6 w-[100%] md:w-[90%]"
      >
        <label className="form-label font-t mb-3" htmlFor={id}>
          {label}
        </label>
        <div className="form-input-box relative">
          <input
            type={passToggle ? "text" : "password"}
            id={id}
            name={name}
            className="form-input font-t p-3 rounded-[20px] bg-transparent w-full"
            required
            placeholder={placeholder}
          />
          <i
            className={`far text-white fa-eye absolute top-[50%] right-4 transform -translate-y-1/2 cursor-pointer ${
              passToggle ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={() => setPassToggle(!passToggle)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default FormPassword;
