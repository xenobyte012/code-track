import axios from "axios";

export const getProfile = async (req, res) => {
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    const userData = response.data;

    // Send back the profile picture and some other useful info!
    return res.status(200).json({
      message: "successful",
      username: userData.login,
      name: userData.name,
      avatarUrl: userData.avatar_url, // <-- This is your profile picture URL
      profileLink: userData.html_url,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub profile" });
  }
};
