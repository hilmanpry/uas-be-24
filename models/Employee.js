// import database
const db = require("../config/database");

// membuat class model Employee
class Employee {
    static async all() {
        // return Promise sebagai solusi Asynchronous
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employees`;
            db.query(sql, (err, results) => {
                resolve(results);
            });
        });
    }

    static async create(data) {
        // melakukan insert data ke database
        const id = await new Promise((resolve, reject) => {
            const sql = `INSERT INTO employees SET ?`;
            db.query(sql, data, (err, results) => {
                resolve(results.insertId);
            });
        });
        // menampilkan data yang baru saja diinsert
        const employee = this.find(id);
        return employee;
    }

    static async update(id, data) {
        // melakukan update data ke database
        await new Promise((resolve, reject) => {
            const sql = `UPDATE employees SET ? WHERE id = ?`;
            db.query(sql, [data, id], (err, results) => {
                resolve(results);
            });
        });
        // menampilkan data yang baru saja diupdate
        const employee = await this.find(id);
        return employee;
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM employees WHERE id = ?`;
            db.query(sql, id, (err, results) => {
                resolve(results);
            });
        });
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employees WHERE id = ?`;
            db.query(sql, id, (err, results) => {
                resolve(results[0]);
            });
        });
    }

    static search(name) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employees WHERE name LIKE '%${name}%'`;
            db.query(sql, (err, results) => {
                resolve(results);
            });
        });
    }

    static findByStatus(status) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM employees WHERE status = ?`;
            db.query(sql, status, (err, results) => {
                resolve(results);
            });
        });
    }
}

module.exports = Employee;