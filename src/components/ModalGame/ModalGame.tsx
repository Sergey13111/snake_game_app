import styles from './ModalGame.module.css';

import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import ModalForm from '../ModalForm/ModalForm';
import GameStartContext from '../../context/GameStartContext/GameStartContext';

Modal.setAppElement('#root');

const ModalGame: React.FC = () => {
	const [isGameStart] = useContext(GameStartContext);
	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(() => {
		openModal();
	}, []);

	useEffect(() => {
		!isGameStart && setIsOpen(true);
	}, [isGameStart]);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				overlayClassName={styles.modalOverlay}
				className={styles.modalContent}>
				<ModalForm closeModal={closeModal} />
			</Modal>
		</>
	);
};

export default ModalGame;
