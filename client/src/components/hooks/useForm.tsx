import React, { useState } from "react";

interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T;
}

export const useForm = (initialState: any) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (event: DOMEvent<HTMLInputElement>) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [event.target.name]: [event.target.value],
    }));
  };

  return [formValues, handleChange];
};
