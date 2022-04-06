const config = require(`${__config_dir}/app.config.json`);
const { debug } = config;
const helper = require(`${__class_dir}/helper.class.js`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const __handler = require(__basedir + '/class/fileHandling.class.js');
const handler = new __handler(__basedir + '/public/image/parts/');

class _Node {
    // deleteKaryawan(id) {
    //     const sql = {
    //         query: `DELETE FROM tb_employee WHERE id = ?`,
    //         params: [id]
    //     }

    //     return mysql.query(sql.query, sql.params)
    //         .then(data => {
    //             return {
    //                 status: true,
    //                 data
    //             }
    //         }).catch(error => {
    //             if (debug) {
    //                 console.error('deleteMachine Error:', error);
    //             }

    //             return {
    //                 status: false,
    //                 error
    //             }
    //         })
    // }

    // updateKaryawan(data) {
    //     const sql = {
    //         query: `UPDATE tb_employee SET name = ?, date_birth = ?, posisition = ? WHERE id = ?`,
    //         params: [data.name, data.date_birth, data.posisition, data.id]
    //     }

    //     return mysql.query(sql.query, sql.params)
    //         .then(data => {
    //             return {
    //                 status: true,
    //                 data
    //             }
    //         }).catch(error => {
    //             if (error.code == "ER_DUP_ENTRY") {
    //                 return {
    //                     status: false,
    //                     error: "Data sudah ada!"
    //                 }
    //             }

    //             if (debug) {
    //                 console.error('updateMachine Error:', error);
    //             }

    //             return {
    //                 status: false,
    //                 error
    //             }
    //         })
    // }

    // addKaryawan(data) {
    //     const sql = {
    //         query: `INSERT INTO tb_employee(id, name, date_birth, posisition) VALUES (?, ?, ?, ?)`,
    //         params: [data.id, data.name, data.date_birth, data.posisition]
    //     }

    //     return mysql.query(sql.query, sql.params)
    //         .then(data => {
    //             return {
    //                 status: true,
    //                 data
    //             }
    //         }).catch(error => {
    //             if (error.code == "ER_DUP_ENTRY") {
    //                 return {
    //                     status: false,
    //                     error: "Data sudah ada!"
    //                 }
    //             }

    //             if (debug) {
    //                 console.error('addMachine Error:', error);
    //             }

    //             return {
    //                 status: false,
    //                 error
    //             }
    //         })
    // }

    // listMachineProduction() {
    //     const formatDateNow = helper.formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")

    //     const sql = {
    //         query: `
    // 			SELECT
    // 				mcn.machineId,
    // 				mcn.machineName
    // 			FROM s_machine mcn
    // 			JOIN d_shift shf ON mcn.machineId = shf.machineId
    // 			WHERE 1`,
    //         params: [],
    //     };

    //     sql.query += ` AND shf.shiftDate = f_determine_shift_date(?)
    // 				GROUP BY mcn.machineId`
    //     sql.params.push(formatDateNow)

    //     return mysql.query(sql.query, sql.params)
    //         .then(async data => {
    //             let tmp = [];

    //             for (let key in data) {
    //                 tmp.push({
    //                     id: data[key].machineId,
    //                     name: data[key].machineName
    //                 })
    //             }

    //             return {
    //                 status: true,
    //                 data: tmp
    //             };
    //         })
    //         .catch(error => {
    //             if (error.code == "EMPTY_RESULT") {
    //                 return {
    //                     status: false,
    //                     error: "Data masih kosong!"
    //                 }
    //             }

    //             if (debug) {
    //                 console.error('machine list production Error:', error);
    //             }

    //             return {
    //                 status: false,
    //                 error,
    //             };
    //         });
    // };

    // getDetailKaryawan(id) {
    //     const sql = {
    //         query: `
    //                 SELECT
    // 					emp.id,
    // 					emp.name,
    // 					emp.date_birth,
    // 					emp.posisition
    // 				FROM tb_employee emp
    // 				WHERE emp.id = ?`,
    //         params: [id]
    //     }

    //     return mysql.query(sql.query, sql.params)
    //         .then((data) => {
    //             return {
    //                 status: true,
    //                 data: data,
    //             };
    //         })
    //         .catch((error) => {
    //             if (debug) {
    //                 console.error("getDetailKaryawan :", error);
    //             }
    //             return {
    //                 status: false,
    //                 error,
    //             };
    //         });
    // }

    listNode(options = {}) {
        const { id } = options
        const sql = {
            query: `
                    SELECT
						ens.id,
						ens.sensor1,
						ens.sensor2,
						ens.sensor3,
						ens.sensor4,
						ens.sensor5,
						ens.sensor6 
					FROM tb_enose ens WHERE 1`,
            params: [],
        };

        if (id) {
            sql.query += ` AND ens.id = ?`;
            sql.params.push(id);
        }

        // sql.query += ` ORDER BY ens.id DESC`

        return mysql.query(sql.query, sql.params)
            .then(async data => {
                let tmp = [];

                for (let key in data) {
                    tmp.push({
                        id: data[key].id,
                        sensor1: data[key].sensor1,
                        sensor2: data[key].sensor2,
                        sensor3: data[key].sensor3,
                        sensor4: data[key].sensor4,
                        sensor5: data[key].sensor5,
                        sensor6: data[key].sensor6
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


module.exports = new _Node();