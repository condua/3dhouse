import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    console.log(response);
    try {
      const credential = response.credential;
      // Gửi token tới server để xác thực
      //   const result = await axios.post("http://192.168.2.57:5000/verify-token", {
      //     idToken: credential,
      //   });
      const result = jwtDecode(credential);
      console.log(result);
      const user = result;
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("googleUser", JSON.stringify(user));
      navigate("/profile");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign in with Google
        </h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          buttonText="Sign in with Google"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Login;
