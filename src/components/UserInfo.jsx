import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

export const UserInfo = ({posts,username,fullname,photoURL,followings,followers,openModal,hideEditProfile}) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ display: "flex", gap: 6 }}>
        <Avatar sx={{ width: 120, height: 120 }}  src={photoURL}/>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginBottom: 1,
            }}
          >
            <Typography color={"#262626"} fontSize={25}>
              {username}
            </Typography>
            {hideEditProfile&&
            <Typography
            onClick={openModal}
              sx={{
                border: "1px solid",
                fontSize: 13,
                padding: ".2em 1em",
                fontWeight: "bold",
                borderRadius: 1,
                cursor: "pointer",
              }}
            >
              Edit profile
            </Typography>}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              marginBottom: 1,
            }}
          >
            <Typography>
              {posts} <span>posts</span>
            </Typography>
            <Typography>
              {followers} <span>followers</span>
            </Typography>
            <Typography>
              {followings} <span>following</span>
            </Typography>
          </Box>
          <Typography>{fullname}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
