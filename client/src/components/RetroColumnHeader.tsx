import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useForm } from "./hooks/useForm";
import { Input } from "@chakra-ui/input";
import { listActions } from "../reducers/listReducer";
import { Icon } from "semantic-ui-react";
import { FaTrash } from "react-icons/fa";

const RetroColumnHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
`;

interface Props {
  list_title: string;
  list_id: string;
}
export default function RetroColumnListHeader({ list_title, list_id }: Props) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const { handleChange, formValues } = useForm({ list_title: list_title });

  const updateList = () => {
    if (formValues.list_title.length < 1) {
      return;
    }
    dispatch({
      type: "UPDATE_LIST_REQUESTED",
      payload: { list_id, ...formValues },
    });
    dispatch(listActions.updateList({ _id: list_id, ...formValues }));
    setEditMode(false);
  };

  const deleteList = () => {
    dispatch({ type: "DELETE_LIST_REQUESTED", payload: { list_id } });
  };
  const handleSubmit = (ev: React.KeyboardEvent | React.FocusEvent) => {
    try {
      const { key } = ev as React.KeyboardEvent<HTMLInputElement>;
      if (key === "Enter") {
        return updateList();
      }
    } catch (err) {}
  };

  return (
    <>
      {editMode ? (
        <Input
          autoFocus
          fontWeight="bold"
          variant="filled"
          placeholder="List Title"
          name="list_title"
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleSubmit}
          value={formValues.list_title}
        />
      ) : (
        <RetroColumnHeader>
          <div onClick={() => setEditMode(true)}>{list_title}</div>
          <Icon
            as={FaTrash}
            onClick={deleteList}
            style={{ cursor: "pointer" }}
          />
        </RetroColumnHeader>
      )}
    </>
  );
}
