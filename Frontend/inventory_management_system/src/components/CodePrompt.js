import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CodePrompt({ onSubmit, onClose }) {
    const [code, setCode] = useState("");

    const handleSubmit = () => {
        onSubmit(code); // Submit the code entered by the user
        setCode(""); // Reset code field for reuse
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Verification Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}
