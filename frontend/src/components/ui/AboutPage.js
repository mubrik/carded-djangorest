import React from "react";
import {Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    rootMain: {
        minWidth: "40%",
        minHeight: "calc(97vh - 56px)",
        alignItems: "center",
        background: `linear-gradient(
            180deg,
            ${theme.palette.background.default} 52%,
            ${theme.palette.secondary.main}f5 300%)`,
        border: `1px solid ${theme.palette.secondary.light}`,
        borderRadius: "8px",
        margin: "0.5em 0.4em",
        padding: "0.8em 0.8em",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        overflowY:"auto"
    },
    rootSection: {
        display: "grid",
        justifyItems: "center",
        alignContent: "flex-start",
        padding: ".4em .5em",
        margin: ".2em .7em",
        boxShadow: `6px 5px 4px 1px ${theme.palette.secondary.main}4a`,
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "0.7em",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
    },
    rootTitle: {
        borderRadius: "0.2em",
        padding: ".4em .5em",
        margin: ".2em .7em",
        borderBottom: `1px solid ${theme.palette.secondary.dark}`,
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "1em 0.4em"
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1em 0.4em"
    }
}));


const AboutPage = () => {

    const classes = useStyles();

    return(
        <div className={classes.rootMain}>
            <div className={classes.rootTitle}>
                <Typography variant="h4" >
                Hi, Welcome to My Carded Webapp project
                </Typography>
            </div>
            <div className={classes.rootSection}>
                <Typography variant="h5" paragraph>
                Project Goal:
                </Typography>
                <div>   
                    <Typography variant="body2" paragraph>
                    My goal with this project is mainly about grasping the basics of REST APIs, futhering my Javasript knowledge, SPAs and RWAs.
                    </Typography>
                    <Typography variant="body2"paragraph>
                    I love learning by building and with a simple backend for CRUD operations, I was able to familiarize
                    and deepen my understanding of several development frameworks.
                    </Typography>
                </div>
            </div>
            
            <div className={classes.rootSection}>
                <Typography variant="h5" paragraph>
                Project Details:
                </Typography>
                <div>
                    <Typography variant="body2" paragraph>
                    Funtionalities of this basic app incudes the
                    ability to take down notes (cards), grouping of cards by deck, moving of cards in between different decks,
                    </Typography>
                    <Typography variant="body2" paragraph>
                    Basic user account creation, Password reset, Oauth by Google/Github, Profile Picture upload and other CRUD operations.
                    </Typography>
                </div>
            </div>
            
            <div className={classes.rootSection}>
                <Typography variant="h5" paragraph>
                Project Frameworks:
                </Typography>
                <div>
                    <Typography variant="body2" paragraph>
                    Languages: Python, Javasript, CSS-in-JS.
                    </Typography>
                    <Typography variant="body2" paragraph>
                    Backend: Django, Django-REST-frameworks, Allauth, Health checks.
                    </Typography>
                    <Typography variant="body2" paragraph>
                    Frontend: React for web, React-redux, React-router, MaterialUI, Notisstack, Axios, Formik, Babel, Webpack etc.
                    </Typography>
                    <Typography variant="body2" paragraph>
                    Hosting: AWS Beanstalk, AWS S3, AWS EC2, Google domains.
                    </Typography>
                </div>
            </div>
            
        </div>
    );
};

export default AboutPage;