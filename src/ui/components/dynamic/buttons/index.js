import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const GreenButton = withStyles({
    root: {
      backgroundColor: "#2B8000",
      textTransform: "none",
    },
  })(Button);

  const PurpleButton = withStyles({
    root: {
      backgroundColor: "#49166D",
      textTransform: "none",
    },
  })(Button);

export {
    GreenButton,
    PurpleButton
};