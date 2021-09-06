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
    date,
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
              // eslint-disable-next-line react/no-array-index-key
              <div key={msg.id || i} className={classes[`${side}Row`]}>
                <Tooltip
                  title={date.toLocaleString("en-US", {
                    day: "numeric", // numeric, 2-digit
                    year: "numeric", // numeric, 2-digit
                    month: "long", // numeric, 2-digit, long, short, narrow
                    hour: "numeric", // numeric, 2-digit
                    minute: "numeric", // numeric, 2-digit
                  })}
                  placement={side}
                >
                  <Typography
                    align={"left"}
                    {...TypographyProps}
                    className={cx(
                      classes.msg,
                      classes[side],
                      attachClass(i),
                      TypographyProps.className
                    )}
                  >
                    {msg}
                  </Typography>
                </Tooltip>
              </div>
            );
          })}
        </Grid>
      </Grid>
    );
  }
);

ChatMsg.propTypes = {
  avatar: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
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
