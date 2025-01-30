/* eslint-disable react/prop-types */
import ReactModal from 'react-modal';
import useModal from '../../../hooks/useModal';
import style from './style';
import './style.css';

ReactModal.setAppElement('#root');

const Modal = ({ width = '612px' }) => {
	const { isOpen, closeModal, modalComponent, modalHeader } = useModal();

	style.content.width = width;
	style.content.backgroundColor =
		localStorage.getItem('theme') === 'dark' ? '#061b23' : '#e4e5f1';

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={style}
			closeTimeoutMS={250}>
			<div className="modal-body">
				<section className="modal-header border-bottom">
					<h2>{modalHeader}</h2>
					<p onClick={closeModal}>X</p>
				</section>

				<section className="modal-content">{modalComponent}</section>
			</div>
		</ReactModal>
	);
};

export default Modal;
