import React from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import {
  Avatar,
  Tooltip,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

import withStyles from "@mui/styles/withStyles";
import { styles } from "./styles";

const ChatMsg = withStyles(styles, { name: "ChatMsg" })(
  ({
    classes,
    avatar,
    seen,
    name,
    sentBy,
    messages,
    side,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
    setReply,
  }) => {
    const attachClass = (index) => {
      if (index === 0) {
        return classes[`${side}First`];
      }
      if (index === messages.length - 1) {
        return classes[`${side}Last`];
      }
      return "";
    };
    return (
      <Grid container {...GridContainerProps}>
        <Box display="flex" flexGrow="1">
          {side === "left" && (
            <Grid item {...GridItemProps}>
              <Tooltip title={name} aria-label={name}>
                <Avatar
                  src={avatar}
                  {...AvatarProps}
                  className={cx(classes.avatar, AvatarProps.className)}
                />
              </Tooltip>
            </Grid>
          )}
          <Box style={{ flexGrow: "1" }}>
            {messages.map((msg, i) => {
              const TypographyProps = getTypographyProps(msg, i);
              return (
                <Grid
                  container
                  item
                  justifyContent={side === "right" ? "flex-end" : "flex-start"}
                >
                  <Grid item xs={8}>
                    <div key={msg.id} className={classes[`${side}Row`]}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        flexDirection={side === "right" ? "row" : "row-reverse"}
                      >
                        <Box flexGrow={1} className={classes.reply}>
                          <IconButton
                            onClick={() => {
                              setReply({
                                id: msg.id,
                                sentBy,
                                name: name ? name : "yourself",
                                text:
                                  msg.text.length > 72
                                    ? msg.text.substring(0, 72) + "..."
                                    : msg.text,
                              });
                            }}
                            color="inherit"
                            style={{
                              width: "20px",
                              height: "20px",
                              marginBottom: "5px",
                            }}
                            size="large"
                          >
                            <ReplyIcon />
                          </IconButton>
                        </Box>
                        <Tooltip
                          //prevent scrolling bug
                          PopperProps={{
                            disablePortal: true,
                            popperOptions: {
                              positionFixed: true,
                              modifiers: {
                                preventOverflow: {
                                  enabled: true,
                                  boundariesElement: "window", // where "window" is the boundary
                                },
                              },
                            },
                          }}
                          title={
                            msg.date
                              ? msg.date.toLocaleString("en-US", {
                                  day: "numeric", // numeric, 2-digit
                                  year: "numeric", // numeric, 2-digit
                                  month: "long", // numeric, 2-digit, long, short, narrow
                                  hour: "numeric", // numeric, 2-digit
                                  minute: "numeric", // numeric, 2-digit
                                })
                              : ""
                          }
                          placement={"left"}
                        >
                          <Box display="flex" flexDirection="column">
                            {msg.reply && (
                              <Box>
                                <Typography
                                  align={"left"}
                                  {...TypographyProps}
                                  className={cx(
                                    classes.msg,
                                    classes[side],
                                    classes.msgReply,
                                    attachClass(i),
                                    TypographyProps.className
                                  )}
                                >
                                  {msg.reply.text}
                                </Typography>
                              </Box>
                            )}
                            <Typography
                              align={"left"}
                              {...TypographyProps}
                              className={cx(
                                classes.msg,
                                classes[side],
                                { [classes.sending]: !msg.date },
                                attachClass(i),
                                TypographyProps.className
                              )}
                            >
                              {msg.text}
                            </Typography>
                          </Box>
                        </Tooltip>
                      </Box>
                    </div>
                  </Grid>
                  <Grid
                    item
                    style={side === "left" ? { flexGrow: "1" } : {}}
                    className={classes.seen}
                  >
                    {seen?.messageId === msg.id && (
                      <Tooltip title={seen.lastSeen} aria-label={seen.lastSeen}>
                        <Avatar
                          src={seen.avatar}
                          className={classes.avatarSmall}
                        />
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        </Box>
      </Grid>
    );
  }
);

ChatMsg.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.object),
  side: PropTypes.oneOf(["left", "right"]),
  GridContainerProps: PropTypes.shape({}),
  GridItemProps: PropTypes.shape({}),
  AvatarProps: PropTypes.shape({}),
  getTypographyProps: PropTypes.func,
};
ChatMsg.defaultProps = {
  avatar: "",
  messages: [],
  side: "left",
  GridContainerProps: {},
  GridItemProps: {},
  AvatarProps: {},
  getTypographyProps: () => ({}),
};

export default ChatMsg;
