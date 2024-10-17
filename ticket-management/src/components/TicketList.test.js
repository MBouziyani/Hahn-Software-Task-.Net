// src/components/TicketList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import TicketList from './TicketList';

// Mock axios
jest.mock('axios');

describe('TicketList Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, description: 'Ticket 1', status: 0, dateCreated: '2024-05-10' },
        { id: 2, description: 'Ticket 2', status: 1, dateCreated: '2024-05-11' },
      ],
      headers: { 'x-total-count': '2' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders tickets correctly', async () => {
    render(<TicketList onEdit={jest.fn()} />);

    expect(await screen.findByText('Ticket 1')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('May-10-2024')).toBeInTheDocument();
  });

  test('handles filtering', async () => {
    render(<TicketList onEdit={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Search by description'), {
      target: { value: 'Ticket 2' },
    });

    expect(await screen.findByText('Ticket 2')).toBeInTheDocument();
    expect(screen.queryByText('Ticket 1')).not.toBeInTheDocument();
  });
});
