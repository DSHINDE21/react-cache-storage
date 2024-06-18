import { logout } from "../utils/auth";

// eslint-disable-next-line react/prop-types
const LogoutButton = ({ url }) => {
  const handleLogout = async () => {
    await logout(url);
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
