var app = require('../express');
require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');

require('./services/widget.service.server');

app.get('/websites', sayHello);
function sayHello(req, res) {
    alert("fdf");
    res.send('hello');


}