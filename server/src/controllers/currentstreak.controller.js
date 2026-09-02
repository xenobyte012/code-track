import axios from "axios";

export const getCurrentStreak = async (req, res) => {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;

    // Fetch last 90 events (max per page)
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10",
        },
        params: { per_page: 100, page: 1 },
      },
    );

    const events = response.data;

    // Filter push events and extract unique dates
    const pushDates = new Set();
    events.forEach((event) => {
      if (event.type === "PushEvent") {
        const date = event.created_at.split("T")[0];
        pushDates.add(date);
      }
    });

    // Calculate current streak
    const sortedDates = Array.from(pushDates).sort().reverse();
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there was activity today or yesterday (GitHub counts either)
    const checkDate = new Date(today);
    const hasToday = sortedDates.includes(
      checkDate.toISOString().split("T")[0],
    );

    if (!hasToday) {
      // Check yesterday (GitHub's streak logic allows this)
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Count consecutive days backwards
    for (let i = 0; i < sortedDates.length + 1; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (sortedDates.includes(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({
      message: "successful",
      currentStreak: streak,
      lastPushDate: sortedDates[0] || null,
      totalPushEvents: events.filter((e) => e.type === "PushEvent").length,
    });
  } catch (error) {
    console.error("Error calculating streak:", error.message);
    res.status(500).json({ error: "Failed to calculate streak" });
  }
};
