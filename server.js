const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;	
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
    
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
  //generate computer choice
    let computerChoice = Math.floor(Math.random() * 3);
    switch (computerChoice) {
      case 0:
        computerChoice = "Rock";
        break;
      case 1:
        computerChoice = "Paper";
        break;
      case 2:
        computerChoice = "Scissors";
        break;
       }
       console.log(`The computer chose ${computerChoice}`);

      //get the user choice
       let userChoice;
       if("choice" in params) userChoice = params.choice;
       console.log(`The user chose ${userChoice}`);
  
       //see who wins
       let result = "";
       if (userChoice === "rock") {
         if(computerChoice === "paper") result = "Computer Wins!";
         else if (computerChoice === "scissors" )result = "User Wins!";
         else result = "It's a draw!";
       } else if (userChoice === "paper") {
         if(computerChoice === "scissors") result = "Computer Wins!";
        else if (computerChoice === "rock") result = "User Wins!";
         else result = "It's a draw!";
       } else if (userChoice === "scissors")  {
         if (computerChoice === "rock") result = "Computer Wins!";
         else if (computerChoice === "paper") result = "User Wins!";
         else result = "It's a draw!";
       }
     
        // send back winner
     res.writeHead(200, {'Content-Type': 'application/json'});
     const objToJson = {
       winner: `${result}`, 
       computerChoice: `${computerChoice}`
     }
     res.end(JSON.stringify(objToJson));
    }  //else if
    else if (page == '/css/style.css'){
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
    }
    else if (page == '/js/main.js'){
     fs.readFile('js/main.js', function(err, data) {
       res.writeHead(200, {'Content-Type': 'text/javascript'});
       res.write(data);
       res.end();
     });
  }
    else{
    figlet('404!!', function(err, data) {
      if (err) {
           console.log('Something went wrong...');
           console.dir(err);
           return;
      }
    res.write(data);
    res.end();
    });
  }
});

server.listen(8000);