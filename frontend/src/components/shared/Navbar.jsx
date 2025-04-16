import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2, ChevronDown, Home, Briefcase, Building2, BookOpenText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6A38C2] to-[#8a45e9] text-white flex items-center justify-center font-bold shadow-md">
                        I
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-[#6A38C2] to-[#8a45e9] bg-clip-text text-transparent">
                        InternPortal
                    </h1>
                </motion.div>

                {/* Right section with nav and auth */}
                <div className="flex items-center gap-6">
                    {/* Nav Links */}
                    <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/admin/companies" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <Building2 size={16} /> Companies
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/admin/jobs" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <Briefcase size={16} /> Jobs
                                        </Link>
                                    </motion.li>
                                </>
                            ) : (
                                <>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <Home size={16} /> Home
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/jobs" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <Briefcase size={16} /> Internships
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/browse" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <Building2 size={16} /> Companies
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/resources" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <BookOpenText size={16} /> Resources
                                        </Link>
                                    </motion.li>
                                    <motion.li whileHover={{ scale: 1.05 }}>
                                        <Link to="/profile" className="hover:text-[#6A38C2] flex items-center gap-1 transition-colors">
                                            <User2 size={16} /> Profile
                                        </Link>
                                    </motion.li>
                                </>
                            )
                        }
                    </ul>

                    {/* Auth section */}
                    {
                        !user ? (
                            <Link to="/login">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button className="bg-gradient-to-r from-[#6A38C2] to-[#8a45e9] hover:from-[#55309e] hover:to-[#6A38C2] text-white text-sm rounded-full px-5 py-2 shadow-md">
                                        Sign In
                                    </Button>
                                </motion.div>
                            </Link>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-pointer">
                                        <Avatar className="cursor-pointer w-9 h-9 border-2 border-[#6A38C2]/20 hover:border-[#6A38C2]/40 transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                                            <AvatarFallback className="bg-gradient-to-br from-[#6A38C2] to-[#8a45e9] text-white">
                                                {user?.fullname?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <ChevronDown size={16} className="text-gray-500" />
                                    </motion.div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4 rounded-xl shadow-lg border border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="w-12 h-12 border-2 border-[#6A38C2]/20">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                                            <AvatarFallback className="bg-gradient-to-br from-[#6A38C2] to-[#8a45e9] text-white">
                                                {user?.fullname?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio || "Welcome to InternPortal!"}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-gray-600 flex flex-col gap-3">
                                        {
                                            user?.role === 'student' && (
                                                <motion.div 
                                                    whileHover={{ scale: 1.02 }}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="p-2 bg-gray-100 rounded-full">
                                                        <User2 size={16} className="text-[#6A38C2]" />
                                                    </div>
                                                    <Button variant="link" className="p-0 text-sm font-medium text-gray-700">
                                                        <Link to="/profile">View Profile</Link>
                                                    </Button>
                                                </motion.div>
                                            )
                                        }
                                        <motion.div 
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="p-2 bg-gray-100 rounded-full">
                                                <LogOut size={16} className="text-[#6A38C2]" />
                                            </div>
                                            <Button 
                                                onClick={logoutHandler} 
                                                variant="link" 
                                                className="p-0 text-sm font-medium text-gray-700"
                                            >
                                                Logout
                                            </Button>
                                        </motion.div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar