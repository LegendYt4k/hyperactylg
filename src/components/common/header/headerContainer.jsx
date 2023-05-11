import React, { useEffect, useState } from "react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";
import ResourceBox from "./components/resourceBox";
const HeaderContainer = ({ panelUser, user }) => {
  const [ram, setRam] = useState(0);
  const [disk, setDisk] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [servers, setServers] = useState(0);

  useEffect(() => {
    let totalRam = 0;
    let totalDisk = 0;
    let totalCpu = 0;
    let totalServers = 0;

    for (let i = 0; i < panelUser.relationships.servers.data.length; i++) {
      totalCpu += panelUser.relationships.servers.data[i].attributes.limits.cpu;
      totalRam +=
        panelUser.relationships.servers.data[i].attributes.limits.memory;
      totalDisk +=
        panelUser.relationships.servers.data[i].attributes.limits.disk;
      totalServers += 1;
    }

    setRam(totalRam);
    setDisk(totalDisk);
    setCpu(totalCpu);
    setServers(totalServers);
  }, [panelUser.relationships.servers.data]);
  return (
    <>
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-6">
              <div className="header-left d-flex align-items-center">
                <div className="menu-toggle-btn mr-20">
                  <button
                    id="menu-toggle"
                    className="main-btn primary-btn btn-hover"
                  >
                    <i id="menu-toggle i" className="lni lni-chevron-left me-2"></i> Menu
                  </button>
                </div>
                {settings.coins.enabled && (
                  <div
                  className="btn-sm">
                  <i className="fa-sharp fa-solid fa-coins"></i> Coins: {user.Coins}
                </div>
                )}
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-6">
              <div className="header-right">
                <div className="profile-box ml-15">
                  <button
                    className="dropdown-toggle bg-transparent border-0"
                    type="button"
                    id="profile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="profile-info">
                      <div className="info">
                        <h6>{user.Username}</h6>
                        <div className="image">
                          <img src={user.Type==="email" ? 'https://img.freepik.com/free-icon/user_318-790139.jpg?w=2000' : 'null'} />
                          <span className="status"></span>
                        </div>
                      </div>
                    </div>
                    <i className="lni lni-chevron-down"></i>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profile"
                  >
                    <li>
                      <a href="/regen">
                        <i className="fa-solid fa-lock"></i> Reset Password{" "}
                      </a>
                    </li>
                    <li>
                      <Link to={"/logout"} replace={true}>
                        <i className="lni lni-exit"></i> Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*  <% if (req.session.newaccount || req.session.password) { %>
    <% if (req.session.newaccount) { %>
    <div className="alert alert-default alert-dismissible fade show" role="alert">
        <span className="alert-icon"><i className="fas fa-plus-circle"></i></span>
        <span className="alert-text"><strong>Congratulations!</strong> A new account has been created for
            you on the Pterodactyl Panel</span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div className="alert-box info-alert">
        <div className="alert">
          <p><strong>Congratulations!</strong> A new account has been created for
            you on the Pterodactyl Panel</p>
        </div>
    </div>
    <% } %>
    <% if (req.session.password) { %>
    <div className="alert-box info-alert">
        <div className="alert">
          <p>
            Your <% if (!req.session.newaccount) { %>new <% } %>password is
            <code><%= req.session.password %></code>! Make sure to keep this password in a safe
            place
          </p>
        </div>
    </div>
    <% } %>
    <% } %> */}

      <section className="section">
        <div className="container-fluid">
          <div className="title-wrapper pt-30">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="title mb-30">
                  <h2>Welcome {user.Username}!</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <ResourceBox
                Name="Disk"
                Used={disk + "MB"}
                Icon="fa-regular fa-hard-drive"
                Total={settings.packages.list[user.Package].disk + "MB"}
              />
              <ResourceBox
                Name="Ram"
                Used={ram + "MB"}
                Icon="fa-solid fa-memory"
                Total={settings.packages.list[user.Package].ram + "MB"}
              />
              <ResourceBox
                Name="CPU"
                Used={cpu + "%"}
                Icon="fa-solid fa-microchip"
                Total={settings.packages.list[user.Package].cpu + "%"}
              />
              <ResourceBox
                Name="Servers"
                Used={servers}
                Icon="fa-solid fa-server"
                Total={settings.packages.list[user.Package].servers}
              />
            </div>
            <div className="card-style-2 mb-25">
              <div className="card-content">
                <h4>
                  Advertisement<a></a>
                </h4>
              </div>
              <div className="card-image">
                <a href="test">
                  <img src={settings.advertisements.custom} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderContainer;
