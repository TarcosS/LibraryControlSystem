import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";
import { CaretDownOutlined } from '@ant-design/icons';
import useBreakPoints from "../hooks/useBreakPoints";

function NavItemOpen({icon, text, childrens}: {icon: string, text: string, childrens: any[] | undefined}) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const subLinks = useRef<HTMLDivElement | null>(null);
    const subLink = useRef<any>(null);

    useEffect(() => {
        if(open) {
            subLinks.current?.style.setProperty('height', (childrens?.length || 0) * subLink.current?.offsetHeight + 'px');
        } else {
            subLinks.current?.style.setProperty('height', '0');
        }
    }, [open]);

    useEffect(() => {
        childrens?.some(children => location.pathname === children.path) ? setOpen(true) : setOpen(false);
    }, [location])

    return (
        <li>
            <div
                className="flex flex-row items-center gap-4 py-[10px] px-4 w-full bg-inherit hover:bg-[linear-gradient(90deg,rgba(53,213,199,0.10)0%,rgba(53,213,199,0.00)100%)] rounded-md transition-all select-none cursor-pointer"
                style={childrens?.some(children => location.pathname === children.path) ? {
                    borderLeft: '4px solid #35D5C7',
                    background: 'linear-gradient(90deg, rgba(53, 213, 199, 0.10) 0%, rgba(53, 213, 199, 0.00) 100%)'
                } : {}}
                onClick={handleOpen}
            >
                <img src={icon} alt="" />
                <span
                    className="text-white text-[14px] select-none"
                >
                    {text}
                </span>
                <CaretDownOutlined className="ms-auto transition-all" style={{rotate: open ? '180deg' : '0deg'}} />
            </div>
            <div ref={subLinks} className="ms-7 h-0 overflow-hidden transition-all">
                {
                    childrens?.map((children, index) => (
                        <Link
                            ref={subLink}
                            to={children.path}
                            key={'childrens_' + index}
                            className="flex flex-row items-center gap-4 py-[10px] px-4 w-full bg-inherit hover:bg-[linear-gradient(90deg,rgba(53,213,199,0.10)0%,rgba(53,213,199,0.00)100%)] transition-all"
                            style={location.pathname === children.path ? {
                                borderLeft: '4px solid #35D5C7',
                                background: 'linear-gradient(90deg, rgba(53, 213, 199, 0.10) 0%, rgba(53, 213, 199, 0.00) 100%)'
                            } : {borderLeft: '.8px solid #35D5C7',}}
                        >
                            <span
                                className="text-white text-[14px] select-none"
                            >
                                {children.text}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </li>
    )
}


function NavItem({icon, text, path}: {icon: string, text: string, path?: string}) {
    const location = useLocation();
    return (
        <li>
            <Link
                to={path || '/'}
                className="flex flex-row items-center gap-4 py-[10px] px-4 w-full bg-inherit hover:bg-[linear-gradient(90deg,rgba(53,213,199,0.10)0%,rgba(53,213,199,0.00)100%)] rounded-md transition-all"
                style={location.pathname === path ? {
                    borderLeft: '4px solid #35D5C7',
                    background: 'linear-gradient(90deg, rgba(53, 213, 199, 0.10) 0%, rgba(53, 213, 199, 0.00) 100%)'
                } : {}}
            >
                <img src={icon} alt="" />
                <span
                    className="text-white text-[14px] select-none"
                >
                    {text}
                </span>
            </Link>
        </li>
    )
}

export default function SideNav() {
    const breakpoints = useBreakPoints();
    
    const links = [
        {
            type: "link",
            icon: '/icons/dashboard.svg',
            text: 'Ana Sayfa',
            path: '/home'
        },
        {
            type: "link",
            icon: '/icons/dashboard.svg',
            text: 'Masalar',
            path: '/home/tables'
        },
        {
            type: "link",
            icon: '/icons/dashboard.svg',
            text: 'Reservasyonlarım',
            path: '/home/reservations'
        }
    ]
    return (
        <div 
            className="h-[100dvh] w-[223px] flex flex-col items-center gap-[31px] py-[15px] px-4 flex-none"
            style={['xs', 'sm'].includes(breakpoints) ? {
                backgroundImage: 'linear-gradient( 315deg, #52E5E7 10%, #130CB7 100%)',
                backgroundColor: '#8BC6EC',
                boxShadow: '4px 0px 6px 0px rgba(0, 0, 0, 0.12)',
                display: 'none'
            } : {
                backgroundImage: 'linear-gradient( 315deg, #52E5E7 10%, #130CB7 100%)',
                backgroundColor: '#8BC6EC',
                boxShadow: '4px 0px 6px 0px rgba(0, 0, 0, 0.12)'
            }}
        >
            <div className="mb-[20px]">
                <Logo size={32} hasText={true}/>
            </div>
            <ul className="w-full flex flex-col gap-2">
                {
                    links.map((link: any, index) => link.type === 'link' ? <NavItem key={'links_' + index} icon={link.icon} text={link.text} path={link.path} /> : <NavItemOpen key={'links_' + index} icon={link.icon} text={link.text} childrens={link.childrens} />)
                }
            </ul>
        </div>
    )
}