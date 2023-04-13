const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const recipesRouter = require("./routes/api/recipes");
const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/users");
const ownRecipesRouter = require("./routes/api/ownRecipes");
const shopingListsRouter = require("./routes/api/shopingList");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/user", userRouter);
app.use("/own-recipes", ownRecipesRouter);
app.use("/shopping-list", shopingListsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found app" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

io.on("connection", (socket) => {
  console.log("😊", "new Conection");

  setInterval(() => {
    socket.emit("motivation", "👋 hi from server");
  }, 5000);
});

module.exports = { httpServer, io };
