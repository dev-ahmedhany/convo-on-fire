import React from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import { Avatar, Tooltip, Typography, Grid } from "@material-ui/core";

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
      <Grid
        container
        justifyContent={side === "right" ? "flex-end" : "flex-start"}
        {...GridContainerProps}
      >
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
        <Grid item xs={8}>
          {messages.map((msg, i) => {
            const TypographyProps = getTypographyProps(msg, i);
            return (
              <div key={msg.id} className={classes[`${side}Row`]}>
                <Tooltip
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
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          style={side === "left" ? { flexGrow: "1" } : {}}
          className={classes.seen}
        >
          {seen && (
            <Tooltip title={name} aria-label={name}>
              <Avatar src={avatar} className={classes.avatarSmall} />
            </Tooltip>
          )}
        </Grid>
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
