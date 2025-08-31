import React, { useState, useEffect } from "react";
import { ZodSchema } from "zod";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema: ZodSchema<T>
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      if (jsonValue == null) return initialValue;

      const parsedJson = JSON.parse(jsonValue);
      const validation = schema.safeParse(parsedJson);

      if (validation.success) {
        return validation.data;
      } else {
        console.warn(
          "Invalid data found in localStorage, falling back to initial value.",
          validation.error
        );
        return initialValue;
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
