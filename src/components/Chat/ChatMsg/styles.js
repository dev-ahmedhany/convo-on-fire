import { lighten } from "@mui/material/styles";

export const styles = ({ palette, spacing }) => {
  const radius = spacing(2.5);
  const size = spacing(4);
  const rightBgColor = palette.primary.main;
  // if you want the same as facebook messenger, use this color '#09f'
  return {
    avatar: {
      width: size,
      height: size,
    },
    avatarSmall: {
      width: "14px",
      height: "14px",
    },
    seen: {
      width: "20px",
      alignSelf: "flex-end",
      direction: "rtl",
    },
    reply: {
      color: palette.common.white,
      "&:hover": {
        color: palette.grey[600],
      },
    },
    leftRow: {
      textAlign: "left",
    },
    rightRow: {
      textAlign: "right",
    },
    msg: {
      padding: spacing(1, 2),
      borderRadius: 4,
      marginBottom: 4,
      display: "inline-block",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: "14px",
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: lighten(rightBgColor, 0.8),
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: rightBgColor,
      color: palette.common.white,
    },
    sending: {
      backgroundColor: lighten(rightBgColor, 0.5),
    },
    msgReply: {
      backgroundColor: lighten(rightBgColor, 0.9),
      marginBottom: "-10px",
      fontSize: "13px",
      color: palette.text.primary,
    },
    leftFirst: {
      borderTopLeftRadius: radius,
    },
    leftLast: {
      borderBottomLeftRadius: radius,
    },
    rightFirst: {
      borderTopRightRadius: radius,
    },
    rightLast: {
      borderBottomRightRadius: radius,
    },
  };
};
