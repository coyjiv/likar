import React from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Avatar,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  open: boolean;
};

const Walkthrough = ({ open }: Props) => {
  const [opened, { close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      dOB: "",
      assignedDoctor: "",
      avatarUrl: "",
      placeOfResidence: "",
    },

    validate: {
      firstName: (value) => (value.length < 2 ? "Введіть своє імʼя" : null),
      lastName: (value) => (value.length < 2 ? "Введіть свою фамілію" : null),
      dOB: (value) =>
        /-?\d+(\.\d+)?/.test(value) ? null : "Виберіть дату народження",
      assignedDoctor: (value) => (value.length < 2 ? "Оберіть лікаря" : null),
      avatarUrl: (value) => (/^\S+@\S+$/.test(value) ? null : ""),
    },
  });

  return (
    <>
      <Modal
        className="z-[99]"
        opened={open}
        onClose={close}
        title="Для початку укажіть додаткові дані"
      >
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Ім'я"
              placeholder="Анна"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              withAsterisk
              label="Фамілія"
              placeholder="Зубко"
              {...form.getInputProps("lastName")}
            />
            <TextInput
              type="date"
              withAsterisk
              label="Дата народження"
              placeholder=""
              {...form.getInputProps("dOB")}
            />
            <TextInput
              withAsterisk
              label="Призначений лікар"
              placeholder=""
              {...form.getInputProps("assignedDoctor")}
            />
            <Avatar src="../../../../../public/next.svg" alt="it's me"></Avatar>
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Walkthrough;
