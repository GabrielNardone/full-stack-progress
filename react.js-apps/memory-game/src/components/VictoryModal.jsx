

import Modal from 'react-modal'


Modal.setAppElement('#root');


export const VictoryModal = ({ moves, victoryValue, setVictoryValue }) => {

    const onCloseModal = () => {
        setVictoryValue(false)
    } 

    return (

        <Modal
            isOpen={victoryValue}
            onRequestClose={onCloseModal}
            overlayClassName="modal-fondo"
            className="modal"
            closeTimeoutMS={200}
        >   

            <h4>
              {moves <= 70 ? 'Excelent!' : 'Can be better'}
            </h4>
            <h4>
                You did {moves} moves
            </h4>

        </Modal>
    )
}
