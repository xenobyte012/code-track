import dotenv from "dotenv";
import app from "./app.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    app.on("error", (error) => {
      console.log("ERROR", erorr);
      throw erorr;
    })

    app.listen(process.env.Port || 5000, "0.0.0.0", () => {
      console.log(`Server is running on port ${process.env.Port}`)
    })
  } catch (error) {
    console.log("App faild to start", error)
  }
}

startServer();