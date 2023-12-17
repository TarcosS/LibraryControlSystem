import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import User from "../models/User";
import Reservation from "../models/Reservation";
import Table from "../models/Table";

const reservationRouter = Router();

reservationRouter.post('/createReservation', isAuth, (req, res) => {
    const { tableId, userId } = req.body;
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
                }).then((reservation) => {
                    if(reservation) {
                        Table.update({ reservAt: new Date().getTime() + (60 * 60), isActive: false }, {
                            where: {
                                id: tableId
                            }
                        }).then(table => {
                            if(table){
                                return res.status(200).json({status: 'success', message: 'Reservation created'});
                            }else {
                                return res.status(500).json({status: 'warning', message: 'Table Not Updated!!'});
                            }
                        })
                    }else {
                        return res.status(500).json({status: 'warning', message: 'Table Not Finded!!'});
                    }
                }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'Reservation not created!!'})}});
            }else {
                return res.status(500).json({status: 'warning', message: 'User not found!!'});
            }
        }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'User not found!!'})}});
    }else {
        return res.status(500).json({status: 'warning', message: 'Please auth or send userId!!'});
    }
});

reservationRouter.get('/getReservations', isAuth, (req, res) => {
    Reservation.findAll().then(reservations => {
        if(reservations){
            return res.status(200).json({status: 'success', data: reservations});
        }else {
            return res.status(500).json({status: 'warning', message: 'Reservations not found!!'});
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: 'Reservations not found!!'})}});
});

reservationRouter.delete('/removeReservation', (req, res) => {
    const { reservationId } = req.query as { reservationId: string };
    Reservation.findByPk(reservationId).then(reservation => {
        if(reservation){
            reservation.destroy().then((destroy)=>{
                Table.update({ reservAt: null, isActive: true }, {
                    where: {
                        id: reservation.dataValues.tableId
                    }
                }).then(() => {
                    return res.status(200).json({status: 'success', message: 'Reservation deleted'});
                }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
            }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
        }else {
            return res.status(500).json({status: 'warning', message: reservation});
        }
    }).catch(err => {if(err){return res.status(500).json({status: 'warning', message: err})}});
})

export default reservationRouter;