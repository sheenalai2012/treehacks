import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getToDoList, addToDoItem, deleteToDoItem } from "../../utils/firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';
import { Request } from "../Request/request";
import { Match } from "../Match/match";
import { Divider } from "@mui/material";


const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const [toDoItems, setToDoItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [refresh, setRefresh] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);

    useEffect(() => {
        if (!loading) {
            getToDoList(user.email).then((items) => setToDoItems(items));
        }
    }, [user, loading, newItem, refresh]);

    const handleAddNewItem = () => {
        addToDoItem(toDoItems, user.email, newItem);
        setNewItem("");
    };

    const handleDeleteItem = (deleteItem) => {
        deleteToDoItem(toDoItems, user.email, deleteItem);
        setRefresh(deleteItem);
    };

    const [selectedTab, setSelectedTab ] = useState('default');

    return (
        <div style={{margin: 50}}>
            <div style={{margin: 10}}>
<Button variant={selectedTab === 'default' ? 'contained': 'text'} onClick={() => setSelectedTab('default')} >Your request</Button>
<Button variant={selectedTab === 'matches' ? 'contained': 'text'} onClick={() => setSelectedTab('matches')}>Your matches</Button>
</div>
<Divider orientation='middle'/>
<div style={{margin: 50}}>
{selectedTab === 'default' && <Request/>}
{selectedTab === 'matches' && <Match/>}
        </div>
        </div>
    );
};

export default Home;