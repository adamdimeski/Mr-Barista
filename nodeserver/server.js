const express = require('express')
const bodyParser = require("body-parser");
var sys = require('util')
var exec = require('child_process').exec;
var shell = require('shelljs');
var child;
const app = express()
const port = 80
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());



app.post('/command', function (req, res) {
  console.log(req.body.queryResult.parameters.drink);
  switch(req.body.queryResult.parameters.drink)
  {
    case "espresso":
      run_command("FA:04");
      break;
    case "coffee":
      run_command("FA:05");
      break;
    case "piccolo":
      run_command("FA:06");
      break;
    case "water":
      run_command("FA:07");
      break;
    case "cappuccino":
      run_command("FA:08");
      break;
    case "machiatto":
      run_command("FA:09");
      break;
    case "flatwhite":
      run_command("FA:0A");
      break;
    case "milk":
      run_command("FA:0B");
      break;
    case "apple":
      stub = ". This is a stub. No coffee will be made"
      break;
  }
  return res.json({
"fulfillmentText": "Your coffee is being made" + stub,
});
stub = "";

})

function run_command(current_command)
{
    console.log("inside function")
    const exec = require('child_process').exec;
var yourscript = exec('perl /home/pi/coffeehack/cmd2jura.pl ' + current_command,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    console.log("after run command")
}



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

