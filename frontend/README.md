## To Do Task

dcsolorandlithium

bluen and yellow

border-zinc-800

- [x]  Create react app file name: CodeTrack
- [ ]  Sidebar
 Navbar
Cards
- [ ]  Fake data
Charts
 Responsive design
- [ ]  API fetch
 Loading states
 Error handling

- [ ]  Dark mode
Search/filter
Polish UI

Coding  **Productivity Dashboard that tracks the following** 

Track:

- [x]  Total repos
- [x]  contributions
- [ ]  Commits frequency
- [x]  commit heatmap
- [ ]  languages used on the project
- [ ]  project leaderboard
- [x]  total coding hours
- [ ]  longest session
- [ ]  daily averages
- [ ]  peak hours
- [ ]  weekly trends
- [ ]  monthly
- [x]  coding streak
- [ ]  active project in week
- [ ]  **Project time spent**

## Resources I will use

**GitHub Data**

https://docs.github.com/en

**waka Data API**

https://wakatime.com/developers

Data I receive from the API is customizable you just request what type of data you want.

## Features

- [x]  **Total repos**
- shows how many repos you have created
- repositories = 67
- [x]  **Total contribution**
- shows how many contribution i total overall
- Contributions = 512

**Commit heatmap**

- [ ]  

- [x]  Coding hours
- shows how many hours
- Total Hours = 500 h

Commit  frequency 

- [x]  Commit Frequency

Chart:

```jsx
Mon 5
Tue 2
Wed 8
Thu 1
```

Use:

- Recharts LineChart
- x = days monday to sunday
- y = commits number like 3,5,7

Metric:

```
Commits/day
```

## Weekly trend

Chart:

```
Week1 → 10h

Week2 → 20h

Week3 → 18h
```

Useful:

Improvement over time.

## Monthly trend

Chart:

```
Jan → 40h

Feb → 70h

Mar → 60h
```

## Peak coding hours

Chart:

```
06:00 → 1h

20:00 → 4h

22:00 → 5h
```

Find:

> When do I code best?
> 

🏆 Project leaderboard

Show:

```
1 Notes App
120 commits

2 Portfolio
90 commits

3 Dashboard
75 commits
```

Metric:

Most active projects.

## Active projects this week

```
Worked on:

Notes App
Dashboard
Portfolio
```

Coding streak 

- Current streak:
- 18 days
- Longest:
- 42 days

# 🧠 Language distribution

Pie chart:

```
JS → 60%

React → 20%

CSS → 15%
```

Useful:

See learning focus.

## Task To Do

- [ ]  Sidebar
 Navbar
Cards
- [ ]  Fake data
Charts
 Responsive design
- [ ]  API fetch
 Loading states
 Error handling

- [ ]  Dark mode
Search/filter
Polish UI

For a **Developer Productivity Dashboard**, your navbar and sidebar should help answer:

> Where am I?
> 
> 
> What am I tracking?
> 
> What changed?
> 
> How do I customize this?
> 

Not just random links.

# 📌 Sidebar (navigation)

Think of it as **sections of analytics**.

Example:

```
🏠 Dashboard
📈 Analytics
🐙 GitHub
⏱ WakaTime
📂 Projects
🔥 Streaks
🎯 Goals
📊 Reports
⚙️ Settings
```

Meaning:

### 🏠 Dashboard

Overview:

- Total repos
- Hours
- Streak
- Commits

---

### 📈 Analytics

Detailed charts:

- Commit frequency
- Weekly trends
- Monthly trends
- Peak coding hours

---

### 🐙 GitHub

Show:

```
Repositories
Contributions
Languages
Commit heatmap
Followers
Stars
```

---

### ⏱ WakaTime

Show:

```
Coding hours
Longest session
Daily average
Projects
Editors
```

---

### 📂 Projects

Leaderboard:

```
Notes App → 20h
Portfolio → 12h
Dashboard → 8h
```

---

### 🔥 Streaks

Show:

```
Current:
18 days

Longest:
42 days
```

---

### 🎯 Goals

Track:

```
Monthly target:
100h

Progress:
65%
```

---

### 📊 Reports

Generate summaries:

```
This week:
20h coding

+15%
```

---

### ⚙️ Settings

Things like:

- Dark mode
- Theme
- Connect GitHub
- Connect WakaTime

---

# 🔥 Navbar (actions)

Navbar = quick access.

Example:

```
------------------------------------------------
🔍 Search

📅 Date range

🌙 Dark mode

🔔 Notifications

👤 Profile
------------------------------------------------
```

---

### 🔍 Search

Search:

```
Project names
Repositories
Languages
```

Example:

Search:

```
notes app
```

Find stats.

---

### 📅 Date filters

Useful:

```
Today
7 days
30 days
Year
Custom
```

Changes charts.

---

### 🌙 Theme switch

Toggle:

```
Light
Dark
```

---

### 🔔 Notifications

Ideas:

```
You coded 25% more this week

New streak:
15 days
```

---

### 👤 Profile

Show:

GitHub avatar:

```
Clement

View profile
Logout
Settings
```

---

# Suggested final layout

```
Sidebar

🏠 Dashboard
📈 Analytics
🐙 GitHub
⏱ WakaTime
📂 Projects
🔥 Streaks
🎯 Goals
⚙️ Settings

Navbar

🔍 Search

📅 Date Filter

🌙 Theme

🔔 Notifications

👤 Profile
```

---

# Build order (important)

Start simple:

### Sidebar:

Only:

```
Dashboard
Analytics
Projects
Settings
```

### Navbar:

Only:

```
Search
Dark mode
Profile
```

Then expand later.

Avoid building 20 features before API data works. Get:

**Sidebar → Navbar → Cards → Charts → APIs → Polish**

That order keeps momentum.

##