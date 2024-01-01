import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';
import User from './User';
import Table from './Table';

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    tableId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Table,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    tableType: {
        type: DataTypes.ENUM('normal', 'private'),
        defaultValue: 'normal',
    },
    reservAt: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isCancelled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, { timestamps: true })

export default Reservation