import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  }),
};

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left side - Hero content */}
        <motion.div
          className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 className="text-5xl font-bold mb-4" variants={fadeUp} initial="hidden" animate="visible">
            Internship. Impact. Inspire.
          </motion.h1>
          <motion.p className="text-xl mb-8" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Turn knowledge into action through hands-on experience.
          </motion.p>
          <motion.p className="text-2xl font-semibold" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            Learn Today, Lead Tomorrow.
          </motion.p>
        </motion.div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 className="text-3xl font-bold text-gray-800 mb-2" variants={fadeUp} initial="hidden" animate="visible">
              Welcome Back!
            </motion.h2>
            <motion.p className="text-gray-600 mb-8" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
              Login to continue your journey
            </motion.p>

            <form onSubmit={submitHandler}>
              <motion.div className="space-y-6" initial="hidden" animate="visible">
                <motion.div variants={fadeUp} custom={2}>
                  <Label className="text-gray-700">Email</Label>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </motion.div>

                <motion.div variants={fadeUp} custom={3}>
                  <Label className="text-gray-700">Password</Label>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Enter your password"
                    className="mt-1"
                  />
                </motion.div>

                <motion.div variants={fadeUp} custom={4}>
                  <RadioGroup className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === 'student'}
                        onChange={changeEventHandler}
                        className="cursor-pointer"
                      />
                      <Label className="cursor-pointer">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === 'recruiter'}
                        onChange={changeEventHandler}
                        className="cursor-pointer"
                      />
                      <Label className="cursor-pointer">Recruiter</Label>
                    </div>
                  </RadioGroup>
                </motion.div>

                <motion.div variants={fadeUp} custom={5}>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </motion.div>

                <motion.div className="text-center space-y-2" variants={fadeUp} custom={6}>
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                  <Link
                    to="/forgot-password"
                    className="text-indigo-600 hover:underline block"
                  >
                    Forgot password?
                  </Link>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
