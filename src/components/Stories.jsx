import { Avatar, Box } from "@mui/material";


import { stories } from "../helpers/stories";

export const Stories = () => {


  return (
    <Box
      sx={{
        background: "white",
        padding: 2,
        display: "flex",
        gap: 2,
        overflowX: "hidden",
        border: "1px solid #dbdbdb",
        borderRadius: 2,
      }}
    >
      {stories.map((item) => (
        <Box
        key={item.id}
          sx={{
            border: "2px solid #E200A5",
            width: "fit-content",
            borderRadius: 20,
            padding: .3,
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={item.pic}
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      ))}
    </Box>
  );
};