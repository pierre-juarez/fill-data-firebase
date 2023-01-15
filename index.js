var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function getAllCollections(){
  db.listCollections().then(collections => {
    collections.forEach(collection => {
      console.log(`Colección: ${collection.id}`);
    });
  }).catch(error => {
    console.log(`Error al obtener las colecciones: ${error}`);
  });
}

getAllCollections();