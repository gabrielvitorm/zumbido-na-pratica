module.exports = {
  apps: [
    {
      name: "zumbido-lps",
      script: ".next/standalone/server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      autorestart: true,
      max_restarts: 10,
      watch: false,
    },
  ],
};
