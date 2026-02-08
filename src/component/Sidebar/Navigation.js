import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import menu from "./menu";
import NavLinks from "./NavLinks";
import { logout } from "../../redux/auth/authSlice";
import NavCollapse from "./NavCollapse";

const Navigation = ({ onOpen, permissions }) => {
	const dispatch = useDispatch();

	const logoutHandler = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<ul>
			{menu.map(
				(m) =>
					(!m.permission ||
						(permissions && permissions.includes(m.permission))) &&
					(m.children ? (
						<NavCollapse
							onOpen={onOpen}
							key={`${m.id}`}
							content={m}
							permissions={permissions}
						/>
					) : (
						<NavLinks onOpen={onOpen} key={`${m.id}`} link={m} />
					))
			)}
			<li>
				<a href="#" onClick={logoutHandler}>
					<FaSignOutAlt /> <span>Log Out</span>
				</a>
			</li>
		</ul>
	);
};

export default Navigation;
