import { useEffect, useState } from "react";
import TableCard from "../../components/Cards/TableCard";
import service from "./service";
import AnyDataInfoCard from "../../components/Cards/AnyDataInfoCard";
import ReservationModel from "../../components/Modals/ReservationModal";
import ReservationControlModal from "../../components/Modals/ReservationControllModal";

export type ReservationProps = {
    id: string,
    tableId: string,
    userId: string,
    tableType: string,
    reservAt: string[],
    isDeleted: boolean,
    isActive: boolean,
    isCancelled: boolean,
    createdAt: string,
    updatedAt: string,
}

export default function Reservations() {
    const [reservations, setReservations] = useState<ReservationProps[]>([]);
    const [open, setOpen] = useState(false);
    const [modalReservation, setModalReservation] = useState<ReservationProps | null>(null);

    const showModal = (reservation: ReservationProps) => {
        setOpen(true);
        setModalReservation(reservation);
    };
    
    const handleCancel = () => {
        setModalReservation(null)
        setOpen(false);
    };
  
    const updateReservations = async () => {
        const response = await service.getReservations();
        if (response.status === "success") {
            setReservations(response.data);
        }
    }

    const cancelReservation = async (reservationId: string) => {
        const response = await service.cancelReservation(reservationId);
        if (response.status === "success") {
            handleCancel();
            updateReservations();
        }
    }
    
    const verifyReservation = async (tableId: string) => {
        const response = await service.verifyReservation(tableId);
        if (response.status === "success") {
            handleCancel();
            updateReservations();
        }
    }

    useEffect(() => {
        updateReservations()
    }, []);

    return (
        <>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        reservations.map((reservation) => <AnyDataInfoCard onClick={reservation.isCancelled || reservation.isDeleted ? () => {alert('Bu reservasyon aktif değil!')} : showModal} reservation={reservation}/>)
                    }
                </div>
            </div>
            <ReservationControlModal
                open={open}
                handleCancel={handleCancel}
                reservation={modalReservation}
                cancelReserv={cancelReservation}
                verifyReserv={verifyReservation}
            />
        </>
    )
}