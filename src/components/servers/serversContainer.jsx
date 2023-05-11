import React, { useEffect, useLayoutEffect } from "react";
import DetailedServersTable from "./components/detailedServersTable";
import NavBar from "../common/navBar";
import Header from "../common/header/headerContainer";
import NavButtonHandler from "../helpers/navButtonHandler";

const ServersContainer = ({ Data }) => {
  useLayoutEffect(() => {
    document.title = "Hyperactyl - Servers";
  });
  useEffect(NavButtonHandler);
  return (
    <>
      <NavBar />
      <main className="main-wrapper">
        <Header panelUser={Data.panelUser} user={Data.user} />
        <section className="section">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <DetailedServersTable
                  ServersData={Data.panelUser.relationships.servers.data}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServersContainer;
