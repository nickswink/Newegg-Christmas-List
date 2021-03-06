import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AvatarListItem from './AvatarListItem';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { animateScroll } from "react-scroll";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    formControl: {
        display: 'flex',
        justifyContent: 'center',
        margin: "auto",
        minWidth: 120,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    extendedIcon: {
        margin: '10px',
        marginRight: theme.spacing(1),
    },
    totalPrice: {
        display: "flex",
        justifyContent: "flex-end",
        fontWeight: "normal",
    }
}));

const scrollToBottom = function () {
    animateScroll.scrollToBottom({
        containerId: "options-holder"
    });
};

export default function AvatarList() {
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [items, setItems] = useState(JSON.parse((localStorage.getItem('itemList'))) || []);
    const inputUrlRef = useRef(null);
    // ref for input focus
    // Persistant item list via local storage
    useEffect(() => {
        localStorage.setItem('itemList', JSON.stringify(items));
    }, [items]);

    // add new fetched item to list
    const addItem = (itemDetails) => {
        const newItems = [...items, itemDetails];
        setItems(newItems);
        scrollToBottom();
    };

    // fetch data and call addItem to add item details
    let handleSubmit = async (e) => {

        e.preventDefault();
        // error handling
        if (url === '') {
            inputUrlRef.current.focus();
        }
        else if (url.substr(0, 23) !== 'https://www.newegg.com/') {
            alert('URL is not from newegg');
            setUrl('');
            inputUrlRef.current.focus();
        }
        // fetch data
        else {
            try {
                const result = await axios(
                    `http://54.81.156.32:5000/api/resources/products?url=${url}`,
                );
                addItem(result.data[0]);
                setUrl('');
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
        setItems(updatedItems);
    };

    // Keep track of the total price
    const totalPrice = items.reduce((priceTotal, item) => priceTotal + (item.productPrice * item.productQuantity), 0);

    return (
        <div className={classes.root}>
            <form className={classes.formControl} onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    inputRef={inputUrlRef}
                    label="Newegg Product Url"
                    variant="outlined"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    <AddIcon className={classes.extendedIcon} />
                </Button>
            </form>

            <List className={classes.center}>
                {(items.length < 1) ? <div>Your cart is empty...</div>
                    :
                    (items.map((item, index) => (
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
                    )))
                }
            </List>
            <h2 className={classes.totalPrice}>Est. Total: ${totalPrice.toFixed(2)}</h2>
        </div >
    );
};