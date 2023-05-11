import React from "react";
import settings from "../../../../settings";
import { Link } from "react-router-dom";

const DetailedServersTable = ({ ServersData }) => {
  return (
    <div className="card-style">
      <div className="card-content">
        <h3>
          <a>Your Servers</a>
        </h3>
        <br/>
      </div>
      <div className="table-wrapper table-responsive">
        <table className="table">
          <thead>
            <tr></tr>
            <th scope="col">
              <h6>Name</h6>
            </th>
            <th scope="col">
              <h6>Memory</h6>
            </th>
            <th scope="col">
              <h6>Disk</h6>
            </th>
            <th scope="col">
              <h6>CPU</h6>
            </th>
            <th scope="col">
              <h6>Edit</h6>
            </th>
            <th scope="col">
              <h6>Delete</h6>
            </th>
            <th scope="col">
              <h6>Link</h6>
            </th>
          </thead>
          <tbody>
            {ServersData.map((server) => {
              return (
                <tr key={server.id}>
                  <td>
                    <p>{server.attributes.name.length > 6 ? server.attributes.name.slice(0, 6) + '...' : server.attributes.name}</p>
                  </td>
                  <td>
                    <p>{server.attributes.limits.memory}MB</p>
                  </td>
                  <td>
                    <p>{server.attributes.limits.disk}MB</p>
                  </td>
                  <td>
                    <p>{server.attributes.limits.cpu}%</p>
                  </td>
                  <td>
                    <Link to={`/servers/edit/${server.attributes.id}`} >
                      <button
                        className="btn btn-icon btn-primary"
                        type="button"
                      >
                        <span className="btn-inner--icon">
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <a href="/delete?id=<%= pterodactyl.relationships.servers.data[i].attributes.id %>">
                      <button className="btn btn-icon btn-danger" type="button">
                        <span className="btn-inner--icon">
                          <i className="fas fa-trash"></i>
                        </span>
                      </button>
                    </a>
                  </td>

                  <td>
                    <a
                      href={settings.pterodactyl.domain + '/server/' + server.attributes.identifier}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-icon btn-success"
                    >
                      <i className="fas fa-link"></i>
                    </a>
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

export default DetailedServersTable;
