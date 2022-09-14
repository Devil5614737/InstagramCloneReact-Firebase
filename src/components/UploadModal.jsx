import { Box, Button, CardMedia, CircularProgress, Input, Modal} from '@mui/material'
import React, { useContext, useState } from 'react'
import { db, storage } from "../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection,serverTimestamp } from "firebase/firestore";
import {AuthContext} from '../context/AuthContext';


export const UploadModal = ({open,close}) => {
const{currentUser}=useContext(AuthContext)

    const[file,setFile]=useState(null);
    const[caption,setCaption]=useState("");
    const[loading,setLoading]=useState(false);

    
    
    const handleUpload = async () => {
      setLoading(true)
      if (file) {
        try {
          const posts = collection(db, "posts");
          const date = new Date().getTime();
  
          const storageRef = ref(storage, `${file?.name + date}`);
  
          await uploadBytesResumable(storageRef, file)
            .then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                await addDoc(posts, {
                  caption,
                  image: downloadURL,
                  likes: [],
                  comments: [],
                  createdAt: serverTimestamp(),
                  postedBy: {
                    uid: currentUser&&currentUser.uid,
                    displayName: currentUser&&currentUser.displayName,
                    photoURL: currentUser&&currentUser.photoURL,
                  },
                });
              });
            })
            .catch((e) => {
              setLoading(false)
              console.log(e)});
        } catch (e) {
          setLoading(false)
          alert(e);
        }
      }
      setCaption("");
      setFile(null);
      close();
      setLoading(false)
    };
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p:4,
      };

  return (
<Modal
  open={open}
  onClose={close}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
   <Input type='file' onChange={e=>setFile(e.target.files[0])}/>

   {file&&
   
   <CardMedia
   image={URL.createObjectURL(file)}
   sx={{
    width:'100%',
    height:180
   }}
   />
   }
   <input
   value={caption}
   onChange={e=>setCaption(e.target.value)}
   style={{marginTop:22,
width:'100%',
height:40,
padding:'.3em'
}} placeholder='write a caption'/>

<Button onClick={handleUpload}  disableElevation disableRipple variant='contained' sx={{width:'100%',background:"#0095F6",textTransform:"capitalize",fontWeight:'bold',fontSize:14,height:30,marginTop:2}}>
  {loading?<CircularProgress size={19} sx={{color:'white'}}/>:"Upload"}
</Button>

  </Box>
</Modal>
  )
}
