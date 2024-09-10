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

const CreateUserModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    role: "",
    gender: "",
  });

  const handleCreateUser = async (e) => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json;
      if (!res.ok) {
        throw new Error(data.error);
      }
      window.location.reload();
      onClose();
    } catch (error) {
      console.log("here..", error);
      toast({
        title: "Failed to create",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      setInputs({ name: "", description: "", role: "", gender: "" });
    }
  };
  return (
    <div>
      <Button my={5} mx={5} onClick={onOpen}>
        Add new Friend +
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
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role*</FormLabel>
                <Input
                  value={inputs.role}
                  onChange={(e) =>
                    setInputs({ ...inputs, role: e.target.value })
                  }
                  placeholder="Software Developer"
                />
              </FormControl>
            </Flex>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                overflow={"hidden"}
                resize={"none"}
                placeholder="He is working as a Mobile app developer!   He loves to build things."
              />
            </FormControl>
            <RadioGroup mt={4}>
              <Flex gap={4}>
                <Radio
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                  value="male"
                >
                  Male
                </Radio>
                <Radio
                  onChange={(e) =>
                    setInputs({ ...inputs, gender: e.target.value })
                  }
                  value="female"
                >
                  Female
                </Radio>
              </Flex>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleCreateUser()}
              isLoading={loading}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        {/* </form> */}
      </Modal>
    </div>
  );
};

export default CreateUserModal;
