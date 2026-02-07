import React from "react";
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

const SidebarLinks = ({link,iconName}) =>{

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    return(
        <div className={`h-[32px] flex items-center relative ${matchRoute(link.path) ? " text-yellow-200 bg-yellow-800" : ""}`}>   
            <NavLink to={link.path}
            // onClick={}
            >
                <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-200
                                ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
                `}>
                </span>

                <div className="flex gap-x-2 items-center px-4">
                    <Icon className="text-lg" />
                    <span>{link.name}</span>
                </div>
            </NavLink>
        </div>
    )
}

export default SidebarLinks