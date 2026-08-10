module.exports = {
  apps: [
    {
      name: "vasp-frontend",
      script: "server.js",   // your custom server file
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3023
      }
    }
  ]
};
