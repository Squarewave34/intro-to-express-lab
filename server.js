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
// Should describe the item at the given index, like “So, you want the shiny ball? For 5.95,
// it can be yours!” Include both the name and price properties.

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


// Task: Create a route /shoes that filters the list of shoes based on query parameters.

// Query Parameters:

// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/shoes', (req, res) => {

  // if(req.query.minPrice){
    
  //   let filteredShoes = shoes.filter((shoe)=>{
  //     return shoe.price>req.query.minPrice 
  //   })

  //   let shoesToSend = filteredShoes.map((shoe)=>{
  //     return `a(n) ${shoe.name}, that costs ${shoe.price}, and it's type is ${shoe.type}`
  //   })

  //   res.send(shoesToSend)

  // }

  // else if(req.query.maxPrice){

  //   let filteredShoes = shoes.filter((shoe)=>{
  //     return shoe.price<req.query.maxPrice 
  //   })

  //   let shoesToSend = filteredShoes.map((shoe)=>{
  //     return `a(n) ${shoe.name}, that costs ${shoe.price}, and it's type is ${shoe.type}`
  //   })

  //   res.send(shoesToSend)

  // }

  // else if(req.query.type){
  //   let filteredShoes = shoes.filter((shoe)=>{
  //     return shoe.type===req.query.type 
  //   })

  //   let shoesToSend = filteredShoes.map((shoe)=>{
  //     return `a(n) ${shoe.name}, that costs ${shoe.price}, and it's type is ${shoe.type}`
  //   })

  //   res.send(shoesToSend)
  // }

  // else{
  //   let shoesToSend = shoes.map((shoe)=>{
  //     return `a(n) ${shoe.name}, that costs ${shoe.price}, and it's type is ${shoe.type}`
  //   })

  //   res.send(shoesToSend)
  // }

  let shoesToSend = shoes

  if(req.query.minPrice){
    shoesToSend = shoesToSend.filter((shoe)=>{
      return shoe.price>req.query.minPrice
    })
  }

  if(req.query.maxPrice){
    shoesToSend = shoesToSend.filter((shoe)=>{
      return shoe.price<req.query.maxPrice
    })
  }

  if(req.query.type){
    shoesToSend = shoesToSend.filter((shoe)=>{
      return shoe.type===req.query.type
    })
  }

  shoesToSend = shoesToSend.map((shoe)=>{
    return `${shoe.name} that cost ${shoe.price} of type ${shoe.type}`
  })

  res.send(shoesToSend)
})

app.listen(3000, () => {
  console.log('listening on port: 3000');
})