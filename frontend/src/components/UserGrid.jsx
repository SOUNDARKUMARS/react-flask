import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Grid } from "@chakra-ui/react";

const UserGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      console.log("im called");
      try {
        const res = await fetch("http://127.0.0.1:5000/api/friends");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error);
        }
        setUsers(data);
      } catch (error) {
        console.log("error in fetching users:", error);
      } finally {
        setoading(false);
      }
    };

    getUsers();
  }, []);
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2,1fr)",
        lg: "repeat(3,1fr)",
      }}
      gap={4}
    >
      {users?.map((user) => (
        <UserCard key={user?.id} user={user} setUsers={setUsers} />
      ))}
    </Grid>
  );
};

export default UserGrid;
