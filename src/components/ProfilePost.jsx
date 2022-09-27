import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const ProfilePost = ({image,likes,comments,handleDelete,id}) => {
  return (
    <Grid >
    <Box className="gridItem" onDoubleClick={()=>handleDelete(id)}>
      <LazyLoadImage
        style={{ width:"100%", height:293,objectFit:'cover'}}
        src={image}
        // effect='blur'
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
