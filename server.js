const express = require("express");
const path = require("path");
const cookiePareser = require("cookie-parser");
const cors = require("cors");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
app.use(express.json());
app.use(cookiePareser());
app.use(cors(corsOptions));

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
