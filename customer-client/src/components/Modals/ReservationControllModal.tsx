import { Button, Modal } from "antd";
import { useState } from "react";
import { ReservationProps } from "../../pages/reservations";
import {QrScanner} from '@yudiel/react-qr-scanner';

type Props = {
    reservation: ReservationProps | null,
    open: boolean,
    handleCancel: () => void,
    cancelReserv: (reservationId: string) => void,
    verifyReserv: (tableId: string) => void
}

const times: string[] = Array.from({length: 13}, (_, i) => i + 1).map(number => {
    return `${(number + 8).toString().padStart(2, '0')}:00`
});

export default function ReservationControlModal({reservation, open, handleCancel, cancelReserv, verifyReserv}: Props) {
    const [tab, setTab] = useState(0);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    return (
        <Modal
            title={"Reservasyon Kontrol"}
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
                                        Rezervasyon Doğrula
                                    </Button>
                                    <Button
                                        className="w-full"
                                        size="large"
                                        danger
                                        onClick={() => {
                                            reservation?.id && cancelReserv(reservation?.id)
                                        }}
                                    >
                                        İptal Et
                                    </Button>
                                </div>
                            )
                        case 1:
                            return (
                                <div>
                                    <div>
                                        <QrScanner
                                            onDecode={(result) => result ? verifyReserv(result) : null}
                                            onError={(error) => console.log(error?.message)}
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3 py-2 w-full">
                                        <Button
                                            className="w-full"
                                            size="large"
                                            onClick={() => {setTab(0)}}
                                        >
                                            Geri
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