"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./utils/server");
var db_1 = __importDefault(require("./utils/db"));
// Entry point for our app.
db_1.default.open()
    .then(function () { return server_1.createServer(); })
    .then(function (server) {
    server.listen(8081, function () {
        console.log('[server] Server running at http://localhost:8081');
    });
})
    .catch(function (err) {
    console.log("[App] Error encountered: " + err);
});
