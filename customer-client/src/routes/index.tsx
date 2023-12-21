import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardLayout from '../pages/dashboard';
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import Page_404 from "../components/404";

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
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                {
                    path: "/dashboard",
                    element: <Title style={{color: "#383838"}}>Dashboard</Title>,
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