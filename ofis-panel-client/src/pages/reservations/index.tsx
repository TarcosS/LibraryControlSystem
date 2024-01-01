import { useEffect, useState } from "react";
import TableCard from "../../components/Cards/TableCard";
import service from "./service";
import AnyDataInfoCard from "../../components/Cards/AnyDataInfoCard";
import ReservationModel from "../../components/Modals/ReservationModal";
import ReservationControlModal from "../../components/Modals/ReservationControllModal";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Dropdown, MenuProps, Tag } from "antd";
import { EyeOutlined, EditOutlined, CloudDownloadOutlined, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';

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
    Table: any,
    User: any
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
    
    const verifyReservation = async (reservationId: string) => {
        const response = await service.deleteReservation(reservationId);
        if (response.status === "success") {
            handleCancel();
            updateReservations();
        }
    }

    useEffect(() => {
        updateReservations()
    }, []);

    const dataSource = reservations;
    
    const columns: ColumnsType<any> =[
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Table',
            dataIndex: ['Table', 'name'],
            key: 'name'
        },
        {
            title: 'Times',
            dataIndex: 'reservAt',
            key: 'reservAt',
            render: (_:any, {reservAt}: any) => <>{reservAt.join(', ')}</>
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (_:any, { isActive }: any) => {
                let color = isActive ? 'green' : 'geekblue';
    
                return (
                    <Tag color={color} key={isActive}>
                        {isActive ? 'Active' : 'Cancelled'}
                    </Tag>
                );
            },
        },
        {
            title: 'Published At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_:any, { createdAt }: any) => {
                return (
                    <>
                        {
                            createdAt ? new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"}).format(new Date(createdAt)) : '-'
                        }
                    </>
                )
            }
        },
        {
            title: '',
            dataIndex: 'action',
            fixed: 'right',
            width: 60,
            render: (_, value, record) => {
                const onClick: MenuProps['onClick'] = ({ key }) => {
                    switch(key) {
                        case '1':
                            verifyReservation(value.id)
                            break;
                        default:
                            break;
                    }
                };
                const items: MenuProps['items'] = [
                    {
                      label: 'Delete',
                      key: '1',
                      icon: <DeleteOutlined />,
                      danger: true
                    }
                ];
                const menuProps = {
                    items,
                    onClick
                };
                return (
                    <Dropdown placement="bottomRight" menu={menuProps} className='cursor-pointer'>
                        <Button type="default" icon={<EyeOutlined />} />
                    </Dropdown>
                )
            }
        }
    
        ];

    return (
        <>
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={false} className='mb-3 w-full' scroll={{ x: 1200 }}/>
            </div>
        </>
    )
}