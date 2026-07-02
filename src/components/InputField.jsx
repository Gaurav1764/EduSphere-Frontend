import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputField({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  icon,
  error = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="input-wrapper">

      <label className="input-label">
        {label}
      </label>

      <div className={`input-box ${error ? "input-error" : ""}`}>

        <span className="input-icon">
          {icon}
        </span>

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          required
        />

        {isPassword && (
          <span
            className="password-toggle"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </span>
        )}

      </div>

      {error && (
        <small className="error-text">
          {error}
        </small>
      )}

    </div>
  );
}

export default InputField;