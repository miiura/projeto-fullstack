import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token"); // Remove o token
    navigate("/login");               // Vai para a página de login
  }

  return (
    <button 
      onClick={handleLogout}
      style={{
        padding: "8px 14px",
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Logout
    </button>
  );
}
