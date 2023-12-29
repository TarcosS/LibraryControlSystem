import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import User from "../models/User";
import Reservation from "../models/Reservation";
import Table from "../models/Table";

const reservationRouter = Router();

reservationRouter.post('/createReservation', isAuth, (req, res) => {
    const { tableId, times} = req.body;
    if(req.userId) {
        User.findOne({
            where: {
                id: req.userId,
                isActive: true,
                isDeleted: false
            }
        }).then(user => {
            if(user){
                Reservation.create({
                    userId: user.dataValues.id,
                    tableId: tableId,
                    reservAt: [...times]
                }).then((reservation) => {
                    if(reservation) {
                        Table.findByPk(tableId).then(table => {
                            if(table){
                                table.update({ reservAt: [...table.dataValues.reservAt, ...times] }).then(() => {
                                    return res.status(200).json({status: 'success', message: 'Reservation created'});
                                }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
                            }else {
                                return res.status(500).json({status: 'warning', message: 'Table Not Updated!!'});
                            }
                        })
                    }else {
                        return res.status(500).json({status: 'warning', message: 'Table Not Finded!!'});
                    }
                }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
            }else {
                return res.status(500).json({status: 'warning', message: 'User not found!!'});
            }
        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
    }else {
        return res.status(500).json({status: 'warning', message: 'Please auth or send userId!!'});
    }
});

reservationRouter.get('/getReservations', isAuth, (req, res) => {
    Reservation.findAll({
        where: {
            userId: req.userId
        }
    }).then(reservations => {
        if(reservations){
            return res.status(200).json({status: 'success', data: reservations});
        }else {
            return res.status(500).json({status: 'warning', message: 'Reservations not found!!'});
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'Reservations not found!!'})}});
});

reservationRouter.post('/verifyReservation', isAuth, (req, res) => {
    const { tableId } = req.body as { tableId: string };
    Reservation.findOne({
        where: {
            userId: req.userId,
            tableId: tableId,
            isActive: true
        }
    }).then(reservation => {
        reservation?.update({ isActive: false }).then(update => {
            if(reservation){
                Table.update({isActive: false}, {where: {id: tableId}}).then(table => {
                    if(table){
                        return res.status(200).json({status: 'success', message: 'Session started successfully'});
                    }else {
                        return res.status(500).json({status: 'warning', message: 'Session not started dont sit the table!!'});
                    }
                })
            }else {
                return res.status(500).json({status: 'warning', message: reservation});
            }
        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
    });
})

reservationRouter.post('/cancelReservation', (req, res) => {
    const { reservationId } = req.body as { reservationId: string };
    Reservation.findByPk(reservationId).then(reservation => {
        reservation?.update({ isCancelled: true, isActive: false}).then(update => {
            if(reservation){
                Table.findByPk(reservation.dataValues.tableId).then(table => {
                    if(table){
                        var reserv = [...table.dataValues.reservAt];
                        reservation.dataValues.reservAt.map((time: string) => {
                            reserv.splice(reserv.indexOf(time), 1);
                        });
    
                        table.update({ reservAt: [...reserv] }).then(() => {
                            return res.status(200).json({status: 'success', message: 'Reservation deleted successfully'});
                        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
                    }else {
                        return res.status(500).json({status: 'warning', message: 'Table Not Updated!!'});
                    }
                })
            }else {
                return res.status(500).json({status: 'warning', message: reservation});
            }
        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
    });
})

export default reservationRouter;