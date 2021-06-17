import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    headerImg: {
        display: "none",
        height: "34px",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        }
    }
}));

const LogoComponent = () => {

    // material classes
    const classes = useStyles();
    const theme = useTheme();
    // react
    const [src, setSrc] = React.useState(theme.palette.type);
    const darkTheme = theme.palette.type;

    React.useEffect(() => {
        if (darkTheme === "dark") {
            setSrc("dark");
        } else {
            setSrc("light");
        }
    }, [darkTheme]);

    return(
        <img
            key={"image-icon"}
            className={classes.headerImg}
            alt={"title"}
            src={src === "dark" ? "/static/frontend/assets/images/CARDEDWHITE.png" : "/static/frontend/assets/images/CARDEDBLACK.png"}
        />
    );
};

export default LogoComponent;