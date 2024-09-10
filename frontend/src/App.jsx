import { Button, Container, Stack } from "@chakra-ui/react";
import React from "react";
import UserGrid from "./components/UserGrid";
import CreateUserModal from "./components/CreateUserModal";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
  return (
    <Stack minH={"100vh"}>
      <CreateUserModal />
      <Container maxW={"1200px"} my={4}>
        <UserGrid />
      </Container>
    </Stack>
  );
}

export default App;
