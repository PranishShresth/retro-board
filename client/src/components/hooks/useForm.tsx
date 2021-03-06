import React, { useState } from "react";

export const useForm = <T,>(initialState: T) => {
  const [formValues, setFormValues] = useState<T>(initialState);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  return { formValues, handleChange, setFormValues };
};
