import React, { useState } from "react";
import Profile from "../../../component/Settings/Profile";
import Security from "../../../component/Settings/Security";

const Settings = () => {
	const [activePage, setActivePage] = useState("profile");

	return (
		<div className="record-details">
			<div className="row">
				<div className="col-lg-4 mb-4">
					<div className="detail-card shadow-sm">
						<div className="ul d-lg-block d-none">
							<ul>
								<li
									className={
										activePage === "profile" ? "active" : ""
									}
								>
									<a
										href="/#"
										onClick={(e) => {
											e.preventDefault();
											setActivePage("profile");
										}}
									>
										Profile Info
									</a>
								</li>
								<li
									className={
										activePage === "security"
											? "active"
											: ""
									}
								>
									<a
										href="/#"
										onClick={(e) => {
											e.preventDefault();
											setActivePage("security");
										}}
									>
										Security
									</a>
								</li>
							</ul>
						</div>
						<div className="d-lg-none">
							<select
								value={activePage}
								onChange={(e) => setActivePage(e.target.value)}
							>
								<option value={"profile"}>
									Profile Information
								</option>
								<option value={"security"}>Security</option>
							</select>
						</div>
					</div>
				</div>
				<div className="col-lg-8">
					<div className="detail-card-2 shadow-sm">
						{activePage === "profile" ? (
							<Profile />
						) : activePage === "security" ? (
							<Security />
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
