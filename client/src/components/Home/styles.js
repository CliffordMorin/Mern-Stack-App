import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backGroundColor: "#efefef",
  },
  heading: {
    color: "#55133B",
    fontWeight: "400",
    textTransform: "lowercase",
  },
  image: {
    marginLeft: "15px",
  },
  formControl: {
    margin: "20px",
    width: "90%",
  },
  //adds media queries using material UI, to change the form to the top of the screen on mobile
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
