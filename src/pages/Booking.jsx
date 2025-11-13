import React, { useState } from 'react';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FaFileAlt, FaHistory } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import Tooltip from '@mui/material/Tooltip';
import History from '../components/History';

import Showticket from '../components/Showticket';
import { addTicketAPI } from '../service/allAPI';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#45a361ff',
      dark: '#0066CC',
    },
    booked: {
      main: '#ff0000', // red for booked boxes
      dark: '#ca0f0fff',
    },
  },
});

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

function Booking() {
  const [vehicleName, setVehicleName] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  const [bookedBoxes, setBookedBoxes] = useState([3, 7, 15]);
  const [open, setOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);

  // Open booking modal
  const handleOpen = (boxNumber) => {
    setSelectedBox(boxNumber);
    setOpen(true);
  };

  // Close booking modal
  const handleClose = () => {
    setOpen(false);
    setSelectedBox(null);
  };

  // Confirm booking
  const handleConfirmBooking = async () => {
    if (selectedBox && !bookedBoxes.includes(selectedBox)) {
      const newTicket = {
        vehicleName,
        date,
        phone,
        boxNumber: selectedBox,
      };

      try {
        await addTicketAPI(newTicket);
        setBookedBoxes([...bookedBoxes, selectedBox]);
        handleClose();
      } catch (error) {
        console.error('Error adding ticket:', error);
        alert('Failed to save ticket. Please try again.');
      }
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Header />

      {/* Icons after booking */}
      {bookedBoxes.length > 3 && (
        <div style={{
          marginLeft: "1200px",
          display: "flex",
          gap: "40px",
          fontSize: "30px",
          marginTop: "20px",
        }}>
          <Tooltip title="Show Ticket">
            <FaFileAlt
              style={{ cursor: "pointer" }}
              onClick={() => setShowTicketModal(true)}
            />
          </Tooltip>

          <Tooltip title="Booking History">
            <FaHistory style={{ cursor: "pointer" }} onClick={() => setHistoryModal(true)} />
          </Tooltip>

        </div>
      )}

      <ThemeProvider theme={theme}>
        {/* Parking slots grid */}
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{
          minHeight: '100vh',
          bgcolor: '#061728',
          p: 4,
        }}>
          {Array.from({ length: 20 }).map((_, index) => {
            const boxNumber = index + 1;
            const isBooked = bookedBoxes.includes(boxNumber);

            return (
              <Grid key={boxNumber} item xs={1.2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  bgcolor: isBooked ? 'booked.main' : 'primary.main',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: '0.3s',
                  '&:hover': {
                    bgcolor: isBooked ? 'booked.dark' : 'primary.dark',
                    transform: 'scale(1.05)',
                  },
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {boxNumber}
                  </Typography>

                  {!isBooked && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpen(boxNumber)}
                      sx={{
                        mt: 1,
                        bgcolor: '#061728',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#e3f2fd' },
                      }}
                    >
                      Book Now
                    </Button>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Booking modal */}
        <Modal open={open} onClose={handleClose} aria-labelledby="booking-modal-title">
          <Box sx={modalStyle}>
            <TextField label="Vehicle Number" variant="filled" fullWidth onChange={(e) => setVehicleName(e.target.value)} />
            <br /><br />
            <TextField
              id="date"
              label="Select Date"
              type="date"
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDate(e.target.value)}
            />
            <br /><br />
            <TextField label="Phone Number" variant="filled" fullWidth onChange={(e) => setPhone(e.target.value)} />

            <Typography sx={{ mb: 3, mt: 2 }}>
              Are you sure you want to book <strong>Box {selectedBox}</strong>?
            </Typography>

            <Button variant="contained" color="primary" onClick={handleConfirmBooking} sx={{ mr: 2 }}>
              Book Now
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </Modal>
      </ThemeProvider>

      {/* Show Ticket Modal */}
      <Showticket
        open={showTicketModal}
        handleClose={() => setShowTicketModal(false)}
      />

      <History open={historyModal} handleClose={() => setHistoryModal(false)} />
        <Footer/>

    </>
  );
}

export default Booking;
