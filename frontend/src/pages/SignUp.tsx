// // SignUp.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import { useForm, SubmitHandler } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { FcGoogle } from 'react-icons/fc';

// type FormData = {
//     fullName: string;
//     email: string;
//     password: string;
//     phoneNumber?: string;
//     state: string;
//     termsAccepted: boolean;
// };

// const SignUp = () => {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm<FormData>();

//     const [googleAuthData, setGoogleAuthData] = useState({
//         fullName: '',
//         email: '',
//     });

//     const navigate = useNavigate();

//     const onSubmit: SubmitHandler<FormData> = (data) => {
//         if (!data.termsAccepted) {
//             toast.error('You must accept the terms and conditions to register.');
//             return;
//         }
//         toast.success('Welcome! Redirecting to the app...');
//         // Simulating successful registration
//         navigate('/');
//     };

//     const handleGoogleSignUp = () => {
//         // Simulate Google Sign-In and populate fields
//         const simulatedGoogleData = {
//             fullName: 'John Doe',
//             email: 'johndoe@gmail.com',
//         };
//         setGoogleAuthData(simulatedGoogleData);
//         setValue('fullName', simulatedGoogleData.fullName);
//         setValue('email', simulatedGoogleData.email);
//         toast.success('Google Sign-In successful! Please complete the rest of the form.');
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

//                 <button
//                     onClick={handleGoogleSignUp}
//                     className="w-full flex items-center justify-center bg-blue-100 text-blue-700 py-2 px-4 rounded-lg mb-4 hover:bg-blue-200">
//                     <FcGoogle className="mr-2 text-2xl" /> Sign Up with Google
//                 </button>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             {...register('fullName', { required: 'Field is required' })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.fullName ? 'border-red-500' : ''}`}
//                         />
//                         {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
//                     </div>

//                     <div>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             {...register('email', { required: 'Field is required' })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.email ? 'border-red-500' : ''}`}
//                         />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                     </div>

//                     <div>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             {...register('password', {
//                                 required: 'Field is required',
//                                 minLength: { value: 6, message: 'Password must be at least 6 characters.' },
//                             })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.password ? 'border-red-500' : ''}`}
//                         />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                     </div>

//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Phone Number (Optional)"
//                             {...register('phoneNumber')}
//                             className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//                         />
//                     </div>

//                     <div>
//                         <select
//                             {...register('state', { required: 'Field is required' })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.state ? 'border-red-500' : ''}`}
//                         >
//                             <option value="">Select State</option>
//                             <option value="California">California</option>
//                             <option value="New York">New York</option>
//                             <option value="Texas">Texas</option>
//                             <option value="Florida">Florida</option>
//                         </select>
//                         {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
//                     </div>

//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             {...register('termsAccepted', { required: 'You must accept the terms and conditions to register.' })}
//                             className="mr-2"
//                         />
//                         <label className="text-sm">
//                             I accept the <a href="#" className="text-blue-500">Terms and Conditions</a>
//                         </label>
//                     </div>
//                     {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
//                         Register
//                     </button>

//                     <p className="text-sm text-center mt-4">
//                         Already have an account?{' '}
//                         <a href="/login" className="text-blue-500">Sign In</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;




// import React, { useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';
// import { useContext } from 'react';
// import { UserContext } from '../context/GoogleContext';


// type FormData = {
//     fullName: string;
//     email: string;
//     password: string;
//     phone_num?: string;
//     state: string;
//     termsAccepted: boolean;
// };

// interface DecodedToken {
//     name: string;
//     email: string;
//     password: string | null;
// }

// // const CLIENT_ID = "849023247890-44208cg5v33ljak14ajdh1t5rr1u0qv7.apps.googleusercontent.com"; // Replace with your Google Client ID

// const SignUp = () => {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm<FormData>();
//     const auth = useContext(UserContext);
//     const navigate = useNavigate();

//     const onSubmit: SubmitHandler<FormData> = async(data) => {
//         if (!data.termsAccepted) {
//             toast.error('You must accept the terms and conditions to register.');
//             return;
//         }
//         try {
//             console.log(data);
            
//             const response = await axios.post('http://localhost:8000/api/user/register',{
//                 full_name: data.fullName,
//                 email: data.email,
//                 password: data.password,
//                 phone_num: data?.phone_num,
//                 state: data.state
//             })
//             console.log(response);
//             // navigate('/')
            
//             if(!response){
//                 console.log("Something went wrong")
//             }

//             // toast.success('Welcome! Redirecting to the app...');
//             // Simulating successful registration
//             navigate('/');
//         } catch (error: any) {
//             console.log(error.message);
//         }
        
//     };

//     const handleGoogleLogin = async (response: any) => {
//         console.log(response);
//         // const { profileObj } = response; // Extract Google user info
//         const decoded:DecodedToken = jwtDecode(response.credential);
//         // Store Google-provided details temporarily (e.g., in localStorage)
//         localStorage.setItem('googleUser', JSON.stringify({
//             decoded
//         }));
//         auth?.setUser({username: decoded.name, email: decoded.email, password: null} as any);
//         // Navigate to the complete registration page
//         navigate('/register');
//       };

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

//                 <GoogleLogin
//                 // clientId="YOUR_GOOGLE_CLIENT_ID"
//                 text="signup_with"
//                 onSuccess={handleGoogleLogin}
//                 onError={() => console.error('Google Sign-in Error')}
//                 />
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             {...register('fullName', { required: 'Field is required' })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.fullName ? 'border-red-500' : ''}`}
//                         />
//                         {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
//                     </div>

//                     <div>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             {...register('email', { required: 'Field is required' })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.email ? 'border-red-500' : ''}`}
//                         />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                     </div>

//                     <div>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             {...register('password', {
//                                 required: 'Field is required',
//                                 minLength: { value: 6, message: 'Password must be at least 6 characters.' },
//                             })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.password ? 'border-red-500' : ''}`}
//                         />
//                         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//                     </div>

//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Phone Number (Optional)"
//                             {...register('phone_num')}
//                             className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//                         />
//                     </div>

//                     <div>
//                         <select
//                             {...register('state', { required: 'Field is required' })}
//                             className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${errors.state ? 'border-red-500' : ''}`}
//                         >
//                             <option value="">Select State</option>
//                             <option value="California">California</option>
//                             <option value="New York">New York</option>
//                             <option value="Texas">Texas</option>
//                             <option value="Florida">Florida</option>
//                         </select>
//                         {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
//                     </div>

//                     <div className="flex items-center">
//                         <input
//                             type="checkbox"
//                             {...register('termsAccepted', { required: 'You must accept the terms and conditions to register.' })}
//                             className="mr-2"
//                         />
//                         <label className="text-sm">
//                             I accept the <a href="#" className="text-blue-500">Terms and Conditions</a>
//                         </label>
//                     </div>
//                     {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
//                         Register
//                     </button>

//                     <p className="text-sm text-center mt-4">
//                         Already have an account?{' '}
//                         <a href="/login" className="text-blue-500">Sign In</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;




import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { UserContext } from '../context/GoogleContext';
import { FaGoogle } from 'react-icons/fa';

type FormData = {
    fullName: string;
    email: string;
    password: string;
    phone_num?: string;
    state: string;
    termsAccepted: boolean;
};

interface DecodedToken {
    name: string;
    email: string;
    password: string | null;
}

const SignUp = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>();
    const auth = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!data.termsAccepted) {
            toast.error('You must accept the terms and conditions to register.');
            return;
        }
        try {
            console.log(data);

            const response = await axios.post('http://localhost:8000/api/user/register', {
                full_name: data.fullName,
                email: data.email,
                password: data.password,
                phone_num: data?.phone_num,
                state: data.state,
            });
            console.log(response);

            if (!response) {
                console.log('Something went wrong');
            }

            toast.success('Welcome! Redirecting to the app...');
            navigate('/');
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const handleGoogleLogin = async (response: any) => {
        console.log(response);
        const decoded: DecodedToken = jwtDecode(response.credential);
        localStorage.setItem(
            'googleUser',
            JSON.stringify({
                decoded,
            })
        );
        auth?.setUser({ username: decoded.name, email: decoded.email, password: null } as any);
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Sign Up</h2>
                {/* <h3 className="text-xl font-semibold text-center mb-4 text-blue-500">Sign Up</h3> */}
                <div className='mb-4 text-center text-gray-700'>
                    <GoogleLogin
                        text="signup_with"
                        onSuccess={handleGoogleLogin}
                        onError={() => console.error('Google Sign-in Error')}
                    />
                </div>
                {/* <GoogleLogin
                    text="signup_with"
                    onSuccess={handleGoogleLogin}
                    onError={() => console.error('Google Sign-in Error')}
                    render={(renderProps: any) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="flex items-center justify-center w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition shadow-lg"
                        >
                            <FaGoogle className="mr-2 text-lg" />
                            Sign up with Google
                        </button>
                    )}
                /> */}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register('fullName', { required: 'Field is required' })}
                            className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                                errors.fullName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: 'Field is required' })}
                            className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Field is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters.' },
                            })}
                            className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Phone Number (Optional)"
                            {...register('phone_num')}
                            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 border-gray-300"
                        />
                    </div>

                    <div>
                        <select
                            {...register('state', { required: 'Field is required' })}
                            className={`w-full p-3 border rounded-md focus:ring focus:ring-blue-300 ${
                                errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Select State</option>
                            <option value="California">California</option>
                            <option value="New York">New York</option>
                            <option value="Texas">Texas</option>
                            <option value="Florida">Florida</option>
                        </select>
                        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...register('termsAccepted', { required: 'You must accept the terms and conditions to register.' })}
                            className="mr-2"
                        />
                        <label className="text-sm">
                            I accept the <a href="#" className="text-blue-500">Terms and Conditions</a>
                        </label>
                    </div>
                    {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Register
                    </button>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500">Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;

