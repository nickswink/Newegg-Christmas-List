import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AvatarListItem from './AvatarListItem';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    formControl: {
        margin: theme.spacing(1),
        marginBottom: '50px',
        minWidth: 120,
    },
    extendedIcon: {
        margin: '10px',
        marginRight: theme.spacing(1),
    },
}));

export default function AvatarList() {
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [items, setItems] = useState(JSON.parse((localStorage.getItem('itemList'))) || []);

    // Persistant item list via local storage
    useEffect(() => {
        localStorage.setItem('itemList', JSON.stringify(items));
    }, [items]);

    // add new fetched item to list
    const addItem = (itemDetails) => {
        const newItems = [...items, itemDetails];
        setItems(newItems);
    };

    // fetch data and call addItem to add item details
    let handleSubmit = async (e) => {
        e.preventDefault();
        if (url === '') {
            alert('Fill out url');
        }
        if (url.substr(0, 23) !== 'https://www.newegg.com/') {
            alert('URL is not from newegg');
        }
        else {
            try {
                const result = await axios(
                    `http://127.0.0.1:5000/api/resources/products?url=${url}`,
                );
                addItem(result.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    // remove items from list
    let removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    // update quantity state in items from child AvatarListItem
    let quantityCallBack = (index, quantity) => {
        let updatedItems = [...items];
        updatedItems[index].productQuantity = quantity;
        console.log(updatedItems[index]);
        setItems(updatedItems);
    };

    return (
        <div className={classes.root}>
            <form className={classes.formControl} onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="Newegg Product Url" variant="outlined" name='newItem' onChange={e => setUrl(e.target.value)} value={url} />
                <Button variant="contained" color="primary" type="submit">
                    <AddIcon className={classes.extendedIcon} />
                </Button>
            </form>
            <h2>Total: </h2>

            <List >
                {items.map((item, index) => (
                    <>
                        <AvatarListItem
                            itemDetails={item}
                            key={index}
                            index={index}
                            removeItem={removeItem}
                            quantityCallBack={quantityCallBack}
                        />
                        <Divider variant="middle" component="li" />
                    </>
                ))}
            </List>
        </div >
    );
}