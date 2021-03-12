import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('dictionarySettings.db')

export class SettingsDB {
    static init () {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS dictionarySettings (id INTEGER PRIMARY KEY NOT NULL, langNum INTEGER, lang1Caption TEXT, lang2Caption TEXT, lang3Caption TEXT, sorting TEXT)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    };

    static getSettings () {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM dictionarySettings WHERE id = 1',
                    [],
                    (_, result) => resolve(result.rows._array[0]),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createSettings ({ langNum, lang1Caption, lang2Caption, lang3Caption, sorting }) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO dictionarySettings (langNum, lang1Caption, lang2Caption, lang3Caption, sorting) VALUES ( ?, ?, ?, ?, ? )',
                    [ langNum, lang1Caption, lang2Caption, lang3Caption, sorting ],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateSettings ({ langNum, lang1Caption, lang2Caption, lang3Caption, sorting, id }) {
        //console.log("DB: ", langNum, lang1Caption, lang2Caption, lang3Caption, sorting, id)
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE dictionarySettings SET langNum = ?, lang1Caption = ?, lang2Caption = ?, lang3Caption = ?, sorting = ? WHERE id = ?',
                    [ langNum, lang1Caption, lang2Caption, lang3Caption, sorting, id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static removeSettings ( id ) {
        //console.log(id)
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM dictionarySettings WHERE id = ?',
                    [ id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
}