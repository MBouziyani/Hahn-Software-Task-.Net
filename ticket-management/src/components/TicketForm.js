import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketForm = ({ ticket, onSubmit, onCancel }) => {
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Open');

    useEffect(() => {
        if (ticket) {
            setDescription(ticket.description);
            setStatus(ticket.status === 0 ? 'Open' : 'Closed'); 
        }
    }, [ticket]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formattedStatus = status === 'Open' ? 0 : 1;
    
        const updatedTicket = ticket
            ? {
                  id: ticket.id, 
                  description,
                  status: formattedStatus,
                  dateCreated: ticket.dateCreated 
              }
            : {
                  description,
                  status: formattedStatus,
                  dateCreated: new Date().toISOString() 
              };
    
        console.log('Updated Ticket:', updatedTicket); 
    
        try {
            if (ticket) {
                const response = await axios.put(`http://localhost:5209/api/tickets/${ticket.id}`, updatedTicket);
                console.log('Ticket updated successfully:', response.data);
            } else {
                const response = await axios.post('http://localhost:5209/api/tickets', updatedTicket);
                console.log('New ticket added:', response.data);
            }
    
            onSubmit();
        } catch (error) {
            console.error('Error submitting ticket:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.errors) {
                console.error('Validation errors:', error.response.data.errors);
            }
        }
    };
    


    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border px-2 py-1 mr-2"
                placeholder="Ticket Description"
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border px-2 py-1 mr-2"
            >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
            </select>
            <button type="submit" className="bg-emerald-600 text-white px-2 py-1 rounded mr-2">
                {ticket ? 'Update' : 'Add New'}
            </button>
            <button type="button" onClick={onCancel} className="bg-gray-300 text-black px-2 py-1 rounded">
                Cancel
            </button>
        </form>
    );
};

export default TicketForm;
