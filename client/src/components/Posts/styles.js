import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
  progress: {
    position: "absolute",
    top: "35%",
    left: "30%",
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      top: "75%",
      left: "25%",
    },
  },
}));
