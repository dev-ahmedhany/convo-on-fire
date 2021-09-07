import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, FilledInput, Fab, InputAdornment } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles } from "./styles.js";

function ChatInput({ handleTyping, handleSendMessage, disabled }) {
  const classes = useStyles();

  const [text, setText] = useState("");

  const handleSend = () => {
    handleSendMessage(text.toString());
    setText("");
  };

  const handleSendWithEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Grid container className={classes.bottomSender}>
      <Grid item xs={12}>
        <FilledInput
          className={classes.textBox}
          required
          autoComplete="off"
          type="text"
          multiline
          maxRows={1}
          variant="outlined"
          placeholder="Say Something"
          onKeyPress={handleTyping}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          disableUnderline
          inputProps={{ style: { padding: "18px 20px 18px" } }}
          onKeyDown={handleSendWithEnter}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              <Fab
                size="small"
                type="submit"
                color="primary"
                aria-label="Send"
                onClick={handleSend}
                disabled={disabled}
              >
                <SendIcon />
              </Fab>
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  );
}

ChatInput.propTypes = {
  handleTyping: PropTypes.func,
  handleSendMessage: PropTypes.func.isRequired,
};

export default ChatInput;
