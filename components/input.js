import React from "react";
import { DebounceInput } from "react-debounce-input";
import inputStyles from "../styles/input.module.scss";

export default function Input({ className, error, ...props }) {
  return (
    <span>
      <DebounceInput
        debounceTimeout={500}
        className={`${inputStyles.input} ${className} 
      ${error && inputStyles.error}`}
        {...props}
      />
    </span>
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <span>
      <DebounceInput
        style={{
          maxWidth: "100%",
        }}
        element="textarea"
        forceNotifyByEnter={false}
        debounceTimeout={500}
        className={`${inputStyles.input} ${className} 
      ${error && inputStyles.error}`}
        {...props}
      />
    </span>
  );
}
