import React, { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { courseEndpoints } from "../../services/api";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { matchPath } from "react-router-dom";
import {ACCOUNT_TYPE} from "../../utils/constants"


const Navbar = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async() =>{
        try{
            const result = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API);
            setSubLinks(result.data.allTags);
        }
        catch(error){
            console.log("could not fetch the categories/catalog list");
        }
    }

    useEffect( ()=>{
        fetchSubLinks();
    },[])

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname);
    }
    

    return(
        <div className="h-14 border border-b-[1px] border-richblack-700 flex justify-center items-center">
            <div className="w-11/12 max-w-maxContent flex justify-between items-center">
                <Link to="">
                    <img src={logo} width={160} height={32} loading='lazy' alt=""/>
                </Link>

                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map( (link,index) =>{
                                return(
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (
                                                    <div className="flex items-center gap-1 group relative">
                                                        <p>{link.title}</p>
                                                        <IoIosArrowDropdownCircle/>

                                                        <div className="z-50 invisible absolute left-[50%] translate-x-[-50%] translate-y-[65%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 transition-all duration-200 group-hover:visible lg:w-[300px]">
                                                            <div className="absolute left-[50%] top-0 translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5">
                                                            </div>
                                                            {
                                                                subLinks.length ? (    
                                                                    subLinks.map( (subLink,index) =>{
                                                                        return(
                                                                            <Link to={`catalog/${subLink.name}`} key={index}>
                                                                                    <p className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                                                        {subLink.name}
                                                                                    </p>
                                                                                
                                                                            </Link>
                                                                        )
                                                                    })    
                                                                ):(
                                                                    <div></div>
                                                                )
                                                            }
                                                        </div>        

                                                    </div>
                                                ) : (
                                                <Link to={link.path}
                                                    className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                                                    <p>  
                                                        {link.title}
                                                    </p>
                                                </Link>)                  
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                <div className="hidden items-center gap-x-4 md:flex">
                    {
                        user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to="/dashboard/cart" className="relative" >
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                                {
                                    totalItems>0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>       
                        )
                    } 
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                                    Sign in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar