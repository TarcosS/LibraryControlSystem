export type Table = {
    createdAt: string,
    id: string,
    isActive: boolean,
    isDeleted: boolean,
    name: string,
    reservAt: string[],
    tableType: string,
    updatedAt: string
}

export default function TableCard({table, onClick}: {table?: Table, onClick?: () => void}) {
    if(!table || !onClick) {
        Error('Table must be defined!');
        return <></>;
    }

    return (
        <div 
            className="overflow-hidden shadow rounded-lg cursor-pointer transition-transform hover:scale-105 relative"
            style={{
                background: 'radial-gradient(circle, rgb(82, 229, 231) 0%, rgb(81 166 226)100%)'
            }}
            onClick={() => {onClick()}}
        >
            {
                <div className="absolute right-3 pt-3 pb-1 bg-slate-500 px-1 rounded-b-xl">
                    <div className={`rounded-full w-4 aspect-square animate-pulse ${table.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
            }
            <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-center items-center aspect-square text-xl">
                    {table.name}
                </div>
            </div>
            </div>
    )
}