import {
    Box,
    CardMedia,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuItem,
  } from "@mui/material";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
  import { RiMessengerLine, RiCompass3Line } from "react-icons/ri";
  import { FiPlusSquare } from "react-icons/fi";
  import { Avatar } from "@mui/material";
  import {Link as Lnk} from 'react-router-dom';
import { UploadModal } from "./UploadModal";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";


  
  export const Navbar = ({currentUser}) => {
    const navigate=useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const opens = Boolean(anchorEl);
     const [open, setOpen] = useState(false);



  const openModal = () => setOpen(true);
  const close = () => setOpen(false);

  
    const handleClose = () => {
      setAnchorEl(null);
    };
  

const handleLogout=()=>{
  signOut(auth).then(()=>{
    navigate('/')
  }).catch((error)=>{
    alert(error)
  })
}



    return (
      <>
        <Box
          sx={{
            padding: ".4em 0",
            background:"white",
            borderBottom: "1px solid #dbdbdb",
            position: "sticky",
            top: 0,
            width:'100%',
            zIndex: 2,
          }}
        >
          <Container
          maxWidth='md'
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
          <Lnk to='/dashboard'>
          <CardMedia
        
        image="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
        sx={{
          objectFit: "contain",
          width: 103,
          height: 29,
          cursor: "pointer",
          // filter:darkTheme&&'invert(1)'
        }}
      /></Lnk>
            <Box sx={{ display: "flex", alignItems: "center", gap: .4 }}>
         
         <Lnk to='/dashboard'>

           <IconButton>
                <AiOutlineHome size={27} color="#262626" />
              </IconButton>
         </Lnk>
    
              <IconButton>
                <RiMessengerLine size={27} color="#262626" />
              </IconButton>
              <IconButton onClick={openModal}>
                <FiPlusSquare
    
                  size={27}
                  color="#262626"
                />
              </IconButton>
              <IconButton>
                <RiCompass3Line size={27} color="#262626" />
              </IconButton>
              <IconButton>
                <AiOutlineHeart size={27} color="#262626" />
              </IconButton>
  
              <Avatar
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{ width: 28, height: 28,cursor:'pointer' }}
                // src={auth.currentUser.photoURL}
                src={currentUser&&currentUser.photoURL}
              
              />
           
            </Box>
          </Container>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={opens}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link  to='/profile'>
          <MenuItem 
          sx={{fontSize:14}}
          >Profile</MenuItem>
          </Link>
           <Divider/>
           <Divider/>
          <MenuItem 
          sx={{fontSize:14}}
          onClick={handleLogout}
         >Logout</MenuItem>
        </Menu>
        <UploadModal close={close} open={open}/>
      </>
    );
  };