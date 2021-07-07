import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#2a2a2a",
    color: "white",
    overflow: "hidden",
  },
});

interface IProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: JSX.Element;
}

export const ModalDialog = ({ open, handleClose, title, content }: IProps) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        classes={{ paper: classes.paper }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{ textAlign: "center" }}
        >
          {title}
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </div>
  );
};
