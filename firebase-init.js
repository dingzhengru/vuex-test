function clearCollection(db, coll) {
    console.log('clearCollection', coll);
    db.collection(coll).get().then((shotsnap) => {
        shotsnap.forEach((doc) => {
            db.collection(coll).doc(doc.id).delete();
        });
    });
}

function setNewData(db, coll, data) {
    console.log('setNewData', coll, data.length);
    if(Array.isArray(data)) {
        data.forEach((d) =>  {
            db.collection(coll).doc().set(d);
        })
    } else {
        db.collection(coll).doc().set(data);
    }
}

function initCollection(db, coll, data) {
    console.log('initCollection', coll, data.length);
    let index = 0;
    db.collection(coll).get()
    .then((shotsnap) => {
        if(shotsnap.docs.length == 0) {
            console.log('沒資料 直接Set進去');
            setNewData(db, coll, data);
        } else {
            console.log('先清光資料，再Set進去(最後一筆時代表index == docs.length')
            shotsnap.forEach((doc) => {
                index++;
                db.collection(coll).doc(doc.id).delete();
                if(index == shotsnap.docs.length)
                    setNewData(db, coll, data);
            });
        }
    })
    .catch((error) => { console.log("initCollection Error:", error) });
}

import { firebase, db } from './firebase.js'


export default function() {
    console.log('init')
}