import { Breadcrumb, Button } from "antd";
import { useLocation, useNavigate, useNavigation, useRoutes } from "react-router-dom"
import { HomeOutlined, UserOutlined, PoweroffOutlined, BellOutlined } from '@ant-design/icons';
import useBreakPoints from "../hooks/useBreakPoints";

export default function Header() {
    const navigate = useNavigate();
    const breakpoints = useBreakPoints();
    const location = useLocation();
    const history = location.pathname.split('/').filter(item => item !== '')
    const items = history.map((path, index)=>{
        switch (index) {
            case 0:
                return {
                    href: '/home',
                    title: <HomeOutlined />,
                }
            case 1:
                return {
                    href: '',
                    title: (
                        <>
                            <span>{path.split('').map((i, index) => index === 0 ? i.toUpperCase() : i === '-' ? ' ' : i).join('')}</span>
                        </>
                    )
                }
            case 2:
                return {
                    href: '',
                    title: path.split('').map((i, index) => index === 0 ? i.toUpperCase() : i === '-' ? ' ' : i).join('')
                }
            default:
                return {}
        }
    })

    return (
        <>
            <header
                className="px-6 py-2 flex"
                style={{
                    backgroundImage: 'linear-gradient(99deg,  rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118% )',
                }}
            >
                <div className="flex gap-4 ms-auto">
                    <Button
                        type="default"
                        icon={<BellOutlined />}
                        size="large"
                        style={{
                            background: 'linear-gradient(45deg,  rgba(115,18,81,1) 10.6%, rgba(28,28,28,1) 118% )',
                            border: 'none'
                        }}
                    >
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        danger
                        size="large"
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            localStorage.removeItem('refresh_token');
                            navigate('/login');
                        }}
                    >
                        {['md','lg', 'xl', 'xxl'].includes(breakpoints) ? 'Exit' : null}
                    </Button>
                </div>
            </header>
            <Breadcrumb
                className="mt-3 ms-5"
                items={items}
            />
        </>
    )
}