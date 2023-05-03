import React, { useEffect } from 'react'
import Header from '../../common/header/headerContainer'
import NavBar from '../../common/navBar'
const StatusContainer = ({ Data }) => {
    return (
        <>
        <NavBar/>
        <main className="main-wrapper">
            <Header user={Data.user} panelUser={Data.panelUser}/>
          <div className="row">
            <div className="col">
              <div className="card-style">
                <div className="card-content">
                    <h3><a>Node Status</a></h3>
                    <br/>
                  </div>
                  <div className="table-wrapper table-responsive">
                    <table className="table" id="table">
                      <thead>
                        <tr>
                          <th><h6>Status</h6></th>
                          <th><h6>Name</h6></th>
                          <th><h6>Memory</h6></th>
                          <th><h6>Disk</h6></th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
            </div>
        </main>
        </>
    )
}

export default StatusContainer