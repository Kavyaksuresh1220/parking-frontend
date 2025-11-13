import React from "react";
import jsPDF from "jspdf";
import axios from "axios";
import { Button } from "@mui/material";

function Download() {
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/ticket");
      const data = response.data;
      if (data.length === 0) {
        alert("No ticket found to download.");
        return;
      }

      const ticket = data[data.length - 1]; // latest ticket

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(" Parking Slot Ticket", 20, 20);

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
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Try again.");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Download Ticket
    </Button>
  );
}

export default Download;
