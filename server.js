const express = require("express");
const app = express();
const path = process.cwd();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.sendFile(path + '/public/index.html') 
});

// Conversion of Date and UnixTime
const manipulateDate = (date) => {
    if(!isNaN(date)) {
        var dateFull = new Date(date * 1000).toDateString();
        var unixTime = parseInt(date);
        dateFull = dateFull.split(' ');
        dateFull.shift();
        dateFull[1] = dateFull[1] + ','
        dateFull = dateFull.join(' ');
    } else {
        var dateFull = date;
        date[1] = date[1] + ','
        var unixTime = Date.parse(date) / 1000;
        console.log(unixTime);
    };
    const finalDate = {
        unixtime: unixTime,
        natural: dateFull
    };
    return finalDate;
};

app.get('/:date', (req, res) => {
    const date = manipulateDate(req.params.date);
    res.send(date); 
});

const port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});