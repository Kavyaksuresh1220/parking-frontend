import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


function Header() {
  const about="The Parking Slot Booking System is a simple web application that helps users find and book parking spaces easily. It shows available slots in real time and lets users reserve them in advance to save time and avoid the stress of searching for parking. The system also helps reduce traffic and makes parking management easier for administrators. Using modern web technologies, it offers a smart and user-friendly way to manage parking, with future improvements like real-time sensors and mobile alerts to make it even more convenient"
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'#061e35ff'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src="https://cdn.vectorstock.com/i/500p/98/50/icon-car-park-related-to-city-symbol-blue-eyes-vector-51369850.jpg" width={'50px'} style={{borderRadius:'50%'}} alt="logo" />
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookMySlot
          </Typography>
          
            <Tooltip title={about} style={{fontSize:'10px',color:'white'}}>
      <IconButton>
        ABOUT
      </IconButton>
    </Tooltip>
            
        </Toolbar>
      </AppBar>
    </Box>
    <marquee behavior="" direction="">Welcome to BookMySlot — Your Smart Parking Solution! Book your parking slot easily and avoid last-minute hassle.</marquee>
      
    </div>
  )
}

export default Header
