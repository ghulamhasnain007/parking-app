// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import toast from 'react-hot-toast';
// import qs from 'qs';
// import ReCAPTCHA from 'react-google-recaptcha';

// interface FormData {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

// const Login: React.FC = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [serverError, setServerError] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
//   const [failedAttempts, setFailedAttempts] = useState<number>(0);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   useEffect(() => {
//     if (auth?.isAuthenticated) {
//       navigate(auth.isAdmin ? '/dashboard' : '/home', { replace: true });
//     }
//   }, [auth, navigate]);

//   const handleReCAPTCHAChange = (value: string | null) => {
//     setRecaptchaValue(value);
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     setLoading(true);
//     setServerError(null);

//     if (!recaptchaValue) {
//       toast.error('Please complete the reCAPTCHA.');
//       setLoading(false);
//       return;
//     }

//     if (failedAttempts >= 5) {
//       toast.error(
//         'Your account has been locked due to multiple unsuccessful sign-in attempts. Please reset your password.'
//       );
//       setLoading(false);
//       return;
//     }

//     try {
//       const requestData = qs.stringify({
//         username: data.email,
//         password: data.password,
//       });

//       const response = await axios.post(
//         'http://localhost:8000/api/user/login',
//         requestData,
//         {
//           headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//           withCredentials: true,
//         }
//       );

//       const user = response.data.user;

//       // Update localStorage
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', JSON.stringify(response.data.token));

//       // Update AuthContext
//       auth?.setUser(user);
//       auth?.setIsAuthenticated(true);
//       auth?.setIsAdmin(user.isAdmin);

//       // Redirect based on role
//       toast.success('Welcome! Redirecting...');
//       navigate(user.isAdmin ? '/dashboard' : '/home', { replace: true });
//     } catch (error: any) {
//       setServerError(error.response?.data?.message || 'An error occurred during login.');
//       setFailedAttempts((prev) => prev + 1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...register('email', {
//                 required: 'Email is required.',
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: 'Invalid email format.',
//                 },
//               })}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                   errors.password ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 {...register('password', {
//                   required: 'Password is required.',
//                   minLength: { value: 6, message: 'Password must be at least 6 characters.' },
//                 })}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-3 flex items-center text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               className="mr-2"
//               {...register('rememberMe')}
//             />
//             <label htmlFor="rememberMe" className="text-gray-600">
//               Remember Me
//             </label>
//           </div>
//           <div className="mb-4">
//             <ReCAPTCHA
//               sitekey="6LdM8a0qAAAAAMXAz_OW7201bmRpTagunNowG_AM"
//               onChange={handleReCAPTCHAChange}
//             />
//           </div>
//           {serverError && (
//             <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? 'Logging in...' : 'Sign In'}
//           </button>
//         </form>
//         <div className="mt-4">
//           <button
//             className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
//             onClick={() => toast.error('Google Sign-In not implemented yet!')}
//           >
//             Sign in with Google
//           </button>
//         </div>
//         <p className="text-center text-gray-600 mt-4">
//           <Link to="/forgot-password" className="text-blue-500 hover:underline">
//             Forgot Password?
//           </Link>
//         </p>
//         <p className="text-center text-gray-600 mt-2">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-500 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState, useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TextField, Checkbox, FormControlLabel, Button, IconButton, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import qs from 'qs';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate(auth.isAdmin ? '/dashboard' : '/home', { replace: true });
    }
  }, [auth, navigate]);

  const handleReCAPTCHAChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setServerError(null);

    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA.');
      setLoading(false);
      return;
    }

    if (failedAttempts >= 5) {
      toast.error(
        'Your account has been locked due to multiple unsuccessful sign-in attempts. Please reset your password.'
      );
      setLoading(false);
      return;
    }

    try {
      const requestData = qs.stringify({
        username: data.email,
        password: data.password,
      });

      const response = await axios.post(
        'http://localhost:8000/api/user/login',
        requestData,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );

      const user = response.data.user;

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(response.data.token));

      // Update AuthContext
      auth?.setUser(user);
      auth?.setIsAuthenticated(true);
      auth?.setIsAdmin(user.isAdmin);

      // Redirect based on role
      toast.success('Welcome! Redirecting...');
      navigate(user.isAdmin ? '/dashboard' : '/home', { replace: true });
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'An error occurred during login.');
      setFailedAttempts((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Box
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format.',
            },
          })}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Password is required.',
            minLength: { value: 6, message: 'Password must be at least 6 characters.' },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={<Checkbox {...register('rememberMe')} />}
          label="Remember Me"
        />
        <Box className="mb-4">
          <ReCAPTCHA
            sitekey="6LdM8a0qAAAAAMXAz_OW7201bmRpTagunNowG_AM"
            onChange={handleReCAPTCHAChange}
          />
        </Box>
        {serverError && (
          <Box className="text-red-500 text-sm text-center mb-4">{serverError}</Box>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          className="mt-4"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </Button>
        <Box className="mt-4">
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => toast.error('Google Sign-In not implemented yet!')}
          >
            Sign in with Google
          </Button>
        </Box>
        <Box className="text-center text-gray-600 mt-4">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </Box>
        <Box className="text-center text-gray-600 mt-2">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;











// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import toast from 'react-hot-toast';
// import qs from 'qs';  // You can install this package: npm install qs

// interface FormData {
//   email: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth?.isAuthenticated) {
//       if (auth.isAdmin) {
//         navigate('/dashboard', { replace: true });
//       } else {
//         navigate('/home', { replace: true });
//       }
//     }
//   }, [auth, navigate]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [serverError, setServerError] = useState<string | null>(null);

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     setLoading(true);
//     setServerError(null);

//     try {
//       // URLSearchParams or qs.stringify() to encode form data
//       const requestData = qs.stringify({
//         username: data.email,
//         password: data.password,
//       });

//       const response = await axios.post(
//         'http://localhost:8000/api/user/login',
//         requestData, // Send the correctly formatted data
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           withCredentials: true,
//         }
//       );

//       const user = response.data.user;

//       // Update localStorage
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', JSON.stringify(response.data.token));

//       // Update AuthContext
//       auth?.setUser(user);
//       auth?.setIsAuthenticated(true);
//       auth?.setIsAdmin(user.isAdmin);

//       // Redirect based on role
//       if (user.isAdmin) {
//         toast.success('Welcome Admin! Redirecting to the dashboard...');
//         navigate('/dashboard', { replace: true });
//       } else {
//         toast.success('Welcome User! Redirecting to the app...');
//         navigate('/home', { replace: true });
//       }
//     } catch (error: any) {
//       setServerError(error.response?.data?.message || 'An error occurred during login.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: 'Invalid email address',
//                 },
//               })}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               }`}
//               {...register('password', {
//                 required: 'Password is required',
//                 minLength: {
//                   value: 6,
//                   message: 'Password must be at least 6 characters long',
//                 },
//               })}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>
//           {serverError && (
//             <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-4">
//           Don’t have an account?{' '}
//           <Link to="/signup" className="text-blue-500 hover:underline focus:outline-none">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
