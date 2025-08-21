import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Skeleton from '@mui/material/Skeleton';
import { ScrollTop } from './BackToTop';
import { sendTextMessageToOpenAI } from './api/OpenaiAPI';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const MainForm = (props) => {
    const { drawerWidth } = props;

    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([
        {
            text: "Hi, 我是10歲的小學生",
            isBot: true
        }
    ]);

    const handleInput = (e) => {
        setInputText(e.target.value);
    }

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            await handleSend();
        }
    }

    const handleSend = async () => {
        if (!inputText) {
            return;
        }

        const text = inputText;
        setInputText("");
        setMessages([
            ...messages,
            { text, isBot: false, isLoading: true }
        ]);

        const response = await sendTextMessageToOpenAI(text);

        setMessages([
            ...messages,
            { text, isBot: false, isLoading: false },
            { text: response, isBot: true }
        ]);
    }

    const endMsgRef = useRef(null);
    useEffect(() => {
        endMsgRef.current.scrollIntoView();
    }, [messages]);


    return (
        <>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 5.25, pb: 10, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar id="back-to-top-anchor" sx={{ minHeight: { sm: 0, xs: 30 }, py: { sm: 0 } }} />

                {
                    messages.map((message, index) => {
                        return (
                            message.isBot ?
                                <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                    <AdbIcon fontSize="large" color="secondary" />
                                    <Box sx={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>
                                        {message.text}
                                    </Box>
                                </Box> :
                                <>
                                    <Box key={index} sx={{ mb: 2, ml: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip icon={<AccountCircleIcon fontSize="large" />}
                                            color="info"
                                            sx={{
                                                height: 'auto',
                                                '& .MuiChip-label': {
                                                    display: 'block',
                                                    whiteSpace: 'normal',
                                                },
                                                fontSize: '0.9rem'
                                            }}
                                            label={message.text} />
                                    </Box>
                                    {
                                        message.isLoading &&
                                        <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                            <AdbIcon fontSize="large" color="secondary" />
                                            <Box sx={{ width: '100%' }}>
                                                <Skeleton animation="wave" sx={{ width: '100%' }} />
                                                <Skeleton animation="wave" sx={{ width: '80%' }} />
                                            </Box>
                                        </Box>
                                    }
                                </>

                        );
                    })
                }

                <div ref={endMsgRef} />
                <ScrollTop {...props}>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>

                <AppBar position="fixed"
                    sx={{
                        top: 'auto',
                        bottom: 0,
                        bgcolor: 'white',
                        width: { sm: `calc(96% - ${drawerWidth}px)`, xs: '96%' },
                        borderRadius: '75px',
                        mb: 2,
                        mx: '2%'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 3, height: '100%' }}>
                        <InputBase
                            sx={{ flex: 1 }}
                            placeholder="聊個天吧..."
                            onChange={handleInput}
                            onKeyDown={handleEnter}
                            value={inputText}
                        />
                        <IconButton type="button" sx={{ p: 1 }} aria-label="send" onClick={handleSend}>
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </AppBar>
            </Box>
        </>
    )
}

export default MainForm;  