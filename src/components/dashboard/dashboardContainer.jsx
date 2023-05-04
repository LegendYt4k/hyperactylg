import React, { useLayoutEffect, useEffect } from "react";
import NavBar from "../common/navBar";
import Header from "../common/header/headerContainer";
import ServerTable from "./components/serversTable";
import PanelInformation from "./components/panelInformation";
import NavButtonHandler from "../helpers/navButtonHandler";
const Dashboard = ({ Data }) => {
  useLayoutEffect(() => {
    document.title = "Hyperactyl - Home";
  });
  useEffect(NavButtonHandler, []);
  return (
    <>
      <NavBar />
      <main className="main-wrapper">
        <Header panelUser={Data.panelUser} user={Data.user} />
        <section className="section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7">
                <ServerTable
                  ServerData={Data.panelUser.relationships.servers.data}
                />
              </div>
              <div className="col-lg-5">
                <PanelInformation PanelData={Data.panelUser} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
