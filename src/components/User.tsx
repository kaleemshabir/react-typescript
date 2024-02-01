
// User.tsx
import React, { ReactElement } from "react";
import { TableRow, TableCell } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

type PropsType = {
  name: string;
  email: string;
  gender: string;
  index: number;
  children?: any;
};

const User = ({ name, email, gender, index }: PropsType): ReactElement => {
  const navigate = useNavigate(); // Use the useNavigate hook from react-router-dom
  const navigateToProfile = (userId: string) => {
    // Assuming you have a router setup in your app
    navigate(`/profile/${userId}`);
  };
  return (
    <TableRow onClick={() => navigateToProfile(email)} hover style={{cursor:"pointer"}}>
    
      <TableCell>{index}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{gender}</TableCell>
      {/* Add more table cells as needed */}
    </TableRow>
  );
};


export default User;
