import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <button 
      onClick={handleLogout}
      className="btn btn-danger"
      style={{
        padding: "8px 16px",
        fontWeight: "bold"
      }}
    >
      🚪 Logout
    </button>
  );
}
