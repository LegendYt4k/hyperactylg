import React, { useEffect, useState, useLayoutEffect } from "react";
import Header from "../../common/header/headerContainer";
import NavBar from "../../common/navBar";
import ServerCreateForm from "./serverCreateForm";
import settings from "../../../../settings";
const ServerCreateContainer = ({ Data }) => {
  const [error,setError] = useState()

  useLayoutEffect(() => {
    document.title = "Hyperactyl - New Server";
  });

  const handleSubmit = async ({ name,ram,disk,cpu,egg,location }) => {
    try {
      if(!name || !disk || !ram || !cpu || !location || !egg) setError("Please provide all the details correctly.")
    const rawServerCreateResp = await fetch('/api/servers', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${settings.secret}`
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        server: {
           name: name,
           ram: ram,  
           disk: disk,
           cpu: cpu,
           location: location,
           egg: egg
        }
      })
    })
    const data = await rawServerCreateResp.json()
    if(rawServerCreateResp.status != 200) return setError(data.message)
    } catch(err) {
      setError("Internal server error please contact an admin.")
    }
  }
  return (
    <>
      <NavBar />
      <main className="main-wrapper">
        <Header user={Data.user} panelUser={Data.panelUser} />
        <section className="section">
          <div className="container-fluid" bis_skin_checked="1">
            <div className="row">
              <div className="col">
                <ServerCreateForm onSubmit={handleSubmit} error={error} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServerCreateContainer;
