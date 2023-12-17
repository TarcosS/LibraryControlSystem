import Reservation from "./Reservation";
import Table from "./Table";
import User from "./User";

export default function initAssociations() {
    Reservation.belongsTo(Table, { foreignKey: 'tableId' });
    Reservation.belongsTo(User, { foreignKey: 'userId' });
}