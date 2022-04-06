const express = require('express');
const router = express.Router();

const session = require(__module_dir + '/session.module.js');
const helper = require(__class_dir + '/helper.class.js');

const m$stockin = require(`${__module_dir}/stockin.module.js`);

// router.get('/list-production', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$stockin.listMachineProduction();
// 	helper.sendResponse(res, list);
// });

router.get('/', async function(req, res, next) {
    const list = await m$stockin.listStockIn();
    helper.sendResponse(res, list);
});

// router.get('/detail/:id', session.sessionChecker, session.groupChecker, async function (req, res, next) {
// 	const list = await m$stockin.listMachine({ id: req.params.id });
// 	helper.sendResponse(res, list);
// });

router.post('/', async function(req, res, next) {
    const add = await m$stockin.addStockIn(req.body);
    helper.sendResponse(res, add);
});

router.put('/:id', async function(req, res, next) {
    // const update = await m$stockin.updateKaryawan({
    // 	name: req.body.name,
    // 	date_birth: req.body.date_birth,
    // 	posisition: req.body.posisition,
    // },
    // req.params.id);

    const update = await m$stockin.updateStockIn({...req.body, id: req.params.id });
    helper.sendResponse(res, update);
});

router.delete('/:id', async function(req, res, next) {
    const deleteStockIn = await m$stockin.deleteStockIn(req.params.id);
    helper.sendResponse(res, deleteStockIn);
});

router.get('/:id', async function(req, res, next) {
    const detail = await m$stockin.getDetailStockIn(req.params.id);
    helper.sendResponse(res, detail);
});

module.exports = router;