import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    root: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        border: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: `8px 7px 4px 1px ${theme.palette.secondary.main}4a`,
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 78%,
            ${theme.palette.secondary.light}f5 220%)`,
        borderRadius: "0.5em",
        padding: theme.spacing(1)
    },
    buttonForm: {
        margin: theme.spacing(1),
    },
    buttonWrapper: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        margin: theme.spacing(1),
        position: "relative",
    },
    signupButtonWrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: "absolute",
        top: "24px",
        left: "32px",
        marginTop: -8,
        marginLeft: -8,
        zIndex: 1
    },
}));

export default useStyles;