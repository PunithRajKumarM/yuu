import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import LoginSignup from "../loginSignup/LoginSignup";

// home component
function Home() {
  const { isLoggedIn } = useContext(AuthenticationContext);
  return <>{!isLoggedIn && <LoginSignup />}</>;
}

export default Home;
