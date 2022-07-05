import React, {ReactNode} from 'react';
import './Modal.css';

interface IModalProps {
    isOpen: boolean;
    close: () => void;
    children: ReactNode;
}

export const Modal: React.FC<IModalProps> = ({isOpen, close, children}) => {
    return (
        <div className={isOpen ? "modal active" : "modal"} onMouseDown={close}>
            <div className={isOpen ? "modal_content active" : "modal_content"} onMouseDown={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};