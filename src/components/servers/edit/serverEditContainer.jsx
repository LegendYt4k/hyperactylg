import React, { useEffect, useLayoutEffect, useState } from "react";
import NavBar from "../../common/navBar";
import Header from "../../common/header/headerContainer";
import ServerEditForm from "./serverEditForm";
import { useParams } from "react-router";
import settings from "../../../../settings";
const ServerEditContainer = ({ Data }) => {
  const { id } = useParams();
  const [error,setError] = useState()
  useLayoutEffect(() => {
    document.title = "Hyperactyl - Modify Server"
  })
  const handleSubmit = async ({ram,disk,cpu}) => {
    try {
    const rawServerEditResp = await fetch('/api/servers', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.secret}`
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        server: {
          ram: ram,
          disk: disk,
          cpu: cpu,
          id: id
        }
      })
    })
    const data = await rawServerEditResp.json()
    if(rawServerEditResp.status != 200) return setError(data.message)
    } catch(err) {
      setError("Internal server error please contact an admin.")
    }
    
  }
  return (
    <>
      <NavBar />
      <main className="main-wrapper">
        <Header panelUser={Data.panelUser} user={Data.user} />
        <section className="section">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <ServerEditForm ServersData={Data.panelUser.relationships.servers.data} id={id} error={error} onSubmit={handleSubmit}/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServerEditContainer;
