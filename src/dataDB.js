import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('dictionaryData.db')

export class DataDB {
    static init () {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS dictionaryData (id INTEGER PRIMARY KEY NOT NULL, lang1 TEXT, lang2 TEXT, lang3 TEXT)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    };

    static getItems () {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM dictionaryData',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createItems ({ lang1, lang2, lang3 }) {
        //console.log("create: ", lang1, lang2, lang3)
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO dictionaryData (lang1, lang2, lang3) VALUES ( ?, ?, ? )',
                    [ lang1, lang2, lang3 ],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateItems ({ lang1, lang2, lang3, id }) {
        //console.log("update: ", lang1, lang2, lang3, id)
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE dictionaryData SET lang1 = ?, lang2 = ?, lang3 = ? WHERE id = ?',
                    [ lang1, lang2, lang3, id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static removeItems ( id ) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM dictionaryData WHERE id = ?',
                    [ id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
}