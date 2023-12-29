import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardLayout from '../pages/dashboard';
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import Page_404 from "../components/404";
import Tables from "../pages/tables";
import Reservations from "../pages/reservations";

const ProtectorEl = () => {
    const navigate = useNavigate(); useEffect(()=>{navigate('/login')},[]); return <></>;
}
export default function Router() {
    const privateRoutes = [
        {
            path: "*",
            element: <Page_404 />,
        },
        {
            path: "/home",
            element: <DashboardLayout />,
            children: [
                {
                    path: "/home",
                    element: <Title style={{color: "#383838"}}>Dashboard</Title>,
                },
                {
                    path: "/home/tables",
                    element: <Tables />,
                },
                {
                    path: "/home/reservations",
                    element: <Reservations />,
                }
            ],
        }
    ];
    
    const publicRoutes = [
        {
            path: "/",
            element: <ProtectorEl />,
        },
        {
            path: "/login",
            element: <Login />,
        },
    ];
    const routes = [...privateRoutes, ...publicRoutes]

    const router = createBrowserRouter(routes);
    return (
        <RouterProvider router={router} />
    )
}