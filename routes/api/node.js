const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$node = require(`${__module_dir}/node.module.js`);

// router.get('/list-production', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$node.listMachineProduction();
// 	helper.sendResponse(res, list);
// });

router.get('/', async function(req, res, next) {
    const list = await m$node.listNode();
    helper.sendResponse(res, list);
});

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$karyawan.listMachine({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

// router.post('/', async function(req, res, next) {
//     const add = await m$karyawan.addKaryawan(req.body);
//     helper.sendResponse(res, add);
// });

// router.put('/:id', async function(req, res, next) {
//     // const update = await m$karyawan.updateKaryawan({
//     // 	name: req.body.name,
//     // 	date_birth: req.body.date_birth,
//     // 	posisition: req.body.posisition,
//     // },
//     // req.params.id);

//     const update = await m$karyawan.updateKaryawan({...req.body, id: req.params.id });
//     helper.sendResponse(res, update);
// });

// router.delete('/:id', async function(req, res, next) {
//     const deleteKaryawan = await m$karyawan.deleteKaryawan(req.params.id);
//     helper.sendResponse(res, deleteKaryawan);
// });

// router.get('/:id', async function(req, res, next) {
//     const detail = await m$karyawan.getDetailKaryawan(req.params.id);
//     helper.sendResponse(res, detail);
// });

module.exports = router;