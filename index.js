const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

// GET /productA/id
app.get('/productA/:id', (req, res) => {
    // req.params.id will be set based on the `:id` in the route
    //return req.params.id;
    if(isNaN(req.params.id)){
        throw new Error('Value must be Numeric');
    }
    const rate = Number(req.params.id);
    const base = 12 * 5;
    const annualRate =   rate * 22; //At 22cents/Kwh
    const dollarRate = annualRate/100; //convert a rate
    const payRate = base + dollarRate;
    const result ={
        ProductType : 'Product A',
        ProductDesc : 'basic electricity tariff',
        payRate : payRate
    }
    res.send(result);
});

// GET /productB/id
app.get('/productB/:id', (req, res) => {
    // req.params.id will be set based on the `:id` in the route
    //return req.params.id;
    if(isNaN(req.params.id)){
        throw new Error('Value must be Numeric');
    }
    const rate = Number(req.params.id);
    const base = 800;
    let result ={};
    if(rate<=4000){
        result ={
            ProductType : 'Product B',
            ProductDesc : 'Packaged tariff',
            payRate : base
        }
    }else{
        const annualRate =   (rate-4000) * 30; //At 30cents/Kwh
        const dollarRate = annualRate/100; //convert $ rate
        const payRate = base + dollarRate;
        result ={
            ProductType : 'Product A',
            ProductDesc : 'basic electricity tariff',
            payRate : payRate
        }
    }  
    res.send(result);
});

app.get('/', (req, res) => {        
    res.sendFile('index.html', {root: __dirname});      
                                                        
});

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});