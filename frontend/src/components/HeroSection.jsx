import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, ArrowRight, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="w-full bg-gradient-to-br from-[#9ca9fd] to-[#ddacff] py-16 px-4 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-300 blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-300 blur-xl"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-indigo-300 blur-xl"></div>
            </div>

            <motion.div 
                className="max-w-4xl mx-auto relative"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Animated gradient card */}
                <motion.div 
                    className="relative bg-gradient-to-r from-[#6A38C2] to-[#8e4fe0] text-white p-10 rounded-2xl shadow-2xl overflow-hidden"
                    variants={itemVariants}
                >
                    {/* Glitter effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full opacity-70"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.7, 0.9, 0.7],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>
                    
                    <div className="relative z-10">
                        <motion.h1 
                            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                            variants={itemVariants}
                        >
                            Find Your Dream <span className="text-yellow-200">Internship</span>
                        </motion.h1>
                        <motion.p 
                            className="text-lg md:text-xl font-light mb-2"
                            variants={itemVariants}
                        >
                            Connecting Talent with Industry-Driven Opportunities
                        </motion.p>
                        <motion.div 
                            className="flex flex-wrap justify-center gap-2 mt-6"
                            variants={itemVariants}
                        >
                            <p className="text-sm md:text-base font-semibold tracking-wide">
                    Experiential | Hands-on | Career-building | Industry-aligned
                </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Search section */}
                <motion.div 
                    className="mt-12 flex flex-col items-center gap-6 relative"
                    variants={containerVariants}
                >
                    <motion.div 
                        className="w-full md:w-1/2 flex items-center bg-white border border-gray-300 rounded-full px-5 py-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                    >
                        <input
                            type="text"
                            placeholder="Search internships by role, skill, or location..."
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow px-2 py-2 text-gray-700 text-sm md:text-base focus:outline-none bg-transparent placeholder-gray-400"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#8e4fe0] hover:from-[#5630a1] hover:to-[#6A38C2] text-white px-4 py-2 transition-all duration-300 flex items-center gap-1"
                        >
                            <Search className="h-5 w-5" />
                            <span className="hidden sm:inline">Search</span>
                        </Button>
                    </motion.div>

                    <motion.div 
                        className="flex items-center gap-2 text-gray-600 text-sm"
                        variants={itemVariants}
                    >
                        <Sparkles className="h-4 w-4 text-yellow-500" />
                        <span>1000+ internships available</span>
                    </motion.div>

                    <motion.h2 
                        className="text-2xl font-bold text-gray-800 mt-6 pb-2 relative inline-block"
                        variants={itemVariants}
                    >
                        Explore Available Internships
                        <motion.div 
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#6A38C2] to-[#8e4fe0] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </motion.h2>

                    <motion.div 
                        className="mt-4 flex items-center gap-1 text-sm text-[#6A38C2] font-medium cursor-pointer hover:underline"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                        onClick={() => navigate("/browse")}
                    >
                        Browse all opportunities <ArrowRight className="h-4 w-4" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroSection