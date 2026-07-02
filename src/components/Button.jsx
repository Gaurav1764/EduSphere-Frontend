import { ClipLoader } from "react-spinners";

function Button({
  title,
  icon,
  loading = false,
  type = "submit",
  onClick,
}) {
  return (
    <button
      type={type}
      className="auth-btn"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <ClipLoader
          size={22}
          color="#ffffff"
        />
      ) : (
        <>
          {icon && (
            <span className="btn-icon">
              {icon}
            </span>
          )}

          <span>{title}</span>
        </>
      )}
    </button>
  );
}

export default Button;