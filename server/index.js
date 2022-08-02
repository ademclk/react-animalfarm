import express from "express";
import cors from "cors";

// Initialize express
const app = express();
app.use(cors());
app.use(express.json());

import Chance from "chance";
const chance = new Chance();

const animals = [...Array(250).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        name: chance.name(),
        age: chance.age(),
    }
});

// Endpoint to search for animals
app.get('', (req,res) =>{
    // Filter results based on query
    const q = req.query.q?.toLowerCase() || '';
    const results = animals.filter(animal => animal.name.toLowerCase().includes(q));
    res.json(results);
}
);

app.listen(8080, () => console.log("Server started on port 8080"));