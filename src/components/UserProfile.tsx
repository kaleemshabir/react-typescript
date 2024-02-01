
import React, { ReactElement, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Box,
  Container,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import useUsers from "../hooks/useUsers";
import { useParams } from "react-router-dom";

interface UserDetails {
  name: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  password: string;
  photoUrl: string;
}

const CardProfile = () => {
  const { userDetail } = useUsers();
  const { id } = useParams();
  const userDetails = userDetail(id || "");

  const [activeItem, setActiveItem] = useState("email");

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const handleRefresh = () => {
    // Implement logic to fetch a new user here
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <List sx={{ pt: 2 }}>
              <ListItem
                button
                onClick={() => handleItemClick("name")}
                selected={activeItem === "name"}
              >
                <ListItemIcon>
                  <Avatar src={userDetails?.photoUrl} />
                </ListItemIcon>
                <ListItemText primary={`Hi, My name is ${userDetails?.name}`} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("email")}
                selected={activeItem === "email"}
              >
                <ListItemIcon>
                  <Typography variant="body2" component="span">
                    @
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={userDetails?.email} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("birthday")}
                selected={activeItem === "birthday"}
              >
                <ListItemIcon>
                  <Typography variant="body2" component="span">
                    {/* Add a birthday icon here */}
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={userDetails?.birthday} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("location")}
                selected={activeItem === "location"}
              >
                <ListItemIcon>
                  <Typography variant="body2" component="span">
                    {"place"}
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={userDetails?.address} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("phone")}
                selected={activeItem === "phone"}
              >
                <ListItemIcon>
                  <Typography variant="body2" component="span">
                    phone
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={userDetails?.phone} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("password")}
                selected={activeItem === "password"}
              >
                <ListItemIcon>
                  <Typography variant="body2" component="span">
                    lock
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={userDetails?.password} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CardProfile;
