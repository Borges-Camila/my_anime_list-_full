import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Header({ search, setSearch }) {
  const location = useLocation();

  const showSearchBar = ["/", "/profile"].includes(location.pathname);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="logo do site" className="header__logo-img" />
          <Link to="/" className="header__logo-title">
            MyAnimeList
          </Link>
        </div>

        {showSearchBar && (
          <div className="search-box">
            <input
              className="search-box__input"
              type="search"
              placeholder="Pesquise seu anime..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <span className="search-box__icon">🔍</span>
          </div>
        )}

        <nav className="header__nav">
          <Link to="/about" className="header__nav-item">
            <span className="header__nav-text">Sobre</span>
          </Link>
          <Link to="/signin" className="header__nav-item">
            <span className="header__nav-text">Entrar</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
