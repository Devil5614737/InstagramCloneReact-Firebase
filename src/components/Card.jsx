import React, { useContext, useRef, useState } from "react";

import { Avatar, Box, Card as Crd, CardMedia, Typography } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { RiChat1Line } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { LazyLoadImage } from 'react-lazy-load-image-component';



export const Card = ({image,likes,postedBy,caption,post,handleLike,id,handleComment,comments}) => {
  const[text,setText]=useState('');
  const{currentUser}=useContext(AuthContext);


  const ref = useRef(null);

  const isLiked= post.data.likes.find(item=>item.uid===currentUser.uid)

  return (
    <Crd
      elevation={0}
      sx={{ borderRadius: 2, border: "1px solid #dbdbdb", background: "white" ,marginTop:2}}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1,
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 30, height: 30 }}  src={postedBy.photoURL}/>
          <Typography fontSize={14} fontWeight={500}>
            {postedBy.displayName}
          </Typography>
        </Box>
        <BsThreeDots style={{ cursor: "pointer" }} />
      </Box>
      <LazyLoadImage
        src={image}
        style={{ width: "100%", height: 400, objectFit: "cover" }}
      />
      <Box sx={{ padding: 1 }}>
        <Box sx={{ display: "flex", gap: 1, marginBottom: 1.2 }}>
          {typeof isLiked==='undefined'?
          <AiOutlineHeart onClick={()=>handleLike(id,post)} size={28} cursor="pointer" />:

          <AiFillHeart onClick={()=>handleLike(id,post)} size={28} color='red' cursor="pointer" />
          }
          <RiChat1Line  onClick={() => ref.current.focus()} size={28} cursor="pointer" />
        </Box>
        <Typography fontWeight={"bold"} fontSize={14}>
          {likes&&likes.length} likes
        </Typography>
        <Typography
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
          fontWeight={"bold"}
          fontSize={14}
        >
          {postedBy.displayName} <Typography fontSize={14}>{caption}</Typography>
        </Typography>
        <Typography
          color={"#A3A3A3"}
          fontSize={14}
          sx={{ marginTop: 1, cursor: "pointer" }}
        >
          View all {comments&&comments.length} comments
        </Typography>
        {comments.map(comment=>
         <Typography
         key={comment.id}
         sx={{ display: "flex", gap: 1, alignItems: "center", marginTop: 0.5 }}
         fontWeight={"bold"}
         fontSize={14}
       >
         {comment.postedBy.displayName} <Typography fontSize={14}>{comment.text}</Typography>
       </Typography> )}
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            borderTop: "1px solid #dbdbdb",
          }}
        >
          <input
           ref={ref}
           id="text"
           name="text"
          value={text}
          onChange={e=>setText(e.target.value)
          
          }
            style={{
              width: "100%",
              padding: ".3em",
              marginRight: 12,
              border: "none",
              fontSize: 14,
            }}
            type="text"
            placeholder="Add a comment..."
          />
          <Typography
          onClick={()=>{handleComment(id,text)
            setText("")}}
            sx={{ cursor: "pointer" }}
            color="#0095F6"
            fontWeight={"bold"}
            fontSize={14}
          >
            Post
          </Typography>
        </Box>
      </Box>
    </Crd>
  );
};
