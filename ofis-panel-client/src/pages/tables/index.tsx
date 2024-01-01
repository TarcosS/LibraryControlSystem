import { useEffect, useState } from "react";
import service from "./service"
import TableCard, { TableType } from "../../components/Cards/TableCard";
import ReservationModel from "../../components/Modals/ReservationModal";
import { Button, Dropdown, MenuProps, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { EyeOutlined, EditOutlined, CloudDownloadOutlined, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Tables() {
    const [tables, setTables] = useState<TableType[]>([]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalTable, setModalTable] = useState<TableType | null>(null);
    const [modalEvent, setModalEvent] = useState('');
    
    const showModal = (table: TableType) => {
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
    
    const deleteTable = async (tableId: string) => {
        const response = await service.deleteTable(tableId);
        if (response.status === "success") {
            handleCancel();
            updateTables();
        }
    }

    useEffect(() => {
        updateTables();
    }, []);
    
    const dataSource = tables;
    
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
            title: 'Title',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (_:any, { isActive }: any) => {
                let color = isActive ? 'green' : 'geekblue';
    
                return (
                    <Tag color={color} key={isActive}>
                        {isActive ? 'FREE' : 'FULL'}
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
                            deleteTable(value.id)
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