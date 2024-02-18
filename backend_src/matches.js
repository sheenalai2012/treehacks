
import { getMatches } from './firebase/firebase.utils.js';
import {getUserGeoLocation} from '../src/utils/utils.js';
import express from 'express';
const app = express();
const PORT = 3005; // Change to your desired port number

app.use(express.json());

app.post('/matches', async (req, res) => {
    try {
      const currentUser = req.body; // Assuming currentUser is sent in the request body
      // current location gets calculated here. it would be ".location"
      // to note, in req.body, currentUser.location would be set to an empty string "" prior to 
      // calculating it here 
      currentUser.location = await getUserGeoLocation();
      const matches = await getMatches(currentUser);
      res.status(200).json(matches);
    } catch (error) {
      console.error("Error getting matches:", error);
      res.status(500).send("Error getting matches");
    }
  });
  




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });