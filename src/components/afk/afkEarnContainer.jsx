import React, { useEffect, useLayoutEffect, useState } from "react";
import settings from "../../../settings";
import NavBar from "../common/navBar";
import Header from "../common/header/headerContainer";
import { Navigate } from "react-router";
import NavButtonHandler from "../helpers/navButtonHandler";
const AfkEarnContainer = ({ Data }) => {
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(settings.afk.per);
  const [isEarning, setIsEarning] = useState(true);
  const [ws, setWs] = useState(null);
  useLayoutEffect(() => {
    document.title = "Hyperactyl - Afk"
  })
  useEffect(NavButtonHandler)
  useEffect(() => {
    setWs(new WebSocket("ws://localhost:" + settings.afk.ws.port));

    return () => {
      ws && ws.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "start",
            payload: { user: { id: Data.user._id } },
          })
        );
        setInterval(() => {
          setTimeRemaining((currentTime) => currentTime - 1);
        }, 1000);
      };

      ws.onmessage = (message) => {
        if (message.data === "gained") {
          setTimeRemaining(settings.afk.per);
          setEarnedCoins((prevCoins) => prevCoins + settings.afk.coins);
        }
      };

      ws.onclose = () => {
        setIsEarning(false);
      };
    }
  }, [ws, Data.user._id]);

  return isEarning ? (
    <>
      <NavBar />
      <main className="main-wrapper">
        <Header panelUser={Data.panelUser} user={Data.user} />
        <section className="section">
          <div className="container-fluid" bis_skin_checked="1">
            <div className="row">
              <div className="col">
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
                      <h5 className="text-medium mb-30 mt-4">Earn Coins</h5>
                    </div>
                    <div className="card-body">
                      <center>
                        <a>
                          You Will Get {settings.afk.coins} coins every{" "}
                          {settings.afk.per} seconds.
                        </a>
                      </center>
                      <center>
                        <a>
                          You will gain coins again in {timeRemaining} seconds.
                        </a>
                      </center>
                      <a></a>
                      <center>
                        <a>
                          You have gained{" "}
                          <span id="arciogainedcoins">{earnedCoins}</span> coins
                          currently
                        </a>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  ) : (
    <Navigate to={"/"} replace={true}/>
  );
};

export default AfkEarnContainer;
