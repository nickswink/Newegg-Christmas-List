import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(() => ({
    inline: {
        display: 'inline',
        '& p': {
            color: 'green',
        }
    },
    items: {
        display: 'flex',
        alignItems: "flex-start",
        textOverflow: 'wrap',
        marginBottom: '15px',

    },
    paper: {
        width: 400,
        display: 'flex',
        margin: '10px',
    },
    delete: {
        minWidth: 50,
        minHeight: 50,
        size: 'medium',
    },
}));

const AvatarListItem = ({ removeItem, index, itemDetails: { itemName, price, availability } }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <ListItem className={classes.items}>
                <ListItemText
                    primary={itemName}
                    secondary={
                        <React.Fragment>
                            Price:
                            <Typography
                                component="p"
                                variant="body2"
                                className={classes.inline}
                                color='error'
                            >
                                ${price}
                                <Typography component="p">
                                    {availability}
                                </Typography>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Fab className={classes.delete} color="secondary" aria-label="delete" size="medium" onClick={() => removeItem(index)}>
                <DeleteIcon />
            </Fab>
        </Paper>
    );
};

export default AvatarListItem;