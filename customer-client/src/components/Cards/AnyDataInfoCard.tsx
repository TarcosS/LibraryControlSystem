import { ReservationProps } from "../../pages/reservations";

export default function AnyDataInfoCard({reservation, onClick}: {reservation: ReservationProps, onClick: (reservation: ReservationProps) => void}) {
    return (
        <div onClick={() => {onClick(reservation)}} className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${reservation.isActive ? 'bg-green-500' : (reservation.isDeleted || reservation.isCancelled) ? 'bg-red-500' : 'bg-blue-500'}`}>
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Reservation - {new Date(reservation.createdAt).toLocaleDateString()}
                            </dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">
                                    {reservation.reservAt.join(" - ")}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}