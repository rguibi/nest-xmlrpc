import { Controller, Get, Post,Body, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { send } from 'process';
import { async, observable, Observable } from 'rxjs';
import { TIMEOUT } from 'dns';
var Odoo = require('odoo-xmlrpc');

var odoo = new Odoo({
  url: <host>,
  port: <port>,
  db: <base>,
  username: <login>,
  password: <password>
});


@Controller('odoo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello("hi");
  }

  @Get('/connect')
    connect(){
    
  return new Promise((resolve, reject) => {
    const xmlData = {
        table: 'GroupAssign',
        limit: 1000,
        page : 0,
    };

    return odoo.connect( (error, data) => {
        if (error) { return reject(error); }
        data={conn:true}
        return resolve(data);
    });
});


  }

  @Get('/check_access_rights')
  checkacces(){

    return new Promise((resolve, reject) => {
      const xmlData = {
          table: 'GroupAssign',
          limit: 1000,
          page : 0,
      };
    
        odoo.connect(function (err) {
          if (err) { return reject(err); }
          var inParams = [];
          inParams.push('read');
          inParams.push(false); //raise_exception
          var params = [];
          params.push(inParams);
          odoo.execute_kw('res.partner', 'check_access_rights', params, function (err, value) {
              if (err) { return console.log(err); }
              resolve(value);
          });
      });
    });
  }

  @Get('/partner')
  get_partner(){

    return new Promise((resolve, reject) => {
      const xmlData = {
          table: 'GroupAssign',
          limit: 1000,
          page : 0,
      };
    
      odoo.connect(function (err) {
        if (err) { return reject(err); }
        var inParams = [];
        inParams.push([]);
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'search_read', params, function (err, value) {
            if (err) { return reject(err); }
            //console.log(value);
            resolve(value);
        });
    });

    });
  }


  @Get('/read_partner')
  get_readpartner(){

    return new Promise((resolve, reject) => {
      const xmlData = {
          table: 'GroupAssign',
          limit: 1000,
          page : 0,
      };
    
      odoo.connect(function (err) {
        if (err) { return reject(err); }
        var inParams = [];
        inParams.push([['is_company', '=', false],['customer', '=', false]]);
        inParams.push(0);  //offset
        inParams.push(1);  //Limit
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'search', params, function (err, value) {
            if (err) { return reject(err); }
            var inParams = [];
            inParams.push(value); //ids
            var params = [];
            params.push(inParams);
            odoo.execute_kw('res.partner', 'read', params, function (err2, value2) {
                if (err2) { return reject(err2); }
                resolve(value2);
            });
        });
    });

    });
  }


  @Post('/create_partner')
  create_partner(@Body() part){

    return new Promise((resolve, reject) => {
      const xmlData = {
          table: 'GroupAssign',
          limit: 1000,
          page : 0,
      };
    
      odoo.connect(function (err) {
        if (err) { reject(err); }
        var inParams = [];
        inParams.push(part)
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'create', params, function (err, value) {
            if (err) { reject(err); }
            resolve(value);
        });
    });

    });
  }


  @Put('/update_partner/:id')
  update_partner(@Param('id') id: string,@Body() part){

    return new Promise((resolve, reject) => {
      const xmlData = {
          table: 'GroupAssign',
          limit: 1000,
          page : 0,
      };
    
      odoo.connect(function (err) {
        if (err) { return reject(err); }
        var inParams = [];

        inParams.push(Number(id)); //id to update
        inParams.push(part)
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'write', params, function (err, value) {
            if (err) { return reject(err); }
            resolve(value);
        });
    });

    });
  }
  



}



