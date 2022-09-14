import { Box, Button, CardMedia, CircularProgress, FormLabel, Input, Modal, TextField} from '@mui/material'
import React, {  useState } from 'react'



export const EditProfileModal = ({open,close,handleUpdateProfile,loading}) => {


    const[file,setFile]=useState(null);
    const[username,setUsername]=useState("");
    const[fullname,setFullname]=useState("");


    


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
    <FormLabel>Change Profile Picture</FormLabel>
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
<TextField value={username} onChange={e=>setUsername(e.target.value)} sx={{width:'100%',mt:2}} variant='outlined' label='update username'/>
<TextField value={fullname} onChange={e=>setFullname(e.target.value)} sx={{width:'100%',mt:2}} variant='outlined' label='update fullname'/>

<Button
 onClick={()=>handleUpdateProfile(file,username,fullname)}  

disableElevation disableRipple variant='contained' sx={{width:'100%',background:"#0095F6",textTransform:"capitalize",fontWeight:'bold',fontSize:14,height:30,marginTop:2}}>{loading?<CircularProgress size={19} sx={{color:'white'}}/>:"Update"}</Button>

  </Box>
</Modal>
  )
}
