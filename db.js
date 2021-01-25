var mongoose = require('mongoose')
const bodyParser = require('body-parser')

//MongoDB
var mongo_uri = "mongodb+srv://admin:NLA5r1R201x0BeNO@cluster0.fydm8.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

