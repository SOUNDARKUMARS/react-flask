import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BASE_URL } from "../App";
import EditModal from "./EditModal";

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();

  const deleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + `/friends/${user?.id}`, {
        method: "DELETE",
      });
      const data = res?.json;
      if (!res.ok) {
        throw new Error(data?.error);
      }
      window.location.reload();
    } catch (error) {
      console.log("failed to delete:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={user.imgUrl} />

            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <Button
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              onClick={deleteUser}
            >
              Del
            </Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
