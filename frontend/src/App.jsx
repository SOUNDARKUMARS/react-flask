import { Button, Container, Stack } from "@chakra-ui/react";
import React from "react";
import UserGrid from "./components/UserGrid";
import CreateUserModal from "./components/CreateUserModal";

export const BASE_URL = "https://43a3-103-25-44-74.ngrok-free.app/api";

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
