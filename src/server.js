const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to CORS server 😁");
});

app.use(
  "/proxy",
  createProxyMiddleware({
    pathRewrite: {
      "^/proxy/": "",
    },
    target: "https://github.com", // redirect to github url
    changeOrigin: true, // needed for virtual hosted sites
    secure: false,
  })
);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
