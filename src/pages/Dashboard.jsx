import { Box, Container, Grid } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Card } from '../components/Card'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { Stories } from '../components/Stories'
import {PostContext} from '../context/PostContext';
import { arrayRemove, arrayUnion,  doc , Timestamp, updateDoc, } from "firebase/firestore";
import { db } from "../lib/firebase";
import { AuthContext } from '../context/AuthContext';
import { v4 as uuid } from "uuid";


function Dashboard() {
  const{posts}=useContext(PostContext);
  const{currentUser,setUserProfile}=useContext(AuthContext);

  
  useEffect(()=>{
document.title='Instagram Clone'
setUserProfile(null)
  },[])
  

  const like=async(id)=>{
    await updateDoc(doc(db, "posts", id), {
      likes: arrayUnion({
        uid: currentUser&&currentUser.uid,
    
      
      }),
    });
  }
  
  const unLike=async(id)=>{
    const ref=doc(db,"posts",id);
    
  await updateDoc(ref,{
    likes:arrayRemove({
      uid:currentUser&&currentUser.uid
    })
  })
  }

    const handleLike = (id,post) => {

let a= post.data.likes.find(item=>item.uid===currentUser.uid)

return typeof a==='undefined'?like(id):unLike(id)
  
    }
  

    const handleComment = async (id ,text ) => {
      if (!text) return;
      await updateDoc(doc(db, "posts", id), {
        comments: arrayUnion({
          id: uuid(),
          text,
          postedBy: {
            id: currentUser&&currentUser.uid,
            displayName: currentUser&&currentUser.displayName,
            photoURL: currentUser&&currentUser.photoURL,
            date: Timestamp.now(),
          },
        }),
      });
    };

  return (
    <>
   <Navbar currentUser={currentUser}/>
   <Container  maxWidth='md' sx={{marginTop:2}}>
<Grid container spacing={{ xs: 0, md: 5 }} columns={{xs:1,md:2}}>
<Grid className='postContainer' item 
md={1.1}>
<Stories/>
<Box sx={{marginTop:2}}>
  {posts&&posts.map(post=>
<Card key={post.id}
image={post.data.image}
caption={post.data.caption}
likes={post.data.likes}
comments={post.data.comments}
postedBy={post.data.postedBy}
handleLike={handleLike}
post={post}
id={post.id}
handleComment={handleComment}

/>
    )}
</Box>
</Grid>
<Grid className='user'  item md={.9} sx={{position:'sticky',top:33,height:'fit-content'}}>
<Sidebar/>
</Grid>
</Grid>
   </Container>
    </>
  )
}

export default Dashboard;