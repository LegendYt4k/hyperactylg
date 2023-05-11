import React, { useState } from "react";
import settings from "../../../../settings";

const ServerCreateForm = ({ onSubmit, error }) => {
  const [egg,setEgg] = useState()
  const [location,setLocation] = useState()
  const [ram,setRam] = useState()
  const [disk,setDisk] = useState()
  const [cpu,setCpu] = useState()
  const [name,setName] = useState()
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name,ram,disk,cpu,egg,location })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-style">
        <div className="card-header">
          <div className="card-title">Create Server</div>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert-box danger-alert">
              <div className="alert">
                <h6>{error}</h6>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center"></div>

          <div className="input-style-1">
            <label>Server Name</label>
            <input
              onChange={(e)=>setName(e.target.value)}
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
            />
          </div>
          <br />
          <div className="select-style-1">
            <label>Location</label>
            <div className="select-position">
              <select className="form-control" onChange={(e)=>setLocation(e.target.value)} id="location">
              <option value='default' selected>Select a location</option>
              {(() => {
                  return Object.keys(settings.locations).map((key) => (
                    <option value={key} key={key}>{settings.locations[key].name}</option>
                  ));
                })()}
              </select>
            </div>
          </div>
          <br />
          <div className="select-style-1">
            <label>Egg</label>
            <div className="select-position">
              <select onChange={(e)=>setEgg(e.target.value)} className="form-control" id="egg">
              <option value='default' selected>Select an egg</option>
                {(() => {
                  return Object.keys(settings.eggs).map((key) => (
                    <option value={key} key={key}>{settings.eggs[key].display}</option>
                  ));
                })()}
              </select>
            </div>
          </div>
          <br />
          <div className="input-style-1">
            <label>Ram</label>
            <input
              onChange={(e)=>setRam(e.target.value)}
              type="number"
              className="form-control"
              id="ram"
              placeholder="RAM"
            />
          </div>
          <br />
          <div className="input-style-1">
            <label>Disk</label>
            <input
             onChange={(e)=>setDisk(e.target.value)}
              type="number"
              className="form-control"
              id="disk"
              placeholder="DISK"
            />
          </div>
          <br />
          <div className="input-style-1">
            <label>Cpu</label>
            <input
                onChange={(e)=>setCpu(e.target.value)}
              type="number"
              className="form-control"
              id="cpu"
              placeholder="CPU"
            />
          </div>
          <br />
          <button
            type="submit"
            className="main-btn primary-btn btn-hover btn-sm"
          >
            Create
          </button>
          <br />
        </div>
      </div>
    </form>
  );
};

export default ServerCreateForm;
