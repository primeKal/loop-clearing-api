import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TransactionsDialog = ({ open, onClose, transactions, len }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontSize: "24px" }}>Congratulations</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: "20px" }}>
          A total of {len} transactions have been cleared.
        </DialogContentText>
        <DialogContentText style={{ fontSize: "20px" }}>
          Do the following to balance your cash flow:
        </DialogContentText>
        <List>
          {transactions.map((transaction, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Transaction ${index + 1}`}
                primaryTypographyProps={{ style: { fontSize: "18px" } }}
                secondary={
                  transaction.user?.name +
                  "=>" +
                  transaction.partner?.name +
                  "=" +
                  transaction.value
                }
                secondaryTypographyProps={{ style: { fontSize: "16px" } }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" style={{ fontSize: "15px" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionsDialog;
