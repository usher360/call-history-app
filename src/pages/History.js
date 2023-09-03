import {
    Accordion, AccordionDetails,
    AccordionSummary,
    AppBar,
    Avatar, Card, Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CallIcon from '@mui/icons-material/Call';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Loader from "../components/Loader/Loader";
import {useEffect, useState} from "react";
import {
    addContact,
    addHistoryCall,
    deleteContact,
    deleteHistoryCall,
    getContacts,
    getHistoryCalls
} from "../api/requests";
import Box from "@mui/material/Box";

function CallHistory() {
    const [historyCalls, setHistoryCalls] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumberInput, setPhoneNumberInput] = useState('');
    const [fullNameInput, setFullNameInput] = useState('');
    const [callInput, setCallInput] = useState('');


    useEffect(() => {
        initHistory();
    }, []);

    async function initHistory() {
        setIsLoading(true);
        try {
            const [history, contacts] = await Promise.all([getHistoryCalls(), getContacts()]);
            setHistoryCalls(history);
            setContacts(contacts);
        } finally {
            setIsLoading(false);
        }
    }

    function onClickAddCall() {
        let newHistoryCall = {
            phoneNumber: callInput,
            timestamp: new Date()
        }
        historyCalls.push(newHistoryCall);
        setHistoryCalls(historyCalls);
        setCallInput('');
        addHistoryCall(newHistoryCall);
    }

    function onClickAddContact() {
        let newContact = {
            phoneNumber: phoneNumberInput,
            fullName: fullNameInput
        }
        contacts.push(newContact);
        setContacts(contacts);
        setPhoneNumberInput('');
        setFullNameInput('');
        addContact(newContact);
    }

    function onClickDeleteHistoryCall(id) {
        let newHistoryCalls = historyCalls.filter(call => call._id !== id);
        setHistoryCalls(newHistoryCalls);
        deleteHistoryCall(id);
    }

    function onClickDeleteContact(id) {
        let newContacts = contacts.filter(contact => contact._id !== id);
        setContacts(newContacts);
        deleteContact(id);
    }

    function getFormattedDate(dateString) {
        const date = new Date(dateString);

        const datePart = date.toDateString();
        const timePart = date.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Set false - to use 24-hour format
        });

        return `${datePart} ${timePart}`;
    }

    function getContactDetailsByPhone(phoneNumber) {
        return contacts?.find(contact => contact.phoneNumber === phoneNumber);
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="center" alignItems="center" maxHeight="100vh">
                <Card sx={{width: '50%'}}>
                    <AppBar position="static">
                        <Toolbar>
                            <CallIcon/>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Call History</Typography>
                        </Toolbar>
                    </AppBar>

                    {isLoading ? <Loader active={isLoading}/> :
                        <>
                            <br/>
                            <TextField id="call"
                                       label="Add Call"
                                       variant="standard"
                                       value={callInput}
                                       onChange={(e) => setCallInput(e.target.value)}
                            />
                            <IconButton aria-label="delete" size="large" onClick={onClickAddCall}>
                                <AddIcCallIcon/>
                            </IconButton>

                            <br/><br/>

                            <List>
                                {historyCalls.map((call) => (
                                    <ListItem key={call._id}>
                                        <Accordion sx={{width: '100%'}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                id="history-header"
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <CallIcon/>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={call.phoneNumber}
                                                    secondary={getFormattedDate(call.timestamp)}
                                                />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    Full Name: {getContactDetailsByPhone(call.phoneNumber)?.fullName}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <IconButton aria-label="delete" size="large" onClick={() => onClickDeleteHistoryCall(call._id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>

                            <br/>
                            <Divider/>
                            <br/>

                            <div style={{display: "flex", justifyContent: 'center', gap: '16px', padding: '0 16px'}}>
                                <TextField id="full-name"
                                           label="Add Full Name"
                                           variant="standard"
                                           value={fullNameInput}
                                           onChange={(e) => setFullNameInput(e.target.value)}
                                />

                                <TextField id="phone-number"
                                           label="Add Phone Number"
                                           variant="standard"
                                           value={phoneNumberInput}
                                           onChange={(e) => setPhoneNumberInput(e.target.value)}
                                />

                                <IconButton aria-label="delete" size="large" onClick={onClickAddContact}>
                                    <PersonAddIcon/>
                                </IconButton>
                            </div>

                            <br/>

                            <List>
                                {contacts.map((contact) => (
                                    <ListItem key={contact._id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={contact.fullName}
                                            secondary={contact.phoneNumber}
                                        />
                                        <IconButton aria-label="delete" size="large" onClick={() => onClickDeleteContact(contact._id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>

                            <br/><br/>
                        </>
                    }
                </Card>
            </Box>
        </Container>
    );
}

CallHistory.propTypes = {
    list: PropTypes.string
};

export default CallHistory;
