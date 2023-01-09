# dogtraining

Dogtraining with REST-API

Beskrivning av projektet:
Jag valde att bygga ett hund API. Där man kan lägga till, ändra eller ta bort en hund från json filen.

## Hur körs projektet?:

BACKEND

1. backend-> dogtraining
   -> clona ner Git repot:
   https://github.com/TOtterhall/dogtraining.git
   gh repo clone TOtterhall/dogtraining

- Öppna filerna på din dator i VS Code
- Öppna en ny terminal
- I terminalen skriver du in följande koder:
  npm init --y
  npm install express
  npm install cors
  npm install -g nodemon

---

SERVERN

I terminalen skriver nu nu:
-> nodemon app.js

Servern startar...
I explorer hittar du: dogs.rest -> För att testköra servern öppna -> mappen dogs.rest
klicka på de olika anropen enligt CRUD
GET, POST, UPDATE, DELETE

---

FRONTEND:

Jag har även byggt en separat frontend applikation som anropar mitt REST api
Clona ner den mappen här----> 2. dogtraining- frontend

https://github.com/TOtterhall/dogtraining-frontend.git
gh repo clone TOtterhall/dogtraining-frontend

Öppna upp filen i VSC
-> Kör liveserver
-> Fyll i infon (om du vill lägga till, ändra, deleta, eller uppdatera just din hund)
-> Valde att bara skriva ut det i konsolen, det är där du ser att det funkar.

---

Krav som är uppfyllda:

Jag har strävat efter att ha uppfyllt alla följande krav för G samt VG:

Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
All data skall vara sparad i en JSON-fil
Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
APIét ska svara med 404 om datan saknas.
\*Git & GitHub har använts
Projektmappen innehåller en README.md fil - (läs ovan för mer info)
Uppgiften lämnas in i tid!

VG:

Alla punkter för godkänt är uppfyllda
\*Ett klient-gränssnitt skall byggas för att anropa API:ets alla olika endpoints och presentera datan, redigeringsformulär skall fyllas i med befintlig information.

- Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt
