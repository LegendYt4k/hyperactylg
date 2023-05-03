import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <aside className="sidebar-nav-wrapper">
        <div className="navbar-logo">
          <a href="https://hyperactyl.com">
            <img
              src="https://media.discordapp.net/attachments/1077153552616661002/1078970384394756127/hyperactyl__1___1_-removebg-preview.png"
              alt="logo"
            />
          </a>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item nav-item-has-children">
              <a
                href="#0"
                data-bs-toggle="collapse"
                data-bs-target="#ddmenu_1"
                aria-controls="ddmenu_1"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon">
                  <svg width="22" height="22" viewBox="0 0 22 22">
                    <path d="M17.4167 4.58333V6.41667H13.75V4.58333H17.4167ZM8.25 4.58333V10.0833H4.58333V4.58333H8.25ZM17.4167 11.9167V17.4167H13.75V11.9167H17.4167ZM8.25 15.5833V17.4167H4.58333V15.5833H8.25ZM19.25 2.75H11.9167V8.25H19.25V2.75ZM10.0833 2.75H2.75V11.9167H10.0833V2.75ZM19.25 10.0833H11.9167V19.25H19.25V10.0833ZM10.0833 13.75H2.75V19.25H10.0833V13.75Z" />
                  </svg>
                </span>
                <span className="text">Dashboard</span>
              </a>
              <ul id="ddmenu_1" className="collapse show dropdown-nav">
                <li>
                  <Link to={"/"} replace={true}>
                    <i className="fa-solid fa-house"></i> Main{" "}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-item-has-children">
              <a
                href="#0"
                className="collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#ddmenu_2"
                aria-controls="ddmenu_2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon">
                  <i className="fa-solid fa-server"></i>
                </span>
                <span className="text">Server</span>
              </a>
              <ul id="ddmenu_2" className="collapse dropdown-nav">
                <li>
                  <Link to={"/servers/new"}>
                    <i className="fa-solid fa-plus"></i> Create a Server{" "}
                  </Link>
                </li>
                <li>
                  <a href="/servers">
                    <i className="fa-solid fa-server"></i> Your Servers{" "}
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-item-has-children">
              <a
                href="#0"
                className="collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#ddmenu_3"
                aria-controls="ddmenu_3"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon">
                  <i className="fa-solid fa-coins"></i>
                </span>
                <span className="text">Resources</span>
              </a>
              <ul id="ddmenu_3" className="collapse dropdown-nav">
                <li>
                  <Link to={'/afk'} replace={true}>
                    <i className="fa-solid fa-money-bill"></i> Afk
                  </Link>
                </li>
                <li>
                  <a href="/store">
                    <i className="fa-solid fa-store"></i> Store{" "}
                  </a>
                </li>

                <li>
                  <a href="/refer">
                    <i className="fa-sharp fa-solid fa-user-plus"></i> Referel{" "}
                  </a>
                </li>
                <li>
                  <a href="/redeem">
                    <i className="fa-solid fa-gift"></i> Redeem
                  </a>
                </li>
              </ul>
              <li className="nav-item">
                <a href="/admin">
                  <span className="icon">
                    <i className="fas fa-user-shield text-red"></i>
                  </span>
                  <span className="text">Admin</span>
                </a>
              </li>
            </li>
            <span className="divider">
              <hr />
            </span>
            <li className="nav-item nav-item-has-children">
              <a
                href="#0"
                className="collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#ddmenu_4"
                aria-controls="ddmenu_4"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon">
                  <i className="fa-solid fa-cloud"></i>
                </span>
                <span className="text">Nodes</span>
              </a>
              <ul id="ddmenu_4" className="collapse dropdown-nav">
                <li>
                  <a href="/nodes">
                    <i className="fa-solid fa-cloud"></i> Nodes Status{" "}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="promo-box">
          <h3>Powered By Hyperactyl</h3>
          <p>The Best Dashboard For Splitting Resources In Pterodactyl</p>
          <a
            href="https://github.com/hyperactyl/hyperactyl"
            target="_blank"
            rel="nofollow noreferrer"
            className="main-btn primary-btn btn-hover"
          >
            Github
          </a>
        </div>
      </aside>
      <div className="overlay"></div>
    </>
  );
};

export default NavBar;
