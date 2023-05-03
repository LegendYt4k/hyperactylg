export default {
  secret: "Unique",
  apiSecret: "Somethingmoresecure",
  theme: "dark",
  database: {
    link: 'mongodbfornow'
  },
  pterodactyl: {
    domain: "",
    key: "",
  },
  advertisements: {
    custom: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif",
  },
  client: {
    domain: "",
  },
  packages: {
    default: "default",
    list: {
      default: {
        ram: 2048,
        disk: 4096,
        cpu: 100,
        servers: 1,
      },
    },
  },
  locations: {
    1: {
      name: "India",
    },
  },
  eggs: {
    paper: {
      display: "Paper",
      info: {
        egg: 5,
        docker_image: "ghcr.io/pterodactyl/yolks:java_17",
        startup:
          "java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar {{SERVER_JARFILE}}",
        environment: {
          MINECRAFT_VERSION: "latest",
          SERVER_JARFILE: "server.jar",
          BUILD_NUMBER: "latest",
        },
      },
    },
  },
  coins: {
    enabled: true,
  },
  afk: {
    enabled: true,
    per: 30,
    coins: 1,
    ws: {
      port: 6969,
    },
  },
};
