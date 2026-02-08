import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdOutlineFeaturedPlayList } from "react-icons/md";
import { FiAlertTriangle, FiSettings, FiUsers } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import { BsBrowserChrome } from "react-icons/bs";

const NavLinks = ({ link, onOpen }) => {
	return (
		<>
			<li onClick={onOpen}>
				<NavLink to={link.href}>
					{link.name === "dashboard" ? (
						<MdDashboard />
					) : link.name === "users" || link.name === "requests" ? (
						<FiUsers />
					) : link.name === "features" ? (
						<MdOutlineFeaturedPlayList />
					) : link.name === "properties" ? (
						<FaRegBuilding />
					) : link.name === "roles" ? (
						<FiAlertTriangle />
					) : link.name === "website" ? (
						<BsBrowserChrome />
					) : (
						<FiSettings />
					)}
					<span>{link.name}</span>
				</NavLink>
			</li>
		</>
	);
};

export default NavLinks;
