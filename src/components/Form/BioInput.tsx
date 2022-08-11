import {
  ButtonGroup,
  CircularProgress,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react";

import { forwardRef, useState } from "react";
import { FiCheck, FiX, FiEdit } from "react-icons/fi";

interface BioInputProps {
  id: string;
  placeholder?: string;
  userBio: string;
}

export const BioInput = forwardRef<HTMLTextAreaElement, BioInputProps>(
  ({ id, userBio, placeholder }, ref) => {
    const [bio, setBio] = useState(userBio);

    function EditableControls() {
      const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
        useEditableControls();

      return isEditing ? (
        <>
          <CircularProgress value={(bio.length * 100) / 120} color="brand.400" size={6} />
          <ButtonGroup justifyContent="center" size="sm" variant="secondary">
            <IconButton
              aria-label="Confirmar"
              icon={<FiCheck />}
              {...getSubmitButtonProps()}
            />
            <IconButton aria-label="Fechar" icon={<FiX />} {...getCancelButtonProps()} />
          </ButtonGroup>
        </>
      ) : (
        <Flex justifyContent="center">
          <IconButton
            aria-label="Editar"
            variant="secondary"
            size="sm"
            icon={<FiEdit />}
            {...getEditButtonProps()}
          />
        </Flex>
      );
    }

    return (
      <Editable
        display="flex"
        alignItems="center"
        gap="4"
        id={id}
        defaultValue={bio}
        placeholder={placeholder}
        isPreviewFocusable={true}
      >
        <EditablePreview
          _before={bio ? { content: "'“'" } : {}}
          _after={bio ? { content: "'”'" } : {}}
          color={!bio ? "gray.400" : "brand.500"}
          fontStyle="italic"
          fontWeight={!bio ? "400" : "600"}
          width="calc(100% - 4rem)"
          padding="1rem 1.5rem"
          backgroundColor="gray.100"
        />
        <EditableTextarea
          ref={ref}
          maxLength={120}
          resize="none"
          padding="1rem 1.5rem"
          overflowY="hidden"
          onChange={({ target: { value } }) => {
            setBio(value);
          }}
        />
        <EditableControls />
      </Editable>
    );
  }
);

BioInput.displayName = "BioInput";
