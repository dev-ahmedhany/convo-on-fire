import React from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import { Avatar, Tooltip, Typography, Grid, Box } from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";

const ChatMsg = withStyles(styles, { name: "ChatMsg" })(
  ({
    classes,
    avatar,
    seen,
    name,
    messages,
    side,
    GridContainerProps,
    GridItemProps,
    AvatarProps,
    getTypographyProps,
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
                          <ReplyIcon></ReplyIcon>
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
                          <Typography
                            align={"left"}
                            {...TypographyProps}
                            className={cx(
                              classes.msg,
                              classes[`${side}${msg.date ? "" : "Sending"}`],
                              attachClass(i),
                              TypographyProps.className
                            )}
                          >
                            {msg.text}
                          </Typography>
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
