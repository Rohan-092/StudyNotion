import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { endpoints } from "../api"

const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSWORDTOKEN_API, RESETPASSWORD_API} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    let response;
    try {
        response = await apiConnector("POST", SENDOTP_API, {email})
        console.log("SENDOTP API RESPONSE: ", response)
      
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verifyEmail")
    } 
    
    catch (error) {
      console.log("SENDOTP API ERROR: ", error);
      console.log(response);
      toast.error(error.response.data.message);
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp( accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      console.log(otp);
      const response = await apiConnector("POST", SIGNUP_API, { accountType, firstName, lastName, email, password, confirmPassword, otp})
      console.log("SIGNUP API RESPONSE: ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Signup Successful")
      navigate("/login")

    } 

    catch (error) {
      console.log("SIGNUP API ERROR: ", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...") yeh nhi aayega vrna loding likha aa rha h toast aane se pehle aisa lg rha h do toast aa rhe h
    dispatch(setLoading(true))
    
    try {
      const response = await apiConnector("POST", LOGIN_API, {email,password})
      console.log("LOGIN API RESPONSE: ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      dispatch(setToken(response.data.token))
      
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      
      dispatch(setUser({...response.data.user,image:userImage}));
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")

      toast.success("Login Successful")

    } 
    
    catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error.response.data.message)
    }

    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    
    dispatch(setLoading(true))

    try {
      
      try{
      const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {email})
      console.log("RESET PASSWORD TOKEN RESPONSE: ", response)
      }
      catch(error){
        console.log("yha gabbad h");
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)

    } 
    
    catch (error) {
      console.log("RESET PASSEORD TOKEN ERROR: ", error)
      toast.error("Failed To Send Reset Email")
    }

    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

   

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {password,confirmPassword,token})
      console.log("RESET PASSWORD RESPONSE: ", response)
      
      toast.success("Password Reset Successfully")
      navigate("/login")
    } 
    
    catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }

    // toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

// export function changePassword(newPassword,confirmNewPassword,navigate){
//   return async(dispatch) =>{
//     dispatch(setLoading(true));

//     try{
//       const response = await apiConnector("POST",CHANGEPASSWORD_API, {newPassword,confirmNewPassword})
//       console.log("Change Password API Response: " ,response);

//       toast.success("Password changed");
//     }
    
//     catch(error){
//       console.log("Change Password Error....")
//       toast.error("Failed To Change Password")
//     }

//     dispatch(setLoading(false));
//     navigate("/");
//   }
// }