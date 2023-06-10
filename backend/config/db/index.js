// const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);

// async function connect() {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1/ercommerce");
//     console.log("Connect  database successfully");
//   } catch (error) {
//     console.log("Connect failure");
//   }
// }
// module.exports = { connect };

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;