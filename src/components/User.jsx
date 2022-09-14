import { Avatar, Box, Typography } from "@mui/material";
import { auth } from "../lib/firebase";

export const User = ({
  width,
  height,
  username,
  fullname,
  image,
  handleFollow,
  uid,
  user,
  followers,
  handleProfile
}) => {
  let a =
    followers &&
    followers.find((item) => item.user.uid === auth.currentUser.uid);

  return (
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
        <Avatar sx={{ width, height }} src={image} />
        <Box onClick={()=>handleProfile(uid)} sx={{cursor:'pointer'}}>
          <Typography fontWeight={500} fontSize={15}>
            {username}
          </Typography>
          <Typography fontWeight={500} fontSize={13} color="#A2A2A2">
            {fullname}
          </Typography>
        </Box>
      </Box>
      <Typography
        onClick={() => handleFollow(uid, user)}
        sx={{ cursor: "pointer" }}
        fontWeight={600}
        fontSize={12}
        color="#0095F6"
      >
        {typeof a==='undefined'?'follow':'following'}
        {/* {title} */}
      </Typography>
    </Box>
  );
};
