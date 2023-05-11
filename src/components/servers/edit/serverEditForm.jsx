import React, { useState } from "react";

const ServerEditForm = ({ ServersData, id, onSubmit, error }) => {
  const [ram, setRam] = useState("");
  const [disk, setDisk] = useState("");
  const [cpu, setCpu] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ram, disk, cpu });
  };
  return (
    <div className="card-style">
      <div className="card-header">
        <div className="card-title">Edit Server</div>
      </div>
      <div className="card-body">
        {(() => {
          if (
            ServersData.filter((server) => server.attributes.id == id).length ==
            1
          ) {
            const serverinfo = ServersData.filter(
              (server) => server.attributes.id == id
            )[0];
            return (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert-box danger-alert">
                    <div className="alert">
                      <h6>{error}</h6>
                    </div>
                  </div>
                )}
                <div className="text">
                  <p className="text-medium">
                    Name: <a>{serverinfo.attributes.name}</a>
                  </p>
                </div>
                <div className="text">
                  <p className="text-medium">
                    Egg: <a>{serverinfo.attributes.egg}</a>
                  </p>
                </div>

                <a> </a>
                <div className="input-style-3">
                  <input
                    type="number"
                    id="ram"
                    placeholder="Ram"
                    onChange={(e) => setRam(e.target.value)}
                    value={ram !== "" ? ram : serverinfo.attributes.limits.memory}
                  />
                  <span className="icon">
                    <i className="fa-solid fa-memory"></i>
                  </span>
                </div>
                <div className="input-style-3">
                  <input
                    type="number"
                    id="disk"
                    placeholder="Disk"
                    onChange={(e) => setDisk(e.target.value)}
                    value={disk !== "" ? disk : serverinfo.attributes.limits.disk}
                  />
                  <span className="icon">
                    <i className="fa-solid fa-hard-drive"></i>
                  </span>
                </div>
                <div className="input-style-3">
                  <input
                    type="number"
                    id="cpu"
                    placeholder="CPU"
                    onChange={(e) => setCpu(e.target.value)}
                    value={cpu !== "" ? cpu : serverinfo.attributes.limits.cpu}
                  />
                  <span className="icon">
                    <i className="fa-solid fa-microchip"></i>
                  </span>
                </div>

                <button type="submit" className="main-btn btn-sm btn-primary">
                  Modify
                </button>
                <br />
              </form>
            );
          } else {
            return <p>Could not find server with the provided ID.</p>;
          }
        })()}
      </div>
    </div>
  );
};

export default ServerEditForm;