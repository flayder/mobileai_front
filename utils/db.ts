import * as SQLite from 'expo-sqlite'

type updateProps = {
    table_name: string
    names?: any
    values?: any
    where: string
}

var dbexternal: any = null

export class DB {
    static async getDb(): Promise<SQLite.SQLiteDatabase> {
        return new Promise(async (resolve, _) => {
            if(!dbexternal) {
                dbexternal = await SQLite.openDatabaseAsync("medicalai.db")
            }
            resolve(dbexternal)
        })
    }
    static async init() {
        return new Promise(async (resolve, reject) => {
            const db = await this.getDb()
            try {
                await db.runAsync('CREATE TABLE IF NOT EXISTS options (id INTEGER PRIMARY KEY NOT NULL, name TEXT NULL, value TEXT, created_at TIMESTAMP)')
                //await db.runAsync('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, login VARCHAR(255), password VARCHAR(255), token TEXT, created_at TIMESTAMP)')
            } catch(err) {
                reject(err)
            }
            resolve(true)
        })
    }

    static prepareValues(props: any) {
        let str = props.values.join(", ").replace(/((.*)\,?|$)/gi, "?,")
        return str.substr(0, str.length - 1)
    }

    static prepareValuesUpdate(props: any) {
        return props.names.join(" = ?, ") + " = ?"
    }

    static async update(props: updateProps) {
        return new Promise(async (resolve, reject) => {
            if(props?.where && props.where) {
                try {
                    const db = await this.getDb()
                    let sql = `UPDATE ${props.table_name} SET ${DB.prepareValuesUpdate(props)}`
                    sql += ` WHERE ${props.where}`
                    await db.runAsync(sql, [...props.values])
                    const result = await db.getFirstAsync(`SELECT * FROM options`)
                    resolve(result)
                } catch(err) {
                    reject(err)
                }
            }
        })
    }

    static async insertOptions(name: string, value: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.getDb()
                const result = await db.runAsync(`INSERT INTO options (name, value) VALUES (?, ?)`, [name, value])
                resolve(result.lastInsertRowId)
            } catch(err) {
                console.log('err insertOptions', err)
                reject(err)
            }
        })
    }

    static async updateOptions(id: number, name: any, value: any) {
        return new Promise(async (resolve, reject) => {
            
            try {
                const db = await this.getDb()
                const result = await db.runAsync('UPDATE options SET name = ?, value = ? WHERE id = ?', [name, value, id])
                resolve(result)
            } catch(err) {
                reject(err)
            }
        })
    }

    static async deleteOptions(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.getDb()
                await db.runAsync('DELETE FROM options WHERE id = ?', id)
                resolve(0)
            } catch(err) {
                reject(err)
            }
        })
    }

    static async getOption(name: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.getDb()
                const result: any = await db.getFirstAsync(`SELECT value FROM options WHERE name = '${name}' AND value != ''`)
                if(result && typeof result == 'object' && result?.value) {
                    resolve(result.value)
                }

                resolve(false)
            } catch(err) {
                console.log('err db getOption', err)
                reject(err)
            }
        })
    }

    static async getPushing() {
        const pushing = await DB.getOption("pushing")
        if(pushing == 1.0)
            return true
        return false
    }

    static async createOrUpdate(name: string, value: string) {
        //console.log('createOrUpdate', name, value)
        try {
            const isExist = await DB.getOption(name)
            //console.log('isExist', isExist)
            if (isExist) {
                await DB.update({
                    table_name: "options",
                    names: ["value"],
                    values: [value],
                    where: `name = '${name}'`
                })
            } else {
                await DB.insertOptions(name, value)
            }
        } catch(err) {
            //console.log('err db createorupdate', err)
        }

        return Promise.resolve(true)
    }
}