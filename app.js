const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const port = 3100;

// let dogs = require("/dogs.json");
const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const fs = require("fs");
app.use(express.json());

// //save function
// const save = () => {
//   fs.writeFile("/dogs.json", JSON.stringify(dogs, null, 2), (error) => {
//     if (error) {
//       throw error;
//     }
//   });
// };

//CRUD = create, read, update,delete
//Skriver ut alla hundarna från mitt API
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
      const dogsInfo = JSON.parse(data);
      res
        .status(200)
        .send("Här är en specifik hund med " + " " + req.params.id + dogsInfo);
      return;
    }
  });
});

app.post("/dogs/:id", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    if (err) {
      console.log("error");
    } else {
      const dogs = JSON.parse(data);
      res.status(200).send("Här är en ny hund med " + " " + req.params.id);
      return;
    }
  });
});

app.post("/dogs", (req, res) => {
  res.status(201).json(req.body);
});

//EG POST body anrop...
app.post("/add", (req, res) => {
  fs.readFile("dogs.json", (err, data) => {
    const dogs = JSON.parse(data);

    let newDog = {
      dogName: "Noisse",
      breed: "Golden Reitriver",
      owner: "Potta",
      email: "pottan@gmail.com",
      id: uuidv4(),
    };

    dogs.push(newDog);
    //stringufy(tar tre parametrar = users(det vi vill skicka in, 2(manipulera det vi skickar in, 3(vilken formatering vi vill ha))))
    fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.send(dogs);
    return;
  });
});

app.delete("/dogs/:id", (req, res) => {
  res
    .status(200)
    .send(
      "Här är en specifik produkt" + " " + req.params.id + "som tagits bort"
    );
});

app.put("/dogs/:id", (req, res) => {
  res
    .status(201)
    .send("Här är en uppdaterad lista" + req.params.id + "som uppdaterats");
});
// app.put("/dogs/id", (req, res) => {
//   fs.readFile("dogs.json", (err, data) => {
//     if (err) {
//       console.log("error");
//     } else {
//       const dogs = JSON.parse(data);
//       if (dogs.id === req.params.id) {
//         res
//           .status(201)
//           .send(
//             "Här är en uppdaterad lista" + req.params.id + "som uppdaterats"
//           );
//         return dogs;
//       }
//     }
//   });
// });

// Update(U) in CRUD;
// app.put("/dogs/:id", bodyParser.json(), (req, res) => {
//   dogs = dogs.map((dogs) => {
//     if (dogs.dog === req.params.id) {
//       return req.body;
//     } else {
//       return dogs;
//     }
//   });
//   save();
//   res.json({
//     status: "success",
//     dogsInfo: req.body,
//   });
// });

// app.put("/dogs/:id", bodyParser.json(), (req, res) => {
//   dogs.push(newDog);
//   fs.writeFile("dogs.json", JSON.stringify(dogs, null, 2), (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   res.send(dogs);
//   return;
// });

// //Delete(D) in CRUD
// app.delete("/dogs/:id", (req, res) => {
//   dog = dog.filter((dogs) => dogs.id !== req.params.id);
//   save();
//   res.json({
//     status: "success",
//     removed: req.params.id,
//     newLength: dogs.length,
//   });
// });
app.listen(port, () => console.log("Server is up"));
