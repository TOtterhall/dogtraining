const express = require("express");
const app = express();
const cors = require("cors");
const port = 3100;
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { KeyObject } = require("crypto");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hallå eller?!");
});

app.get("/dogs", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      res
        .status(404)
        .send("Kan inte hitta några hundar, de ligger nog och sover...");
    } else {
      const dogs = JSON.parse(data);
      res.status(200).send(dogs);
      return;
    }
  });
});

app.get("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    const dogs = JSON.parse(data);
    if (err) {
      console.log("error");
    } else {
      let specielDog = req.params.id;

      res.send(
        "Denna vovve med ID:" +
          specielDog +
          " " +
          "är mycket speciell och har nu rena tassar...:"
      );
      return;
    }
  });
});

app.post("/dogs/:dogName", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    const dogs = JSON.parse(data);
    if (err) {
      console.log("error");
    } else {
      let updatedDog = req.body;

      dogs.push(updatedDog);

      fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send(
        req.params.dogName + "...detta är en ny hund som lämnat nya tassavtryck"
      );
      return;
    }
  });
});

app.put("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    let dogs = JSON.parse(data);

    let changedDog = dogs.find((dog) => dog.id === req.params.id);
    console.log(changedDog.dogName);

    changedDog.dogName = req.body.dogName;
    console.log(req.body.dogName);
    // dogs.push(changedDog);

    fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(
      req.params.dogName +
        "...detta är en uppdaterad hund som lämnat nya tassavtryck"
    );
    return;
  });
});
// app.put("/dogs/:id", (req, res) => {
//   var existAccounts = getAccountData();
//   fs.readFile(
//     dataPath,
//     "utf8",
//     (err, data) => {
//       const dogsId = req.params["id"];
//       existAccounts[dogId] = req.body;
//       saveAccountData(existAccounts);
//       res.send(`accounts with id ${accountId} has been updated`);
//     },
//     true
//   );
// });
app.delete("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    let dogs = JSON.parse(data);

    let deletedDog = dogs.filter((dog) => dog.id !== req.params.id);
    dogs.push(deletedDog);

    fs.writeFile("dogs.json", JSON.stringify(deletedDog, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(req.params.id);
    return;
  });
});

app.listen(port, () => console.log("Server is up"));
