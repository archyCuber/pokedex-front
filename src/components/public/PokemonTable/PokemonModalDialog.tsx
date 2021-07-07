import React from "react";
import { ModalDialog } from "../../core/ModalDialog";

export const PokemonModalDialog = (props: {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: JSX.Element;
}) => {
  return (
    <div>
      <ModalDialog
        open={props.open}
        handleClose={props.handleClose}
        title={props.title}
        content={props.content}
      />
    </div>
  );
};
