import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";


const Sidebar = () =>{

    const {user,loading: profileLoading} = useSelector( (state) => state.profile);
    const {loading: authLoading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){
        return (
            <div className="spinner"></div>
        )
    }

    return(
        <div className="w-[200px] flex flex-col border border-r-[1px] border-r-richblack-700 h-screen bg-richblack-800 py-10">   

            <div className="text-richblack-300 bg-transparent">
                
                    {
                        sidebarLinks.map( (link) => {
                            if(link.type && user.accountType !== link.type) return null;
                            return(
                                <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }
                
            </div>

            <div className="mx-auto h-[1px] w-10/12 bg-richblack-600 mt-6 mb-6"></div>

            <div className="text-richblack-300 bg-transparent flex flex-col gap-2"> 
                <SidebarLinks link={{name:"Settings", path:"dashboard/settings"}} iconName={"VscSettingsGear"} />
                
                <button onClick={() => setConfirmationModal({
                    text1: "Are you sure ?",
                    text2: "You will be logged out of your Account",
                    btnText1: "Logout",
                    btnText2: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })}
                className="px-4 text-richblack-300"
                >
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg"/>
                        <span>Log Out</span>
                    </div>
                </button>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar