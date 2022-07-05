import React, {useState} from 'react';
import './App.css';
import {BasicTable} from "./components/BasicTable/BasicTable";
import {Button} from "@mui/material";
import {Modal} from "./components/Modal/Modal";
import {Form} from "./components/Form/Form";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="container">
            <Button
                variant="outlined"
                sx={{
                    alignSelf: 'flex-start',
                    margin: '20px'
                }}
                onClick={handleOpen}
            >
                Добавить
            </Button>
            <BasicTable />
            <Modal isOpen={isOpen} close={handleClose}>
                <Form close={handleClose}/>
            </Modal>
        </div>
    );
}

export default App;
