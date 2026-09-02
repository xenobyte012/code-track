import dotenv from "dotenv";
import app from "./app.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"])
dotenv.config({
  path: "./.env",
});
const port = process.env.Port 
const startServer = async () => {
  try {
    app.on("error", (error) => {
      console.log("ERROR", erorr);
      throw erorr;
    })

    app.listen(port || 5000, "0.0.0.0", () => {
      console.log(`Server is running on port ${process.env.Port}`)
        console.log(`\n🚀 Server running on http://localhost:${port}`);
        console.log(
          `📊 Heatmap API: http://localhost:${port}/api/github/heatmap`,
        );
        console.log(
          `🔑 GitHub username: ${process.env.GITHUB_USERNAME || "Not set"}`,
        );
        console.log(
          `🔐 GitHub token: ${process.env.GITHUB_TOKEN ? "✅ Set" : "❌ Not set"}\n`,
        );
      });
  } catch (error) {
    console.log("App faild to start", error)
  }
}

startServer();