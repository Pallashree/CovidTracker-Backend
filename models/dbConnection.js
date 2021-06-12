const mongoose = require('mongoose');

const { connection_url } = require('../helpers/dbConfig');

mongoose.connect(connection_url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if(err) {
      console.log("MongoDB connection Error!", err);
    }
    else {
      console.log("MongoDB connection Established!");
    }
    
});