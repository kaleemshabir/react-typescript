
import React, {
  ReactElement,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
} from "react";
import User from "./User";
import useUsers from "../hooks/useUsers";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";

const UserList = (): ReactElement => {
  const { users, setUsers, fetchUsers, gender, setGender } = useUsers();
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  //   const [results, setResults] = useState(10); // Start from page 1
  let shouldFetch = useRef(true);

  useEffect(() => {
    if (shouldFetch.current && users.length===0) {
      shouldFetch.current = false;
      // Fetch users based on gender filter and current page
      fetchUsers(currentPage, gender).then((data) =>
        setUsers(data.results)
      );
    }
	()=> {shouldFetch.current = false}
  }, [currentPage, gender]);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    shouldFetch.current = true;
  };

  //   const totalPages = Math.ceil(users?.length / usersPerPage) || 1; // Handle empty cases

  let pageContent: ReactElement | ReactElement[] = <p>No users found...</p>;

  //   if (users?.length) {
  //     pageContent = (
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
      <Container maxWidth="md">
        {/* Gender Filter */}
        <FormControl sx={{ mb: 2 }}>
          <InputLabel id="gender-filter-label">Gender Filter</InputLabel>
          <Select
            labelId="gender-filter-label"
            id="gender-filter"
            label="Gender Filter"
            value={gender}
            onChange={(e) => {
              shouldFetch.current = true;
              setGender(e.target.value as string);
            }}
            sx={{ minWidth: 180 }} // Set minimum width for better presentation
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        {/* User Table */}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                {/* Add more table headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <User
                  key={index}
                  name={`${user.name.title} ${user.name.first} ${user.name.last}`}
                  email={`${user.email}`}
                  gender={`${user.gender}`}
                  index={index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={10}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
      </Container>
    </Box>
  );
  // );
};

//   return pageContent;
// };

export default UserList;
