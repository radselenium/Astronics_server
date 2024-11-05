

const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/user_route");
const MessageRoute = require("./routes/message_route");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 7001;

app.use("/users", UserRoute);
app.use("/messages", MessageRoute);
app.use("/api/getAllMessageTracing", MessageRoute);
app.use("/api/getAllStatusCount", MessageRoute);
app.use("/api/getMessageTypeCount", MessageRoute);
app.use("/api/getAllMessagePerDayCount", MessageRoute);



// const server = app.listen(3000, () =>
//   console.log(`
// 🚀 Server ready at: http://localhost:3000
// ⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`)
// );
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});