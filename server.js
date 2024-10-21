const express = require('express')

const app = express()

// 1. Be Polite, Greet the User
//  Create a route that responds to URLs like /greetings/<username-parameter>.
app.get('/home/:name', (req, res)=>{
  res.send(`hello ${req.params.name}! We are contacting you about your car's extended warranty`)
})



// 2. Rolling the Dice
// Set up a route to handle URLs following the pattern /roll/<number-parameter>.
app.get('/roll/:number', (req, res)=>{
  let numToCheck = require('validator')
  const num = req.params.number

  if(!numToCheck.isNumeric(num)){
    res.send('You must specify a number');
  }
  else{
    // used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random for reference
    let numToSend = Math.floor(Math.random() * num)
    res.send(`your number is ${numToSend}`)
  }
})



// 3. I Want THAT One!
// Create a route for URLs like /collectibles/<index-parameter>
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res)=>{
  const index = req.params.index
  
  if(index>=collectibles.length){
    res.send('This item is not yet in stock. Check back soon!');
  }
  else{
    let name= collectibles[index].name
    let price= collectibles[index].price
    res.send(`So, you want the ${name} For ${price}, it can be yours!`)
  }
})


app.listen(3000, () => {
  console.log('listening on port: 3000');
})