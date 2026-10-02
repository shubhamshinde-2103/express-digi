import express from 'express'

const app = express();
const port =3000;


app.use(express.json()); //any data coming up in json format we are accepting that

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas",(req,res) =>{
   const{name, price} = req.body
   const newTea = {id:nextId++,name,price}
   teaData.push(newTea)
   res.status(201).send(newTea)
})

// add a tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id=== parseInt(req.params.id))
    if(!tea){
        return res.status(400).send("tea not found")
    }
    res.status(200).send(tea)
})

// update tea
app.put("/teas/:id",(req,res)=>{
     const tea = teaData.find(t => t.id=== parseInt(req.params.id))
    if(!tea){
        return res.status(400).send("tea not found")
    }
    const {name,price} = req.body //what we want to update here name and price
    tea.name =name  
    tea.price = price
    res.status(200).send(tea)
})

// delete tea
app.delete("/teas/:id",(req,res)=>{
    const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(teaIndex === -1){
        return res.status(404).send("tea not found")
    }
    teaData.splice(teaIndex,1)
      return res.status(200).send("tea deleted")
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})

