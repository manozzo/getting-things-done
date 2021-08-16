import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { DatePicker, TimePicker } from "@material-ui/lab";

export default function Calendar(openCalendar, handleCloseCalendar) {
  return (
      <Dialog open={openCalendar} onClose={handleCloseCalendar}>
        <DialogTitle>Selecione a data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCalendar}>Cancel</Button>
          <Button onClick={handleCloseCalendar}>Subscribe</Button>
        </DialogActions>
      </Dialog>
  );
}
