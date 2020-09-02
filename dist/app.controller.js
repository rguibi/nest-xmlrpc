"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
var Odoo = require('odoo-xmlrpc');
var odoo = new Odoo({
    url: "localhost",
    port: 8071,
    db: "db_local",
    username: 'rguibi.arjdal@gmail.com',
    password: 'admin'
});
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello("hi");
    }
    connect() {
        return new Promise((resolve, reject) => {
            const xmlData = {
                table: 'GroupAssign',
                limit: 1000,
                page: 0,
            };
            return odoo.connect((error, data) => {
                if (error) {
                    return reject(error);
                }
                data = { conn: true };
                return resolve(data);
            });
        });
    }
    checkacces() {
        return new Promise((resolve, reject) => {
            const xmlData = {
                table: 'GroupAssign',
                limit: 1000,
                page: 0,
            };
            odoo.connect(function (err) {
                if (err) {
                    return reject(err);
                }
                var inParams = [];
                inParams.push('read');
                inParams.push(false);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('res.partner', 'check_access_rights', params, function (err, value) {
                    if (err) {
                        return console.log(err);
                    }
                    resolve(value);
                });
            });
        });
    }
    get_partner() {
        return new Promise((resolve, reject) => {
            const xmlData = {
                table: 'GroupAssign',
                limit: 1000,
                page: 0,
            };
            odoo.connect(function (err) {
                if (err) {
                    return reject(err);
                }
                var inParams = [];
                inParams.push([]);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('res.partner', 'search_read', params, function (err, value) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(value);
                });
            });
        });
    }
    get_readpartner() {
        return new Promise((resolve, reject) => {
            const xmlData = {
                table: 'GroupAssign',
                limit: 1000,
                page: 0,
            };
            odoo.connect(function (err) {
                if (err) {
                    return reject(err);
                }
                var inParams = [];
                inParams.push([['is_company', '=', false], ['customer', '=', false]]);
                inParams.push(0);
                inParams.push(1);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('res.partner', 'search', params, function (err, value) {
                    if (err) {
                        return reject(err);
                    }
                    var inParams = [];
                    inParams.push(value);
                    var params = [];
                    params.push(inParams);
                    odoo.execute_kw('res.partner', 'read', params, function (err2, value2) {
                        if (err2) {
                            return reject(err2);
                        }
                        resolve(value2);
                    });
                });
            });
        });
    }
    create_partner(part) {
        return new Promise((resolve, reject) => {
            const xmlData = {
                table: 'GroupAssign',
                limit: 1000,
                page: 0,
            };
            odoo.connect(function (err) {
                if (err) {
                    reject(err);
                }
                var inParams = [];
                inParams.push(part);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('res.partner', 'create', params, function (err, value) {
                    if (err) {
                        reject(err);
                    }
                    resolve(value);
                });
            });
        });
    }
    update_partner(id, part) {
        return new Promise((resolve, reject) => {
            const xmlData = {
                table: 'GroupAssign',
                limit: 1000,
                page: 0,
            };
            odoo.connect(function (err) {
                if (err) {
                    return reject(err);
                }
                var inParams = [];
                inParams.push(Number(id));
                inParams.push(part);
                var params = [];
                params.push(inParams);
                odoo.execute_kw('res.partner', 'write', params, function (err, value) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(value);
                });
            });
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('/connect'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "connect", null);
__decorate([
    common_1.Get('/check_access_rights'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "checkacces", null);
__decorate([
    common_1.Get('/partner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "get_partner", null);
__decorate([
    common_1.Get('/read_partner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "get_readpartner", null);
__decorate([
    common_1.Post('/create_partner'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "create_partner", null);
__decorate([
    common_1.Put('/update_partner/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "update_partner", null);
AppController = __decorate([
    common_1.Controller('odoo'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map