
import { Avatar, Box, Typography } from '@mui/material'
import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {  auth, db } from '../lib/firebase'
import { User } from './User'

export const Sidebar = () => {
  const{currentUser,setUsers,users,setUserProfile}=useContext(AuthContext)
  const navigate=useNavigate();


  useEffect(() => {
    if(!currentUser) return ;
    const user=query(collection(db,"users"),where("uid","!=",currentUser&&currentUser.uid))
    const unsubscribe = onSnapshot(user, (snapshot) => {
       setUsers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  
    return () => {
      unsubscribe();
    };
  }, []);


const follow=async(id,user)=>{
await updateDoc(doc(db,"users",id),{
  followers:arrayUnion({
    user:{
      uid:currentUser&&currentUser.uid,
      displayName:currentUser&&currentUser.displayName,
      photoURL:currentUser&&currentUser.photoURL
    }
  })
})
await updateDoc(doc(db,"users",currentUser&&currentUser.uid),{
  following:arrayUnion({
    user:{
      uid:user.uid,
      displayName:user.displayName,
      photoURL:user.photoURL
    }
  })
})
}
const unFollow=async(id,user)=>{
await updateDoc(doc(db,"users",id),{
  followers:arrayRemove({
    user:{
      uid:currentUser&&currentUser.uid,
      displayName:currentUser&&currentUser.displayName,
      photoURL:currentUser&&currentUser.photoURL
    }
  })
})
await updateDoc(doc(db,"users",currentUser&&currentUser.uid),{
  following:arrayRemove({
    user:{
      uid:user.uid,
      displayName:user.displayName,
      photoURL:user.photoURL
    }
  })
})
}

const handleFollow=async(id,user)=>{

  let a=user.followers.find(item=>item.user.uid===auth.currentUser.uid)
  typeof a==='undefined'?follow(id,user):unFollow(id,user)
}


const handleProfile=async(id)=>{
  const b=query(collection(db,"users"),where("uid","==",id));

  const querySnapshot = await getDocs(b);
  querySnapshot.forEach((doc) => {
    setUserProfile(doc.data())
  });
  navigate('/profile')

}




  return (
<>
<Box
      width={"100%"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 1.4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width:60, height:60 }} src={currentUser&&currentUser.photoURL}/>
        <Box>
          <Typography fontWeight={500} fontSize={15}>
            {currentUser&&currentUser.displayName}
          </Typography>
          <Typography fontWeight={500} fontSize={13} color="#A2A2A2">
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{ cursor: "pointer" }}
        fontWeight={600}
        fontSize={12}
        color="#0095F6"
      >
      switch
      </Typography>
    </Box>



<Box sx={{display:'flex',alignItems:'center' ,justifyContent:'space-between'}}>
<Typography fontWeight='bold' fontSize={14} color={'#8E8E8E'} sx={{marginBottom:1.2}}>Suggestions For You</Typography>
<Typography fontWeight='bold' fontSize={12} color={'#262626'}>See All</Typography>
</Box>
{users&&users.map(user=>
<User width='32px' height='32px' title='follow'
username={user&&user.data.displayName}
fullname={user&&user.data.fullname}
image={user&&user.data.photoURL}
handleFollow={handleFollow}
uid={user&&user.data.uid}
user={user&&user.data}
followers={user&&user.data.followers}
handleProfile={handleProfile}
/>
  )}

</>
  )
}
