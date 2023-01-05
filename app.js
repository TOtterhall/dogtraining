const express = require("express");
const app = express();
const cors = require("cors");
const port = 3100;
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hallå eller?!");
});

app.get("/dogs", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      console.log("Error -404");
    } else {
      const dogs = JSON.parse(data);
      res.status(200).send(dogs);
      return;
    }
  });
});

// Skriver ut en specifik hund
app.get("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      console.log("error");
    } else {
      const dogs = JSON.parse(data);
      res.status(200).send("Här är en hund med" + req.params.id);
      return;
    }
  });
});

app.put("/dogs", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    const dogs = JSON.parse(data);

    //dogs = dogs.filter((dogs) => parseInt(dogs.id) !== req.params.id);
    //dogs = dogs.filter((child) => parseInt(child.id) !== req.params.id);
    let updateDog = req.body;

    dogs.push(updateDog);
    //dogs.(dogs);
    //stringufy(tar tre parametrar = users(det vi vill skicka in, 2(manipulera det vi skickar in, 3(vilken formatering vi vill ha))))
    fs.writeFile("dogs.json", JSON.stringify(dogs), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(dogs);
    return;
  });
});

app.delete("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    const dogs = JSON.parse(data);

    //dogs = dogs.filter((dogs) => parseInt(dogs.id) !== req.params.id);
    //dogs = dogs.filter((child) => parseInt(child.id) !== req.params.id);
    let deletedDog = dogs.map((dog) => dog.id === req.params.id);

    dogs.delete(deletedDog);
    //dogs.(dogs);
    //stringufy(tar tre parametrar = users(det vi vill skicka in, 2(manipulera det vi skickar in, 3(vilken formatering vi vill ha))))
    fs.writeFile("dogs.json", JSON.stringify(dogs), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(dogs);
    return;
  });
});

app.post("/add", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    const dogs = JSON.parse(data);

    let newDog = {
      dogName: "Zoe",
      breed: "Golden Reitriver",
      owner: "Potta",
      email: "pottan@gmail.com",
      id: uuidv4(),
    };

    dogs.push(newDog);
    // stringufy(tar tre parametrar = users(det vi vill skicka in, 2(manipulera det vi skickar in, 3(vilken formatering vi vill ha))))
    fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(dogs);
    return;
  });
});

app.listen(port, () => console.log("Server is up"));
