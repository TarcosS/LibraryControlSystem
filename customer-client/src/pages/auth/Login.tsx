import { toast } from "react-toastify";
import Service from "./service";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { AuthResponse, setUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPending, setPending] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setPending(true);
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const data = {
            email: target.email.value,
            password: target.pass.value,
        }
        const response = await Service.login(data);
        if (response?.data || response?.status === 201 || response?.status === 200) {
            const mainData: AuthResponse = response?.data;
            
            Service.setToken(mainData.token);
            Service.setAuthorizationToken(mainData.token);

            setPending(false);
            dispatch(setUser(response?.data));
            navigate('/home');
        } else {
            toast(response?.response?.data?.message);
            setPending(false);
        }
    }
    return (
        <div 
            className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center gap-[31px]"
            style={{
                backgroundImage: 'linear-gradient( 200deg, #52E5E7 0%, #130CB7 100%)',
            }}
        >
            <Logo size={80}/>
            <div
                className="w-[440px] bg-[rgba(245,245,245,0.32)] rounded-lg backdrop-blur-[30px] py-[16px] px-[20px]"
            >
                <form 
                    className="flex flex-col gap-3 text-[rgba(255,255,255,0.6)]"
                    onSubmit={handleSubmit}
                >
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label 
                            htmlFor="email"
                            className="text-[14px] select-none"
                        >E-Mail</label>
                        <input 
                            type="email" 
                            name="email"
                            id="email"
                            className="rounded-[4px] py-[10px] px-[14px] bg-transparent border-[1px] border-[rgba(255,255,255,0.60)]"
                        />
                    </div>
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label 
                            htmlFor="pass"
                            className="text-[14px] select-none"
                        >Password</label>
                        <input 
                            type="password" 
                            name="pass"
                            id="pass"
                            className="rounded-[4px] py-[10px] px-[14px] bg-transparent border-[1px] border-[rgba(255,255,255,0.60)]"    
                        />
                    </div>
                    <div
                        className="flex flex-row gap-2 mb-1"
                    >
                        <input 
                            type="checkbox" 
                            name="remember"
                            id="remember"
                            className="rounded-[4px] py-[10px] px-[14px] w-4 bg-transparent border-[1px] border-[rgba(255,255,255,0.60)]"    
                        />
                        <label 
                            htmlFor="remember"
                            className="text-[14px] select-none"
                        >Remember me</label>
                    </div>
                    <div
                        className="flex flex-row items-center justify-end gap-2"
                    >
                        <Link to={'/forgot-password'} className="text-[14px] select-none underline">
                            Forgot your password?
                        </Link>
                        <button 
                            type="submit" 
                            className="select-none uppercase bg-[#0B1720] py-2 px-4 rounded-[4px] flex gap-3"
                            disabled={isPending}
                        >
                            {
                                isPending ? 
                                (<>
                                    <Spinner size={20}/>
                                    <span
                                        className="text-[14px] select-none"
                                    >
                                        Processing...
                                    </span>
                                </>) : (
                                    <span
                                        className="text-[14px] select-none"
                                    >
                                        Login
                                    </span>
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}