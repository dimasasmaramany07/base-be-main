const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _stockin {
    deleteStockIn(id) {
        const sql = {
            query: `DELETE FROM d_stock-in WHERE id_produk = ?`,
            params: [id]
        }

        return mysql.query(sql.query, sql.params)
            .then(data => {
                return {
                    status: true,
                    data
                }
            }).catch(error => {
                if (debug) {
                    console.error('deleteMachine Error:', error);
                }

                return {
                    status: false,
                    error
                }
            })
    }

    updateStockIn(data) {
        const sql = {
            query: `UPDATE d_stock-in SET jumlah = ?, tanggal_masuk = ? WHERE id_produk = ?`,
            params: [data.name, data.date_birth, data.posisition, data.id]
        }

        return mysql.query(sql.query, sql.params)
            .then(data => {
                return {
                    status: true,
                    data
                }
            }).catch(error => {
                if (error.code == "ER_DUP_ENTRY") {
                    return {
                        status: false,
                        error: "Data sudah ada!"
                    }
                }

                if (debug) {
                    console.error('updateMachine Error:', error);
                }

                return {
                    status: false,
                    error
                }
            })
    }

    addStockIn(data) {
        const sql = {
            query: `INSERT INTO d_stock-in(id_produk, jumlah, tanggal_masuk) VALUES ( ?, ?, ?)`,
            params: [data.id_produk, data.jumlah, data.tanggal_masuk]
        }

        return mysql.query(sql.query, sql.params)
            .then(data => {
                return {
                    status: true,
                    data
                }
            }).catch(error => {
                if (error.code == "ER_DUP_ENTRY") {
                    return {
                        status: false,
                        error: "Data sudah ada!"
                    }
                }

                if (debug) {
                    console.error('addMachine Error:', error);
                }

                return {
                    status: false,
                    error
                }
            })
    }

    listMachineProduction() {
        const formatDateNow = helper.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")

        const sql = {
            query: `
				SELECT
					mcn.machineId,
					mcn.machineName
				FROM s_machine mcn
				JOIN d_shift shf ON mcn.machineId = shf.machineId
				WHERE 1`,
            params: [],
        };

        sql.query += ` AND shf.shiftDate = f_determine_shift_date(?)
					GROUP BY mcn.machineId`
        sql.params.push(formatDateNow)

        return mysql.query(sql.query, sql.params)
            .then(async data => {
                let tmp = [];

                for (let key in data) {
                    tmp.push({
                        id: data[key].machineId,
                        name: data[key].machineName
                    })
                }

                return {
                    status: true,
                    data: tmp
                };
            })
            .catch(error => {
                if (error.code == "EMPTY_RESULT") {
                    return {
                        status: false,
                        error: "Data masih kosong!"
                    }
                }

                if (debug) {
                    console.error('machine list production Error:', error);
                }

                return {
                    status: false,
                    error,
                };
            });
    };

    getStockIn(id) {
        const sql = {
            query: `
                    SELECT
						sti.id_produk,
						sti.jumlah,
						sti.tanggal_masuk,
					FROM d_stock-in sti
					WHERE sti.id_produk = ?`,
            params: [id]
        }

        return mysql.query(sql.query, sql.params)
            .then((data) => {
                return {
                    status: true,
                    data: data,
                };
            })
            .catch((error) => {
                if (debug) {
                    console.error("getDetailKaryawan :", error);
                }
                return {
                    status: false,
                    error,
                };
            });
    }

    listStockIn(options = {}) {
        const { id } = options
        const sql = {
            query: `
                     SELECT
						sti.id_produk,
						sti.jumlah,
						sti.tanggal_masuk,
					FROM d_stock-in sti
					WHERE sti.id_produk = `,
            params: [],
        };

        if (id) {
            sql.query += ` AND emp.id = ?`;
            sql.params.push(id);
        }

        // sql.query += ` ORDER BY mcn.timestamp DESC`

        return mysql.query(sql.query, sql.params)
            .then(async data => {
                let tmp = [];

                for (let key in data) {
                    tmp.push({
                        id: data[key].id,
                        name: data[key].name,
                        date_birth: data[key].date_birth,
                        posisition: data[key].posisition
                    })
                }

                return {
                    status: true,
                    data: id ? tmp[0] : tmp
                };
            })
            .catch(error => {
                if (id && error.code == "EMPTY_RESULT") {
                    return {
                        status: false,
                        error: "Data tidak ditemukan!"
                    }
                }

                if (error.code == "EMPTY_RESULT") {
                    return {
                        status: false,
                        error: "Data masih kosong!"
                    }
                }

                if (debug) {
                    console.error('machine list Error:', error);
                }

                return {
                    status: false,
                    error,
                };
            });
    };
}

// getDetailKaryawan(id) {
// 	const sql = {
// 		query: 
// 		"SELECT emp.id, emp.name, emp.date_birth, emp.posisition FROM tb_employee emp WHERE emp.id = ?",
// 		params: [id]
// 	};
// 	return mysql
// 	.query(sql.query, sql.params)
// 	.then((data) => {
// 			return{
// 				status: true,
// 				data: data,
// 			};

// 		})
// 		.catch((error) => {
// 			if (debug) {
// 				console.error("getDetailKaryawan : ", error);
// 			}

// 			return{
// 				status: false,
// 				error,
// 			};
// 		});	
// }


module.exports = new _stockin();