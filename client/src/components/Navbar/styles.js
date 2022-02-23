import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  heading: {
    color: "#55133B",
    fontWeight: "400",
    textTransform: "lowercase",
    textDecoration: "none",
    fontSize: 100,
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    fontSize: "25px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: "70px",
    height: "70px",
  },
  [theme.breakpoints.down("sm")]: {
    heading: {
      fontSize: 26,
      fontWeight: "600",
    },
    userName: {
      fontSize: 11,
    },
    image: {
      maxWidth: 25,
      maxHeight: 25,
      marginLeft: "5px",
      marginRight: "5px",
    },
    toolbar: {
      width: "165px",
      paddingLeft: "7px",
    },

    purple: {
      maxWidth: "32px",
      maxHeight: "32px",
    },
  },
}));
