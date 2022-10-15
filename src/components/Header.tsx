import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="Header">
      <h1 className="app-title">Plant Daddy</h1>
      <div className="page-links">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/plants/thirsty">
          <h2>Thirsty</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
