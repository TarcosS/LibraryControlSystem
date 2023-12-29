import { useEffect, useState } from "react";
import service from "./service"
import TableCard, { Table } from "../../components/Cards/TableCard";
import ReservationModel from "../../components/Modals/ReservationModal";

export default function Tables() {
    const [tables, setTables] = useState<Table[]>([]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalTable, setModalTable] = useState<Table | null>(null);
    const [modalEvent, setModalEvent] = useState('');
    
    const showModal = (table: Table) => {
      setOpen(true);
      setModalTable(table);
    };
    
    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    };
  
    const handleCancel = () => {
      setModalTable(null)
      setOpen(false);
    };

    const updateTables = async () => {
        const response = await service.getTables();
        if (response.status === "success") {
            setTables(response.data);
        }
    }
    
    const reserv = async (tableId: string, times: string[]) => {
        const response = await service.reservTable(tableId, times);
        if (response.status === "success") {
            handleCancel();
            updateTables();
        }
    }

    useEffect(() => {
        updateTables();
    }, []);
    
    return (
        <>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        tables.map((table) => <TableCard onClick={() => {showModal(table)}} table={table}/>)
                    }
                </div>
            </div>
            <ReservationModel
                open={open}
                handleCancel={handleCancel}
                table={modalTable}
                reserv={reserv}
            />
        </>
    )
}