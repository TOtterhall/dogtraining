const express = require("express");
const app = express();
const cors = require("cors");
const port = 3100;
const fs = require("fs");

app.use(express.json());
app.use(cors());

app.get("/dogs", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      res
        .status(404)
        .send("404- Kan inte hitta några hundar, de ligger nog och sover...");
    } else {
      const dogs = JSON.parse(data);
      res.status(200).send(dogs);
      return;
    }
  });
});

app.get("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      res
        .status(404)
        .send("404- Kan inte hitta några hundar, de ligger nog och sover...");
    } else {
      let dogs = JSON.parse(data);
      const specialDog = dogs.find((dog) => dog.id === req.body.id);
      console.log(specialDog.dogName);
      res.status(200).send(specialDog);
      return;
    }
  });
});

app.post("/dogs/:dogName", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      res
        .status(404)
        .send("404- Kan inte skapa någon ny hund, de ligger nog och sover...");
    } else {
      const dogs = JSON.parse(data);
      let newDog = req.body;

      dogs.push(newDog);

      fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send(
        req.body.dogName + "...detta är en ny hund som lämnat nya tassavtryck"
      );
      return;
    }
  });
});

app.put("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      res
        .status(404)
        .send(
          "404- Hunden med id, har nog gått och gömt sig. Kolla om du har en sådan i din lista...för att kunna göra dina ändringar."
        );
    } else {
      let dogs = JSON.parse(data);

      let changedDog = dogs.find((dog) => dog.id === req.body.id);
      console.log(changedDog.dogName);

      changedDog.dogName = req.body.dogName;
      changedDog.breed = req.body.breed;
      changedDog.owner = req.body.owner;
      changedDog.email = req.body.email;

      console.log(req.body.dogName);
      // dogs.push(changedDog);

      fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send(
        req.body.dogName +
          "...detta är en uppdaterad hund som lämnat nya tassavtryck."
      );
      return;
    }
  });
});

app.delete("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      res
        .status(404)
        .send(
          "404- Hunden med id, har nog gått och gömt sig. Kolla om du har en sådan i din lista...för att kunna göra dina ändringar."
        );
    } else {
      let dogs = JSON.parse(data);

      let deletedDog = dogs.filter((dog) => dog.id !== req.body.id);
      dogs.push(deletedDog);

      fs.writeFile("dogs.json", JSON.stringify(deletedDog, null, 2), (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send("Din hund är nu bortagen...");
      return;
    }
  });
});

app.listen(port, () => console.log("Server is up"));
