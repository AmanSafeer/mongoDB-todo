export default (id, reqMethod,obj)=>{
    if(id){
    var url=`/api/${id}`
    }
    else{
      var url=`/api`
    }
    const options = {
      method:reqMethod,
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    };

    return new Promise((resolve,reject)=>{
        fetch(url,options)
        .then((res)=> res.json())
        .then((data)=> resolve(data))
        .catch((err)=>reject(err) )
    })
}