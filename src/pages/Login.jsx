import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../lib/firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false);

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setLoading(false);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        alert(errorMessage);
      });
    setEmail("");
    setPassword("");
  };



  return (
    <Container maxWidth={"lg"} sx={{ display: "grid", placeContent: "center" }}>
      <Card sx={{ width: 350, height:400,padding: 5, marginTop: 3 }} variant="outlined">
        <CardMedia
          image="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
          sx={{ width: 175, height: 51, margin: "auto" }}
        />
        <Box sx={{ width: "100%", marginTop: 5 }}>
          <input
            style={{
              width: "100%",
              height: 35,
              marginBottom: 8,
              background: "#FAFAFA",
              border: "none",
              padding: 4,
              border: "1px solid #DBDBDB",
              fontSize:14
            }}
            onChange={e=>setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="email address"
          />
          <input
            style={{
              width: "100%",
              height: 35,
              marginBottom: 8,
              background: "#FAFAFA",
              border: "none",
              padding: 4,
              border: "1px solid #DBDBDB",
              fontSize:14
            }}
              onChange={e=>setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password"
          />
          <Button
          onClick={login}
            disableElevation
            disableRipple
            variant="contained"
            sx={{
              width: "100%",
              background: "#0095F6",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: 14,
              height: 30,
              marginTop: 1,
            }}
          >
             {loading?
            <CircularProgress size={19} sx={{color:'white'}}/>:" Login"}
          </Button>
        </Box>
      </Card>
      <Box
        sx={{
          width: 350,
          padding: 3,
          marginTop: 1,
          background: "white",
          border: "1px solid #dbdbdb",
        }}
        variant="outlined"
      >
        <Typography sx={{ textAlign: "center", fontSize: 14 }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#0095F6", fontWeight: 500, cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
