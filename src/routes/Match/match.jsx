import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

const MatchCard = ({match}) => {
    const {name, phoneNumber, price, foodCategories, distance} = match;

    return  <div style={{margin: 20, display: 'flex', justifyContent:'center'}}> <Box sx={{ width: 275 }} >
    <Card variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {name}
      </Typography>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{margin: 5}}>
      <Chip label={price} size="xs" /> 
      </div>
      <Typography variant="body2">
       {foodCategories}
      </Typography>
      </div>
      <Typography variant="caption">{`Distance: ${distance} miles`}
      </Typography>
      <br/>
      <Typography variant="caption">{`Phone: ${phoneNumber}`}
      </Typography>
    </CardContent>
   
    </Card>
  </Box>
  </div>


}

export const Match = ({}) => {
    const matches = [{name: 'Jane Smith', phoneNumber: '123456789', price: '$$$', foodCategories: ['Big meal'], distance: 1},
    {name: 'Lebron James', phoneNumber: '123456789', price: '$$$', foodCategories: ['Big meal, drink'], distance: 3},
    {name: 'Susan B Anthony', phoneNumber: '123456789', price: '$$$', foodCategories: ['Big meal, drink'], distance: 8},
]
   return  <div>
    <Typography>Your potential matches</Typography>
    {matches.map((match) => 
        <MatchCard match={match}/>
    )}
   </div>;
}