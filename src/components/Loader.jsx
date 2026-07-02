import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="loader">
      <ClipLoader
        size={45}
        color="#2563eb"
      />
    </div>
  );
}

export default Loader;