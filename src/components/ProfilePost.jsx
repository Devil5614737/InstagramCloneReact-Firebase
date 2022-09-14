import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'

export const ProfilePost = ({image,likes,comments,handleDelete,id}) => {
  return (
    <Grid >
    <Box className="gridItem" onDoubleClick={()=>handleDelete(id)}>
      <CardMedia
        sx={{ width: "100%", height: 293 }}
        image={image}
      />
      <Box className="icons">
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <AiFillHeart color="white" size={30} />{likes}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <FaComment color="white" size={30} />
          {comments}
        </Typography>
      </Box>
    </Box>
  </Grid>
  )
}
