// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const navigate = useNavigate();
  
//   const [userDetails, setUserDetails] = useState({
//     // fullName: '',
//     // email: '',
//     phoneNum: '',
//     state: ''
//   });
//   const [googleUser, setGoogleUser] = useState('');
//   const [phone_num, setPhoneNum] = useState('');
//   const [state, setState] = useState('');

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Retrieve Google user data from localStorage
//     const googleUserString = localStorage.getItem('googleUser');
//     const googleUser = googleUserString ? JSON.parse(googleUserString) : null;
//     setGoogleUser(googleUser);
//     if (googleUser) {
//       // Pre-fill Google-provided data
//       setUserDetails({
//         // fullName: googleUser.fullName,
//         // email: googleUser.email,
//         phoneNum: '',
//         state: ''
//       });
//     } else {
//       navigate('/login'); // Redirect to login if no Google info
//     }
//   }, [history]);

//   const handleInputChange = (e: any) => {
//     setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Send the complete registration data to the backend
//       const response = await axios.post('http://localhost:8000/api/user/auth/google', 
//         {
//             token: googleUser,
//             phoneNum: phone_num,
//             state: state
//         }
//       );
//       console.log(response);
//       alert('Registration successful!');
//       navigate('/dashboard'); // Redirect to the dashboard or another page
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Error during registration');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Complete Your Registration</h1>
//       <form onSubmit={handleSubmit}>
//         {/* <input
//           type="text"
//           name="fullName"
//           value={userDetails.fullName}
//           onChange={handleInputChange}
//           disabled
//           required
//         />
        
//         <input
//           type="email"
//           name="email"
//           value={userDetails.email}
//           onChange={handleInputChange}
//           disabled
//           required
//         /> */}

//         {/* Phone Number (Editable by the user) */}
//         <input
//           type="text"
//           name="phoneNum"
//           value={userDetails.phoneNum}
//         //   onChange={handleInputChange}
//           onChange={(e) => setPhoneNum(e.target.value)}
//           placeholder="Phone Number"
//           required
//         />

//         {/* State (Editable by the user) */}
//         <input
//           type="text"
//           name="state"
//           value={userDetails.state}
//         //   onChange={handleInputChange}
//           onChange={(e) => setState(e.target.value)}
//           placeholder="State"
//           required
//         />

//         {/* Submit Button */}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Submitting...' : 'Complete Registration'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;




// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../context/GoogleContext';

// const Register = () => {
//   const navigate = useNavigate();

//   const auth = useContext(UserContext);

//   const [googleUser, setGoogleUser] = useState('');
//   const [phoneNum, setPhoneNum] = useState('');
//   const [state, setState] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Retrieve Google user data from localStorage
//     const googleUserString = localStorage.getItem('googleUser');
//     const googleUser = googleUserString ? JSON.parse(googleUserString) : null;
//     setGoogleUser(googleUser);

//     if (!googleUser) {
//       navigate('/login'); // Redirect to login if no Google info
//     }
//   }, [navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     auth?.setUser((prevUser : any) => ({
//       ...prevUser, // Preserve existing properties
//       phoneNum: phoneNum,
//       state: state,
//   }));
//     try {
//       console.log(googleUser);
//       console.log(auth?.user);
//       const payload = {
//         full_name: auth?.user?.username,
//         email: auth?.user?.email,
//         // password: null,
//         phone_num: phoneNum,
//         state: state,
//       }
//       // Send the complete registration data to the backend
//       // const response = await axios.post('http://localhost:8000/api/user/signup/google', {
//       // const response = await axios.post('http://localhost:8000/api/user/signup/google', {
//       //   full_name: auth?.user?.username,
//       //   email: auth?.user?.email,
//       //   phoneNum,
//       //   state,
//       // });
//       console.log(payload);
      
//       const response = await axios.post('http://localhost:8000/api/user/google/signup', payload);
//       console.log(response);
//       alert('Registration successful!');
//       navigate('/dashboard'); // Redirect to the dashboard or another page
//     } catch (error) {
//       console.error('Error during registration:', error); 
//       alert('Error during registration');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Complete Your Registration</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Phone Number (Editable by the user) */}
//         <input
//           type="text"
//           name="phoneNum"
//           value={phoneNum}
//           onChange={(e) => setPhoneNum(e.target.value)}
//           placeholder="Phone Number"
//           required
//         />

//         {/* State (Editable by the user) */}
//         <input
//           type="text"
//           name="state"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           placeholder="State"
//           required
//         />

//         {/* Submit Button */}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Submitting...' : 'Complete Registration'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/GoogleContext';

const Register = () => {
  const navigate = useNavigate();
  const auth = useContext(UserContext);

  const [googleUser, setGoogleUser] = useState<any>(null);
  const [phoneNum, setPhoneNum] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve Google user data from localStorage
    const googleUserString = localStorage.getItem('googleUser');
    const user = googleUserString ? JSON.parse(googleUserString) : null;
    setGoogleUser(user);

    if (!user) {
      navigate('/login'); // Redirect to login if no Google info
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    auth?.setUser((prevUser: any) => ({
      ...prevUser,
      phoneNum: phoneNum,
      state: state,
    }));
    try {
      const payload = {
        full_name: auth?.user?.username,
        email: auth?.user?.email,
        phone_num: phoneNum,
        state: state,
      };

      const response = await axios.post('http://localhost:8000/api/user/google/signup', payload);
      console.log(response);
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Complete Your Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prefilled Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={googleUser?.decoded?.name || ''}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Prefilled Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={googleUser?.decoded?.email || ''}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Editable Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNum"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Editable State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter your state"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Submitting...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
