import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  FilledInput,
  Fab,
  InputAdornment,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { Send, Close } from "@material-ui/icons";
import { useStyles } from "./styles.js";

function ChatInput({
  handleTyping,
  handleSendMessage,
  disabled,
  reply,
  setReply,
}) {
  const classes = useStyles();

  const [text, setText] = useState("");

  const handleSend = () => {
    if (text !== "") {
      handleSendMessage(text.toString());
      setText("");
    }
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
        {reply && (
          <Box display="flex" flexGrow="1" justifyContent="space-between">
            <Box>
              <Typography variant="body1">
                {`replying to `}
                <b>{reply.name || "yourself"}</b>
              </Typography>
              <Typography variant="body2">
                {reply.text.length > 72
                  ? reply.text.substring(0, 72) + "..."
                  : reply.text}
              </Typography>
            </Box>
            <IconButton
              onClick={() => {
                setReply();
              }}
              color="primary"
              aria-label="close reply"
            >
              <Close />
            </IconButton>
          </Box>
        )}
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
                <Send />
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
