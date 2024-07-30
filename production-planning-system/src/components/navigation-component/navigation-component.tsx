import { Link } from "react-router-dom";
import { NavItem } from "../../utils/constants/constants";

interface NavigationProps {
  items: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;