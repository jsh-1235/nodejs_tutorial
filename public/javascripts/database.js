'use strict';
var mysql = require('mysql');
var security = require('./security');

// function connect() {
//     return mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'jshhaby0921++',
//         database: 'License',
//         port: 3306,
//         ssl: false
//     });
// }

function connect() {
    return mysql.createConnection({
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'b7f38136889ea3',
        password: '9bc0ca2f',
        database: 'heroku_c7d8ff5943024e2',
        port: 3306,
        ssl: false
    });
}

module.exports.select = function () {
    return new Promise(function (resolve, reject) {
        var client = connect();

        var records = [];

        client.query('SELECT * FROM certification', function (error, rows, fields) {
            if (error) {
                return reject(error);
            } else {
                for (var i = 0; i < rows.length; i++) {
                    var row = {
                        'id': rows[i].id,
                        'date': rows[i].date,
                        'serialNumber': rows[i].serialNumber,
                        'licenseKey': rows[i].licenseKey,
                        'state': rows[i].state,
                        'mac': rows[i].mac,
                    }

                    records.push(row);
                }

                resolve(records);
            }
        });

        client.end();
    });
}

function create(length) {
    var table = new Array();

    var today = new Date();

    for (var i = 0; i < length; i++) {
        var serialNumber = "SN_" + security.pad(i + 1, 4);

        var licenseKey = security.encrypt(serialNumber);

        var state = "Unregister"

        table.push({ date: today.toLocaleString(), serialNumber: serialNumber, licenseKey: licenseKey, state: state, mac: '' });
    }

    return table;
}

module.exports.insert = function (length) {
    return new Promise(function (resolve, reject) {
        var row = create(length);

        var client = connect();

        var sql = "INSERT INTO certification (date, serialNumber, licenseKey, state, mac) VALUES (?, ?, ?, ?, ?)";

        for (var i = 0; i < row.length; i++) {
            client.query(sql, [row[i].date, row[i].serialNumber, row[i].licenseKey, row[i].state, row[i].mac], function (error, result) {
                if (error) {
                    return reject(error);
                } else {
                    resolve(row);
                }
            });
        }

        client.end();
    });
}

module.exports.clear = function () {
    return new Promise(function (resolve, reject) {
        var client = connect();

        var sql = "DELETE FROM certification";

        client.query(sql, function (error, result) {
            if (error) {
                return reject(error);
            } else {
                resolve(result);
            }
        });

        client.end();
    });
}

module.exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        var client = connect();

        var sql = "DELETE FROM certification WHERE id=" + id;

        client.query(sql, function (error, result) {
            if (error) {
                return reject(error);
            } else {
                resolve(result);
            }
        });

        client.end();
    });
}