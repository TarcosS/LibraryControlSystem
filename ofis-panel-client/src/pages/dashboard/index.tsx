import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav";
import Header from "../../components/Header";
import { useEffect } from "react";
import useBreakPoints from "../../hooks/useBreakPoints";

export default function Layout() {
    const breakpoints = useBreakPoints();
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        return;
    }, [token, navigate]);

    return (
        <>
            {
                token ? (
                    <div 
                        className="h-[100dvh] w-[100dvw] flex flex-row"
                        style={{background: '#a5a5a5'}}
                    >
                        <SideNav />
                        <div 
                            className="flex text-black flex-col overflow-auto" 
                            style={['xs', 'sm'].includes(breakpoints) ? {
                                width: 'inherit'
                            }: {
                                width: 'calc(100vw - 223px)',
                            }}
                        >
                            <Header />
                            <div 
                                className="h-full p-4"
                            >
                                <Outlet />
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}