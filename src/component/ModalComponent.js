import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalComponent = ({ children, open, toggle, title, className, size }) => {
	return (
		<>
			<Modal isOpen={open} toggle={toggle} size={size || "md"} centered>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
				<ModalBody className={className}>{children}</ModalBody>
			</Modal>
		</>
	);
};

export default ModalComponent;
