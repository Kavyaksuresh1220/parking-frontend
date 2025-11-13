import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: 'auto',
};

function History({ open, handleClose }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ticket");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    if (open) fetchTickets();
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="history-modal-title">
      <Box sx={modalStyle}>
        <Typography id="history-modal-title" variant="h6" fontWeight="bold" color="primary" mb={2}>
          📝 Booking History
        </Typography>

        {tickets.length === 0 ? (
          <Typography>No bookings found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="booking history table">
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Number</TableCell>
                  <TableCell>Slot Number</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.vehicleName}</TableCell>
                    <TableCell>{ticket.boxNumber}</TableCell>
                    <TableCell>{ticket.date}</TableCell>
                    <TableCell>{ticket.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Modal>
  );
}

export default History;

