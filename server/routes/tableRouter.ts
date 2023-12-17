import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import Table from "../models/Table";

const tableRouter = Router();

tableRouter.post('/createTable', (req, res) => {
    const { tableName, tableType } = req.body;
    Table.create({
        name: tableName,
        tableType: tableType,
        reservAt: null
    }).then(table => {
        if(table){
            return res.status(200).json({status: 'success', message: 'Table created'});
        }else {
            return res.status(500).json({status: 'warning', message: 'Table not created!!'});
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
});

tableRouter.get('/getTables', (req, res) => {
    Table.findAll({}).then(tables => {
        if(tables){
            return res.status(200).json({status: 'success', data: tables});
        }else {
            return res.status(500).json({status: 'warning', message: 'Tables not found!!'});
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'Table not created!!'})}});
});

tableRouter.delete('/removeTable', (req, res) => {
    const { tableId } = req.query as { tableId: string};
    Table.destroy({
        where: {
            id: tableId
        }
    }).then(table => {
        if(table){
            return res.status(200).json({status: 'success', message: 'Table deleted'});
        }else {
            return res.status(500).json({status: 'warning', message: table});
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
})

export default tableRouter;