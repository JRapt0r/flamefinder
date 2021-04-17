import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Flame, Hamburger, Close } from "../Components/Icons";

function NavItem({ children: name, route, onClick }) {
  return (
    <NavLink to={route}>
      <div onClick={onClick} className="px-3 py-2 font-medium transition-colors ease-out rounded-lg hover:bg-white hover:bg-opacity-10">
        {name}
      </div>
    </NavLink>
  );
}

function Navbar({ children: navItems }) {
  const [menuToggled, setMenuToggle] = useState(false);

  const toggle_menu = () => {
    setMenuToggle(!menuToggled);
  }

  return (
    <nav className="p-4 text-white bg-gradient-to-bl from-sapphire to-indigo-700">
      <div className="flex flex-row items-center justify-between">

        {/* Brand */}
        <NavLink to="/">
          <div className="flex flex-row items-center">
            <div className="mr-2"><div className="sr-only">Home</div><Flame size={28} /></div>
            <div className="text-2xl tracking-wide font-brand">FlameFinder</div>
          </div>
        </NavLink>

        {/* Hamburger menu */}
        <button aria-label="Toggle menu" onClick={toggle_menu} className="flex sm:hidden focus:outline-none">
          {menuToggled ? <Close size={28} /> : <Hamburger size={28} />}
        </button>

        {/* Desktop nav */}
        <div className="flex-row hidden space-x-2 sm:flex font-sm">
          {navItems}
        </div>
      </div>

      {/* Mobile nav */}
      {menuToggled && <div className="flex flex-col mt-3 text-center sm:hidden">{navItems.map(({ props }, i) => <NavItem key={i} {...props} onClick={toggle_menu} />)}</div>}
    </nav>
  );
}

export { Navbar, NavItem };