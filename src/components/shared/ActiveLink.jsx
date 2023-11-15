import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, activeClass, defaultClass, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeClass : defaultClass)}>
      {children}
    </NavLink>
  );
};

export default ActiveLink;
