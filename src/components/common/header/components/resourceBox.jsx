import React from "react";

const ResourceBox = ({ Name, Used, Total, Icon }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-sm-6">
      <div className="icon-card mb-30">
        <div className="icon blue">
          <i className={Icon}></i>
        </div>
        <div className="content">
          <h6 className="mb-10">{Name}</h6>
          <h3 className="text-bold mb-10">
            {Used} / {Total}
          </h3>
          <p className="text-sm text-success">
            Fetched From <strong>API</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceBox;
