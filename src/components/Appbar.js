import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../fonts/FiraSans-Regular.ttf';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        marginBottom: '20px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontFamily: 'Roboto',
        flexGrow: 1,
        margin: "5px",
    },
    headerImg: {
        padding: '10px',
        width: 175,
        height: 'auto',
    }
}));

export default function Appbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <a href="https://www.newegg.com/" title="Newegg.com" target="_blank" rel="noreferrer">
                        <img
                            className={classes.headerImg}
                            src="https://c1.neweggimages.com/webResource/Themes/Nest/logos/logo_424x210.png"
                            alt="Newegg"
                        />
                    </a>
                    <Typography variant="h4" className={classes.title}>
                        Wish List
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
