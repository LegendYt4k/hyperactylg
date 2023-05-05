import express from "express";
import log from "../../helpers/logger.js";
import settings from "../../../settings.js";
const router = express();
router.post("/", async (req, res) => {
  try {
    const node = [];
    const nodeStats = new Promise(async (resolve, reject) => {
      const response = await fetch(
        settings.pterodactyl.domain + "/api/application/nodes",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${settings.pterodactyl.key}`,
          },
        }
      );
      const json = await response.json();

      const promises = json.data.map(async (data) => {
        const body = {
          id: data.attributes.id,
          name: data.attributes.name,
          memory: data.attributes.memory * data.attributes.memory_overallocate,
          disk: data.attributes.disk * data.attributes.disk_overallocate,
        };

        try {
          const healthResponse = await fetch(
            "https://" +
              data.attributes.fqdn +
              ":" +
              data.attributes.daemon_listen +
              "/health",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${settings.pterodactyl.key}`,
              },
            }
          );
          if (healthResponse.status >= 500 && healthResponse.status <= 599) {
            body.status = "offline";
          } else {
            body.status = "online";
          }
        } catch (error) {
          body.status = "offline";
        }
        return body;
      });

      Promise.all(promises)
        .then((nodes) => {
          node.push(...nodes);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

    nodeStats
      .then(() => {
        res.status(200).send(node);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    log.error(err);
    res
      .status(500)
      .json({ message: "Internal server error please contact an admin." });
  }
});

export default router;
