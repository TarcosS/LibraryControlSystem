import { Button, Modal } from "antd";
import { Table } from "../Cards/TableCard";
import { useState } from "react";
import service from "../../pages/tables/service";

type Props = {
    table: Table | null,
    open: boolean,
    handleCancel: () => void,
    reserv: (tableId: string, times: string[]) => void
}

const times: string[] = Array.from({length: 13}, (_, i) => i + 1).map(number => {
    return `${(number + 8).toString().padStart(2, '0')}:00`
});

export default function ReservationModel({table, open, handleCancel, reserv}: Props) {
    const [tab, setTab] = useState(0);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    return (
        <Modal
            title={table?.name}
            open={open}
            onCancel={()=>{handleCancel(); setTab(0); setSelectedTime([]);}}
            footer={null}
        >
            {
                (() => {
                    switch(tab) {
                        case 0: 
                            return (
                                <div className="flex flex-col gap-3 py-2 w-full">
                                    <Button
                                        className="w-full"
                                        size="large"
                                        onClick={() => {setTab(1)}}
                                    >
                                        Rezervasyon Yap
                                    </Button>
                                    <Button
                                        className="w-full"
                                        size="large"
                                        onClick={() => {setTab(2)}}
                                    >
                                        Rezervasyon Doğrula
                                    </Button>
                                </div>
                            )
                        case 1:
                            return (
                                <div>
                                    <div className="grid grid-cols-2 gap-2 mb-4 mt-4">
                                        {
                                            times.map((time, index) => (
                                                <Button
                                                    onClick={() => {
                                                        if(selectedTime.some(a => a === time)) {
                                                            setSelectedTime(prev => {
                                                                var times = [...prev];
                                                                times.splice(times.findIndex(a => a === time), 1);
                                                                return times;
                                                            });
                                                        }else {
                                                            if(selectedTime.length === 3) return;
                                                            setSelectedTime([...selectedTime, time]);
                                                        }
                                                    }}
                                                    type={selectedTime.some(a => a === time) ? "dashed" : table?.reservAt.some(a => a === time) ? "primary" : "text"}
                                                    disabled={table?.reservAt.some(a => a === time)}
                                                >
                                                    {time}
                                                </Button>
                                            ))
                                        }
                                    </div>
                                    <div className="flex flex-row gap-3 py-2 w-full">
                                        <Button
                                            className="w-full"
                                            size="large"
                                            onClick={() => {setTab(0)}}
                                        >
                                            Geri
                                        </Button>
                                        <Button
                                            className="w-full"
                                            size="large"
                                            onClick={() => {table?.id && reserv(table?.id, selectedTime)}}
                                        >
                                            Rezervasyon Yap
                                        </Button>
                                    </div>
                                </div>
                            )
                        default: 
                            return <></>
                    }
                })()
            }
        </Modal>
    )
}