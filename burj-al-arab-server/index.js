const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("./burj-al-arab-500ca-firebase-adminsdk-bvfr1-59214fab67.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://BurjAlArab:EQa8QXdsb8WVFNMq@cluster0.bm8mo.mongodb.net/BurjAlArabek?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookings = client.db("BurjAlArabek").collection("bookings");
  console.log("connected");
  // perform actions on the collection object
  app.post("/addBooking", (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(newBooking);
  });

  app.get("/bookings", (req, res) => {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith("Bearer ")) {
      const idToken = bearer.split(" ")[1];
      console.log({ idToken });
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          const tokenEmail = decodedToken.email;
          const queryEmail = req.query.email;
          console.log(tokenEmail,queryEmail);
          if (tokenEmail == req.query.email) {
            bookings
              .find({ email: req.query.email })
              .toArray((err, document) => {
                res.send(document);
              });
          }
        })
        .catch((error) => {
          // Handle error
        });
    }
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(8000, () => {
  console.log("app listening port 8000");
});

// const pass = EQa8QXdsb8WVFNMq///Burj Al Arab;
