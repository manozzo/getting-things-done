import {
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Icone, LoginForm, Title } from "../../components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const input = {
    display: 'flex',
    px: 2,
    height: '5vh',
    mx: "0.6rem",
    borderRadius: "20px",
    boxShadow:
      "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
  };

  const paper = {
    height: "100vh",
    p: 1,
    m: 0.5,
    backgroundColor: "#EEECEC",
    boxShadow:
      "-5px 5px 10px rgba(185, 185, 185, 0.2), 5px -5px 10px rgba(185, 185, 185, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 13px rgba(185, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5)",
  };

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(email, password);
    localStorage.setItem("appToken", "true");
    setIsLogged(true);
  };

  if (isLogged) {
    return <Redirect to="/" />;
  }

  return (
    <Paper sx={paper}>
      <Container sx={{ p: 0 }}>
        <Box display="flex" justifyContent="center" mt={2}>
          <Title></Title>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Typography variant="h5">log.in</Typography>
        </Box>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Icone name="user"/>
              <Box sx={input}>
                <InputBase required placeholder="username"  />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Icone name="password" />
              <Box sx={input} >
                <InputBase required placeholder="password"/>
              </Box>
            </Box>
          </Box>
          <Box display='flex' >
            <Box sx={input}>
              <IconButton  onClick={onSubmit}>
                <Icone name='enter' />
              </IconButton>
            </Box>  
          </Box>
        </Box>
        <Box display='flex' justifyContent='center' mt={4}>
          <Button sx={input}>sign.up</Button>
          <Button sx={input}>forgot</Button>
          <Button></Button>
        </Box>
      </Container>
    </Paper>
  );
}
