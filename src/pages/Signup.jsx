import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {auth, db} from '../lib/firebase';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false)


  const handleSignup = async () => {
    setLoading(true)


    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      
          try {
            await updateProfile(res.user, {
              displayName: username,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              followers: [],
              following: [],
              fullname,
              photoURL:""
            })
            .then(() => navigate('/dashboard'));
          } catch (e) {
            setLoading(false);
            alert(e);
          }    
    } catch (e) {
      setLoading(false);
      alert(e);
    }
    setEmail("");
    setFullname("")
    setUsername("");
    setPassword("");
  };

  return (
    <Container maxWidth={"lg"} sx={{ display: "grid", placeContent: "center" }}>
      <Card sx={{width: 350, height:400, padding: 5, marginTop: 3 }} variant="outlined">
        <CardMedia
          image="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
          sx={{ width: 175, height: 51, margin: "auto" }}
        />
        <Box sx={{ width: "100%", marginTop: 5 }}>
          <input
          onChange={e=>setEmail(e.target.value)}
          value={email}
            style={{
              width: "100%",
              height: 28,
              marginBottom: 8,
              background: "#FAFAFA",
              padding: 4,
              border: "1px solid #DBDBDB",
              height: 35,
              fontSize:14
            }}
            type="email"
            placeholder="Email"
          />
          <input
              onChange={e=>setFullname(e.target.value)}
              value={fullname}
            style={{
              width: "100%",
              height: 28,
              marginBottom: 8,
              background: "#FAFAFA",
              padding: 4,
              border: "1px solid #DBDBDB",
              height: 35,
              fontSize:14
            }}
            type="email"
            placeholder="Full Name"
          />
          <input
              onChange={e=>setUsername(e.target.value)}
              value={username}
            style={{
              width: "100%",
              height: 28,
              marginBottom: 8,
              background: "#FAFAFA",
              padding: 4,
              border: "1px solid #DBDBDB",
              height: 35,
              fontSize:14
            }}
            type="text"
            placeholder="Username"
          />
          <input
              onChange={e=>setPassword(e.target.value)}
              value={password}
            style={{
              width: "100%",
              marginBottom: 8,
              background: "#FAFAFA",
              padding: 4,
              border: "1px solid #DBDBDB",
              height: 35,
              fontSize:14
            }}
            type="password"
            placeholder="Password"
          />
          <Button
          onClick={handleSignup}
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
            <CircularProgress size={19} sx={{color:'white'}}/>:" Sign up"}
          </Button>
        </Box>
      </Card>
      <Box
        sx={{
          width: 340,
          padding: 3,
          marginTop: 1,
          background: "white",
          border: "1px solid #dbdbdb",
        }}
        variant="outlined"
      >
        <Typography sx={{ textAlign: "center", fontSize: 14 }}>
          Have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ color: "#0095F6", fontWeight: 500, cursor: "pointer" }}
          >
            
            Log in
          </span>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signup;
