import React from "react";

const PanelInformation = ({ PanelData }) => {
  return (
    <div className="card-style mb-30">
      <div
        className="
                    title
                    d-flex
                    flex-wrap
                    align-items-center
                    justify-content-between row
                  "
      >
        <div className="left">
          <h5 className="text-medium mb-30 mt-4">Information</h5>
        </div>
        <div className="text-md-center input-style-3 ">
          <label>Username</label>
          <input
            id="user"
            type="text"
            className="form-control form-control-muted"
            value={PanelData.username}
            disabled
          />
        </div>
        <div className="text-md-center input-style-3 ">
          <label>Email</label>
          <input
            id="email"
            type="text"
            className="form-control form-control-muted"
            value={PanelData.email}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default PanelInformation;
