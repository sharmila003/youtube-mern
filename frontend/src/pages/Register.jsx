import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/googleicon.png'; 
import facebookIcon from '../assets/facebookicon.png'; 
import appleIcon from '../assets/appleicon.png'; 
import bg3 from '../assets/bg3.jpg';

function Register() {
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      phoneNumber,
      emailid,
      password,
      confirmpassword,
    };

    console.log('Submitting user data:', userData);

    try {
      const response = await axios.post('http://localhost:8800/api/auth/register', userData);

      console.log("User registered:", response.data);
      alert('Registration successful!');
      navigate("/"); // Redirect to homepage after successful registration
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      alert('Error registering: ' + (error.response ? error.response.data.message : error.message));
    }
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bg3})` }}></div>
      {/* Right Side Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-center mb-4">YouTube</h1>
          <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
          <p className="mb-4 text-center">Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailId">
                Email ID
              </label>
              <input
                type="email"
                id="emailid"
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Create Account
            </button>
          </form>
          <div className="my-4 text-center">
            <p>Already have an account? <Link to="/signin" className="text-blue-500 hover:text-blue-700">Signin</Link></p>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-around">
            <button className="flex items-center bg-white border border-gray-300 rounded p-2 hover:bg-gray-100 focus:outline-none">
              <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center bg-white border border-gray-300 rounded p-2 hover:bg-gray-100 focus:outline-none">
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6 mr-2" />
              <span className="text-sm">Facebook</span>
            </button>
            <button className="flex items-center bg-white border border-gray-300 rounded p-2 hover:bg-gray-100 focus:outline-none">
              <img src={appleIcon} alt="Apple" className="w-6 h-6 mr-2" />
              <span className="text-sm">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

