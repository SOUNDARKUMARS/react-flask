import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BASE_URL } from "../App";

const EditModal = ({ user, setUser }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user?.name,
    role: user?.role,
    description: user?.description,
  });

  const handleUpdate = async (e) => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL + "/friends/" + user?.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json;
      if (!res.ok) {
        throw new Error();
      }
      window.location.reload();
      onClose();
    } catch (error) {
      toast({
        title: "Failed to update",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setInputs({ name: "", role: "", description: "", role: "", gender: "" });
    }
  };
  return (
    <div>
      <Button
        variant="ghost"
        colorScheme="blue"
        size={"sm"}
        aria-label="See menu"
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {/* <form action="" onSubmit={() => handleCreateUser()}> */}
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
              <FormControl>
                <FormLabel>Full name*</FormLabel>
                <Input
                  value={inputs?.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role*</FormLabel>
                <Input
                  value={inputs?.role}
                  onChange={(e) =>
                    setInputs({ ...inputs, role: e.target.value })
                  }
                />
              </FormControl>
            </Flex>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={inputs?.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                overflow={"hidden"}
                resize={"none"}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleUpdate()}
              isLoading={loading}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Done
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        {/* </form> */}
      </Modal>
    </div>
  );
};

export default EditModal;
