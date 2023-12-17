import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    tableId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    tableType: {
        type: DataTypes.ENUM('normal', 'private'),
        defaultValue: 'normal',
    },
    isDeleted: {
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