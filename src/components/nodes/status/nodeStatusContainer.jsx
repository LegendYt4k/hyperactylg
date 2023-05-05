import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../common/header/headerContainer";
import NavBar from "../../common/navBar";
import settings from "../../../../settings";

const NodeStatusContainer = ({ Data }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    try {
      const nodeStatus = async () => {
        const rawNodeStatusResp = await fetch("/api/nodes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${settings.secret}`
          }
        });
        const data = await rawNodeStatusResp.json();
        if (rawNodeStatusResp.status != 200) return setError(data.message);
        setNodes(data);
        setLoading(false);
      };
      nodeStatus();
    } catch (err) {
      setError("Internal server error please contact an admin.");
      setLoading(false);
    }
  }, []);
  useLayoutEffect(() => {
    document.title = "Hyperactyl - Nodes";
  });
  return (
    <>
      <NavBar />
      <main className="main-wrapper">
        <Header user={Data.user} panelUser={Data.panelUser} />
        <section className="section">
          <div className="container-fluid" bis_skin_checked="1">
            <div className="row">
              <div className="col">
                <div className="card-style">
                  {loading && (
                    <div className="d-flex justify-content-center align-items-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="alert-box danger-alert">
                      <div className="alert">
                        <h6>{error}</h6>
                      </div>
                    </div>
                  )}
                  {!loading && !error && (
                    <>
                      <div className="card-content">
                        <h3>
                          <a>Node Status</a>
                        </h3>
                        <br />
                      </div>

                      <div className="table-wrapper table-responsive">
                        <table className="table" id="table">
                          <thead>
                            <tr>
                              <th>
                                <h6>Status</h6>
                              </th>
                              <th>
                                <h6>Name</h6>
                              </th>
                              <th>
                                <h6>Memory</h6>
                              </th>
                              <th>
                                <h6>Disk</h6>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {nodes.map((node) => {
                              console.log(node);
                              return (
                                <>
                                  <tr key={node.id}>
                                    <td>
                                     {node.status === "online" ? <div className="lead"><div className="lead-image"><img src="/assets/images/online.gif"/></div><h6> Online</h6></div> : <div className="lead"><div className="lead-image"><img src="/assets/images/offline.gif"/></div><h6> Offline</h6></div>}
                                    </td>
                                    <td>
                                      <h6>{node.name}</h6>
                                    </td>
                                    <td>
                                      <h6>{node.memory}</h6>
                                    </td>
                                    <td>
                                      <h6>{node.disk}</h6>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NodeStatusContainer;
