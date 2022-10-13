import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardHeader, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import LightModeSharpIcon from '@mui/icons-material/LightModeSharp'; //all day
// import GroupsSharpIcon from '@mui/icons-material/GroupsSharp'; //capacity
// import TvSharpIcon from '@mui/icons-material/TvSharp'; //TV
// import ChairSharpIcon from '@mui/icons-material/ChairSharp'; //capacity
// import DoorSlidingSharpIcon from '@mui/icons-material/DoorSlidingSharp'; //room
// import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
// import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
const EventModal = ({ openModal, data, handleCloseModal }) => {
    const [open, setOpen] = React.useState(openModal);
    //const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        handleCloseModal()
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Card sx={style}>
                <CardHeader>
                    `Booking id ${data.id}`
                </CardHeader>
                <CardContent>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        aria-label="contacts"
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <EventAvailableSharpIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={`${data.title}`} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <LightModeSharpIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={`ALL DAY - ${data.allDay ? 'YES' : 'NO'} `} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <LightModeSharpIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={`ALL DAY ${data.allDay}`} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Button variant="contained" color="error">Cancel Booking</Button>
                </CardContent>
            </Card>





        </Modal>
    </>
    )
}

export default EventModal