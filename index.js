const express= require('express');
const app= express();
const mongoose=require('mongoose')
const cors = require('cors')
const path= require('path')
const user=require('./user/user')
const Users= require('./models/models')
const router = express.Router();

const url=`mongodb+srv://${user.name}:${user.password}@cluster0.r52rz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const port = process.env.PORT || 5000


mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(()=>console.log('mongodb is running'))
    .catch((err)=>console.log(err.message))


let usersArr=[];

router.post('/',(req,res) =>{
    const {name,email,contact,gender}=req.body;

    const user= new Users({
        name,email,contact,gender
    })
    user.save((err,result)=>{
        if(err){return err};
        res.send(result);
    })


})
router.get('/',(req,res)=>{
    Users.find((err,result)=>{
        if(err){return err};
        usersArr=result;
        res.send(usersArr);
    })

})

router.put('/:id',(req,res)=>{
    Users.updateOne({_id:req.params.id},req.body,(err,result)=>{
        if(err){return err};
        res.send(result)
    })

})

router.delete('/:id',(req,res)=>{
    Users.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){return err }
        res.send(result)
    })
})

app.use(express.json());
app.use(cors())

app.use('/api',router)

app.use(express.static("app/build"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"app","build","index.html"));
});

app.listen(port,()=>console.log('server is running on port '+port))

