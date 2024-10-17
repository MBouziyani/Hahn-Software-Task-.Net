import React, { useState } from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';


const App = () => {
    const [editingTicket, setEditingTicket] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (ticket) => {
        setEditingTicket(ticket);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setEditingTicket(null);
        setShowForm(true);
    };

    const handleSubmit = () => {
        setShowForm(false);
        setEditingTicket(null);
    };

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl mb-4">Ticket Management</h1>

            
           

            {showForm ? (
                <TicketForm ticket={editingTicket} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
            ) : (
                <TicketList onEdit={handleEdit} />
            )}
             <button
                onClick={handleAddNew}
                className="bg-emerald-600 text-white px-4 py-2 rounded mt-8"
            >
                Add New
            </button>
        </div>
    );
};

export default App;
