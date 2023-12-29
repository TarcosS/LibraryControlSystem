import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

const Table = sequelize.define('Table', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, { timestamps: true })

export default Table