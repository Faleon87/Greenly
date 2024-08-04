"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var pregunta_1 = require("../../chat/entities/pregunta");
var foto_preguntas_1 = require("../../chat/entities/foto-preguntas");
var likes_1 = require("src/chat/entities/likes");
var respuestas_1 = require("src/chat/entities/respuestas");
var carrito_1 = require("src/carrito/entities/carrito");
var tarjeta_1 = require("src/tarjeta/entities/tarjeta");
var User = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('user')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idUser_decorators;
    var _idUser_initializers = [];
    var _idUser_extraInitializers = [];
    var _nombre_decorators;
    var _nombre_initializers = [];
    var _nombre_extraInitializers = [];
    var _username_decorators;
    var _username_initializers = [];
    var _username_extraInitializers = [];
    var _apellido_decorators;
    var _apellido_initializers = [];
    var _apellido_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _img_decorators;
    var _img_initializers = [];
    var _img_extraInitializers = [];
    var _preguntas_decorators;
    var _preguntas_initializers = [];
    var _preguntas_extraInitializers = [];
    var _fotosPreguntas_decorators;
    var _fotosPreguntas_initializers = [];
    var _fotosPreguntas_extraInitializers = [];
    var _likes_decorators;
    var _likes_initializers = [];
    var _likes_extraInitializers = [];
    var _respuestas_decorators;
    var _respuestas_initializers = [];
    var _respuestas_extraInitializers = [];
    var _carrito_decorators;
    var _carrito_initializers = [];
    var _carrito_extraInitializers = [];
    var _tarjeta_decorators;
    var _tarjeta_initializers = [];
    var _tarjeta_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.idUser = __runInitializers(this, _idUser_initializers, void 0);
            this.nombre = (__runInitializers(this, _idUser_extraInitializers), __runInitializers(this, _nombre_initializers, void 0));
            this.username = (__runInitializers(this, _nombre_extraInitializers), __runInitializers(this, _username_initializers, void 0));
            this.apellido = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _apellido_initializers, void 0));
            this.email = (__runInitializers(this, _apellido_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.img = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _img_initializers, void 0));
            this.preguntas = (__runInitializers(this, _img_extraInitializers), __runInitializers(this, _preguntas_initializers, void 0));
            this.fotosPreguntas = (__runInitializers(this, _preguntas_extraInitializers), __runInitializers(this, _fotosPreguntas_initializers, void 0));
            this.likes = (__runInitializers(this, _fotosPreguntas_extraInitializers), __runInitializers(this, _likes_initializers, void 0));
            this.respuestas = (__runInitializers(this, _likes_extraInitializers), __runInitializers(this, _respuestas_initializers, void 0));
            this.carrito = (__runInitializers(this, _respuestas_extraInitializers), __runInitializers(this, _carrito_initializers, void 0));
            this.tarjeta = (__runInitializers(this, _carrito_extraInitializers), __runInitializers(this, _tarjeta_initializers, void 0));
            __runInitializers(this, _tarjeta_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idUser_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nombre_decorators = [(0, typeorm_1.Column)()];
        _username_decorators = [(0, typeorm_1.Column)()];
        _apellido_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _email_decorators = [(0, typeorm_1.Column)()];
        _password_decorators = [(0, typeorm_1.Column)()];
        _img_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _preguntas_decorators = [(0, typeorm_1.OneToMany)(function () { return pregunta_1.Pregunta; }, function (pregunta) { return pregunta.idUsuario; })];
        _fotosPreguntas_decorators = [(0, typeorm_1.OneToMany)(function () { return foto_preguntas_1.FotoPreguntas; }, function (fotoPregunta) { return fotoPregunta.idUsuario; })];
        _likes_decorators = [(0, typeorm_1.OneToMany)(function () { return likes_1.Likes; }, function (likes) { return likes.idUsuario; })];
        _respuestas_decorators = [(0, typeorm_1.OneToMany)(function () { return respuestas_1.Respuestas; }, function (respuestas) { return respuestas.idUsuario; })];
        _carrito_decorators = [(0, typeorm_1.OneToMany)(function () { return carrito_1.Carrito; }, function (carrito) { return carrito.idUser; })];
        _tarjeta_decorators = [(0, typeorm_1.OneToMany)(function () { return tarjeta_1.Tarjeta; }, function (tarjeta) { return tarjeta.idUser; })];
        __esDecorate(null, null, _idUser_decorators, { kind: "field", name: "idUser", static: false, private: false, access: { has: function (obj) { return "idUser" in obj; }, get: function (obj) { return obj.idUser; }, set: function (obj, value) { obj.idUser = value; } }, metadata: _metadata }, _idUser_initializers, _idUser_extraInitializers);
        __esDecorate(null, null, _nombre_decorators, { kind: "field", name: "nombre", static: false, private: false, access: { has: function (obj) { return "nombre" in obj; }, get: function (obj) { return obj.nombre; }, set: function (obj, value) { obj.nombre = value; } }, metadata: _metadata }, _nombre_initializers, _nombre_extraInitializers);
        __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: function (obj) { return "username" in obj; }, get: function (obj) { return obj.username; }, set: function (obj, value) { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
        __esDecorate(null, null, _apellido_decorators, { kind: "field", name: "apellido", static: false, private: false, access: { has: function (obj) { return "apellido" in obj; }, get: function (obj) { return obj.apellido; }, set: function (obj, value) { obj.apellido = value; } }, metadata: _metadata }, _apellido_initializers, _apellido_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
        __esDecorate(null, null, _preguntas_decorators, { kind: "field", name: "preguntas", static: false, private: false, access: { has: function (obj) { return "preguntas" in obj; }, get: function (obj) { return obj.preguntas; }, set: function (obj, value) { obj.preguntas = value; } }, metadata: _metadata }, _preguntas_initializers, _preguntas_extraInitializers);
        __esDecorate(null, null, _fotosPreguntas_decorators, { kind: "field", name: "fotosPreguntas", static: false, private: false, access: { has: function (obj) { return "fotosPreguntas" in obj; }, get: function (obj) { return obj.fotosPreguntas; }, set: function (obj, value) { obj.fotosPreguntas = value; } }, metadata: _metadata }, _fotosPreguntas_initializers, _fotosPreguntas_extraInitializers);
        __esDecorate(null, null, _likes_decorators, { kind: "field", name: "likes", static: false, private: false, access: { has: function (obj) { return "likes" in obj; }, get: function (obj) { return obj.likes; }, set: function (obj, value) { obj.likes = value; } }, metadata: _metadata }, _likes_initializers, _likes_extraInitializers);
        __esDecorate(null, null, _respuestas_decorators, { kind: "field", name: "respuestas", static: false, private: false, access: { has: function (obj) { return "respuestas" in obj; }, get: function (obj) { return obj.respuestas; }, set: function (obj, value) { obj.respuestas = value; } }, metadata: _metadata }, _respuestas_initializers, _respuestas_extraInitializers);
        __esDecorate(null, null, _carrito_decorators, { kind: "field", name: "carrito", static: false, private: false, access: { has: function (obj) { return "carrito" in obj; }, get: function (obj) { return obj.carrito; }, set: function (obj, value) { obj.carrito = value; } }, metadata: _metadata }, _carrito_initializers, _carrito_extraInitializers);
        __esDecorate(null, null, _tarjeta_decorators, { kind: "field", name: "tarjeta", static: false, private: false, access: { has: function (obj) { return "tarjeta" in obj; }, get: function (obj) { return obj.tarjeta; }, set: function (obj, value) { obj.tarjeta = value; } }, metadata: _metadata }, _tarjeta_initializers, _tarjeta_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
