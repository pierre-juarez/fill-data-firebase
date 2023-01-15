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
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch(error => {
      console.log(`Error getting documents from the collection ${collectionName}: ${error}`);
    });
}

getAllCollections();