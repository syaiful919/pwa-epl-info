let dbPromised = idb.open("epl-info", 1, (upgradeDb) => {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

const saveTeam = (team) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      console.log(">>> saved");
    });
};

const removeTeam = (team) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.delete(team.id);
      return tx.complete;
    })
    .then(() => {
      console.log(">>> deleted");
    });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((team) => {
        resolve(team);
      });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(id)
      })
      .then((team) => {
        resolve(team);
      })
      .catch((e)=>{
        reject(e)
      })
  });
};
