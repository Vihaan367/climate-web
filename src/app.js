const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const climateEventRoutes = require("./routes/climateEventRoutes");
const payoutRoutes = require("./routes/payoutRoutes");
const fundRoutes = require("./routes/fundRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/events", climateEventRoutes);
app.use("/api/payout", payoutRoutes);
app.use("/api/funds", fundRoutes);

module.exports = app;