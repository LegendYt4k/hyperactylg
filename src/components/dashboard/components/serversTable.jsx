import React from "react";

const ServersTable = ({ ServerData }) => {
  return (
    <div className="card-style mb-30">
      <div className="table-wrapper table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>
                <h6>Name</h6>
              </th>
              <th>
                <h6>Ram</h6>
              </th>
              <th>
                <h6>Disk</h6>
              </th>
              <th>
                <h6>Cpu</h6>
              </th>
              <th>
                <h6>Status</h6>
              </th>
            </tr>
          </thead>

          <tbody>
            {ServerData.map((server) => {
              return (
                <tr key={server.id}>
                  <td>
                    <p>{server.attributes.name}</p>
                  </td>
                  <td>
                    <p>{server.attributes.limits.memory} MB</p>
                  </td>
                  <td>
                    <p>{server.attributes.limits.disk} MB</p>
                  </td>
                  <td>
                    <p>{server.attributes.limits.cpu} %</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServersTable;
