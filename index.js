const express= require('express');
const app= express();
const mongoose=require('mongoose')
const cors = require('cors')
const user=require('./user/user')
const Users= require('./models/models')
const router = express.Router();

const url=`mongodb://${user.name}:${user.password}@ds113815.mlab.com:13815/new_database`
const port = process.env.PORT || 5000


mongoose
.connect(url)
.then(()=>console.log('mlab is running'))
.catch((err)=>console.log(err.message))


let usersArr=[];

router.post('/',(req,res) =>{
    const {name,email,contact,gender}=req.body;

    const user= new Users({
        name,email,contact,gender
    })
    user.save((err,result)=>{
        if(err){return err} ;
         res.send(result);  
    })
    

})
router.get('/',(req,res)=>{
    Users.find((err,result)=>{
        if(err){return err} ;
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
        if(err){return err} 
        res.send(result)
    })
})

app.use(express.json());
app.use(cors())

app.use('/api',router)

if (process.env.NODE_ENV === "production") {
app.use(express.static("app/build"));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "app", "build", "index.html"));
  });
}

app.listen(port,()=>console.log('server is running on port '+port))

