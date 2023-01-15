var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

function getAllCollections(){
  db.listCollections().then(collections => {
    collections.forEach(collection => {
      console.log(`Collection: ${collection.id}`);
      getItemsByCollection(collection.id);
    });
  }).catch(error => {
    console.log(`Error when obtaining collections: ${error}`);
  });
}

function getItemsByCollection(collectionName){
  const collectionRef = db.collection(collectionName);

  collectionRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data().arrayDates);
      });
    })
    .catch(error => {
      console.log(`Error getting documents from the collection ${collectionName}: ${error}`);
    });
}

function insertData(collectionName, docId, data){
  const collectionRef = db.collection(collectionName);

  collectionRef.doc(docId).update({
    arrayDates: admin.firestore.FieldValue.arrayUnion(data)
  })
  .then(() => {
    console.log("El elemento ha sido agregado exitosamente a la propiedad arrayDates");
    
  })
  .catch(error => {
    console.log(`Error al agregar el elemento a la propiedad arrayDates: ${error}`);
  });
  
}

getAllCollections();

const newElement = {
  name: "Nueva actividad",
  place: new admin.firestore.GeoPoint(37.78, -122.41),
  realized: false,
  suggestions: ["Opción 1", "Opción 2", "Opción 3"],
  updated_by: "Pierre",
  updated: admin.firestore.Timestamp.fromDate(new Date()),
  created: admin.firestore.Timestamp.fromDate(new Date()),
  possible_location: "Parque de atracciones",
  photo_url: "https://example.com/foto.jpg",
  number: 3
};

insertData('nameCollection','docName', newElement);