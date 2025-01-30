/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalComponent, setModalComponent] = useState(null);
	const [modalHeader, setModalHeader] = useState(null);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const setModal = (header, component) => {
		setModalHeader(header);
		setModalComponent(component);
	};

	const value = {
		isOpen,
		openModal,
		closeModal,
		setModal,
		modalComponent,
		modalHeader,
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

export { ModalContext, ModalProvider };
