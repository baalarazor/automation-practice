import { NavLink } from "react-router-dom";

export default function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "nav-item" + (isActive ? " nav-item-active" : "")
      }
    >
      {children}
    </NavLink>
  );
}
