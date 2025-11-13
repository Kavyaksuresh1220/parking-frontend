import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Showticket({ open, handleClose }) {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ticket");
        const data = response.data;
        if (data.length > 0) {
          setTicket(data[data.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };
    if (open) fetchTicket();
  }, [open]);

  const handleDownload = () => {
    if (!ticket) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🚗 Parking Slot Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Vehicle Number: ${ticket.vehicleName}`, 20, 40);
    doc.text(`Slot Number: ${ticket.boxNumber}`, 20, 50);
    doc.text(`Date: ${ticket.date}`, 20, 60);
    doc.text(`Phone: ${ticket.phone}`, 20, 70);

    doc.text("Instructions:", 20, 90);
    const instructions = [
      "Please park within the marked boundaries.",
      "Do not leave valuables inside the vehicle.",
      "Keep your ticket for verification during exit.",
      "Contact the help desk for assistance.",
    ];
    instructions.forEach((instr, index) => {
      doc.text(`- ${instr}`, 25, 100 + index * 10);
    });

    doc.save(`Ticket_${ticket.boxNumber}.pdf`);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="ticket-modal-title">
      <Box sx={modalStyle}>
        {!ticket ? (
          <Typography>No ticket found. Please book first.</Typography>
        ) : (
          <>
            <Typography id="ticket-modal-title" variant="h6" fontWeight="bold" color="primary" mb={2}>
               Parking Slot Ticket
            </Typography>

            <Typography><strong>Vehicle Number:</strong> {ticket.vehicleName}</Typography>
            <Typography><strong>Slot Number:</strong> {ticket.boxNumber}</Typography>
            <Typography><strong>Date:</strong> {ticket.date}</Typography>
            <Typography><strong>Phone:</strong> {ticket.phone}</Typography>

            <Box mt={2} p={2} bgcolor="#e3f2fd" borderRadius={2}>
              <Typography fontWeight="bold" mb={1}>Instructions:</Typography>
              <ul style={{ marginLeft: '20px' }}>
                <li>Please park within the marked boundaries.</li>
                <li>Do not leave valuables inside the vehicle.</li>
                <li>Keep your ticket for verification during exit.</li>
                <li>Contact the help desk for assistance.</li>
              </ul>
            </Box>

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleDownload}>
              Download Ticket
            </Button>

            <Typography mt={2} fontSize="0.8rem" color="gray">
              Thank you for choosing BookMySlot 
            </Typography>
          </>
        )}
      </Box>
    </Modal>
    

  );
}

export default Showticket;
