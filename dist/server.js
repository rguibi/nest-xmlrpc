var Odoo = require('odoo-xmlrpc');
var odoo = new Odoo({
    url: "localhost",
    port: 8071,
    db: "db_local",
    username: 'admin',
    password: 'admin'
});
odoo.connect(function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Connected to Odoo server.');
});
odoo.connect(function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push('read');
    inParams.push(false);
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'check_access_rights', params, function (err, value) {
        if (err) {
            return console.log(err);
        }
        console.log('Result: ', value);
    });
});
//# sourceMappingURL=server.js.map