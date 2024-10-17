// src/components/TicketList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const TicketList = ({ onEdit }) => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]); // State for filtered tickets
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [filterTerm, setFilterTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchTickets(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchTickets = async (pageNumber = 1, pageSize = 10) => {
        try {
            const response = await axios.get(`http://localhost:5209/api/tickets`, {
                params: {
                    pageNumber,
                    pageSize
                }
            });
            setTickets(response.data);
            setTotalCount(response.headers["x-total-count"]); // Get the total count from headers
            setCurrentPage(pageNumber);
            setPageSize(pageSize);

        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    // Function to filter tickets based on search term and status
    useEffect(() => {
        const filterTickets = () => {
            const lowerCaseTerm = filterTerm.toLowerCase();
    
            const filtered = tickets.filter(ticket => {
                const matchesTerm = ticket.description.toLowerCase().includes(lowerCaseTerm);
                const matchesStatus = filterStatus === 'All' || getStatusText(ticket.status) === filterStatus;
    
                return matchesTerm && matchesStatus;
            });
    
            setFilteredTickets(filtered);
        };
    
        filterTickets(); // Filter tickets whenever tickets or filters change
    }, [tickets, filterTerm, filterStatus]);
    

    const getStatusText = (status) => {
        return status === 0 ? "Open" : "Closed";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long' }; // Long month name
        const month = date.toLocaleDateString('en-US', options).split(' ')[0]; // Get the month name
        const day = String(date.getDate()).padStart(2, '0'); // Get the day, padding with leading zero
        const year = date.getFullYear(); // Get the full year

        return `${month}-${day}-${year}`; // Return formatted date as "May-10-2024"
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5209/api/tickets/${id}`);
            // Fetch the updated tickets after deletion
            fetchTickets(currentPage, pageSize);
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    return (
        <div className="overflow-x-auto shadow-lg">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by description"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.target.value)}
                    className="border p-2"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border p-2"
                >
                    <option value="All">All</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <table className="min-w-full border border-gray-200 rounded-xl">
                <thead>
                    <tr className='bg-emerald-600 text-white font-light text-left'>
                        <th className="py-3 px-3">Ticket Id</th>
                        <th className="py-3 px-3">Description</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Date Created</th>
                        <th className="py-3 px-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(filteredTickets.length > 0 ? filteredTickets : tickets).map(ticket => (
                        <tr key={ticket.id} className="border text-sky-900 bg-gray-100">
                            <td className="py-2 px-3 border-t border-gray-200">{ticket.id}</td>
                            <td className="py-2 px-3 border-t border-gray-200">{ticket.description}</td>
                            <td className="py-2 px-3 border-t border-gray-200">{getStatusText(ticket.status)}</td>
                            <td className="py-2 px-3 border-t border-gray-200">{formatDate(ticket.dateCreated)}</td>
                            <td className="py-2 px-3 border-t border-gray-200">
                                <button
                                    onClick={() => onEdit(ticket)}
                                    className="bg-emerald-100 rounded-2xl text-emerald-900 px-2 py-1 shadow-sm mr-4"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(ticket.id)}
                                    className="bg-red-200 rounded-full text-red-800 px-2 py-1 shadow-sm pl-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination flex justify-center bg-gray-100 items-center ">
                <button className="text-gray-500 px-4 py-2 rounded flex items-center"
                    onClick={() => fetchTickets(currentPage - 1, pageSize)}
                    disabled={currentPage === 1}
                >
                    <SkipPreviousIcon />
                </button>
                <span className="text-center text-gray-600 mx-4 "> {currentPage}</span>
                <button
                    onClick={() => fetchTickets(currentPage + 1, pageSize)}
                    disabled={(currentPage * pageSize) >= totalCount}
                    className="text-gray-500 px-4 py-2 rounded flex items-center"
                >
                    <SkipNextIcon />
                </button>
            </div>
        </div>
    );
};

export default TicketList;
