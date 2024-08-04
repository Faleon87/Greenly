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
exports.Tarjeta = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("src/usuario/entities/user");
var Tarjeta = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('tarjeta')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idTarjeta_decorators;
    var _idTarjeta_initializers = [];
    var _idTarjeta_extraInitializers = [];
    var _numeroTarjeta_decorators;
    var _numeroTarjeta_initializers = [];
    var _numeroTarjeta_extraInitializers = [];
    var _nombre_decorators;
    var _nombre_initializers = [];
    var _nombre_extraInitializers = [];
    var _fechaVencimiento_decorators;
    var _fechaVencimiento_initializers = [];
    var _fechaVencimiento_extraInitializers = [];
    var _codigoSeguridad_decorators;
    var _codigoSeguridad_initializers = [];
    var _codigoSeguridad_extraInitializers = [];
    var _idUser_decorators;
    var _idUser_initializers = [];
    var _idUser_extraInitializers = [];
    var _cardhash_decorators;
    var _cardhash_initializers = [];
    var _cardhash_extraInitializers = [];
    var Tarjeta = _classThis = /** @class */ (function () {
        function Tarjeta_1() {
            this.idTarjeta = __runInitializers(this, _idTarjeta_initializers, void 0);
            this.numeroTarjeta = (__runInitializers(this, _idTarjeta_extraInitializers), __runInitializers(this, _numeroTarjeta_initializers, void 0));
            this.nombre = (__runInitializers(this, _numeroTarjeta_extraInitializers), __runInitializers(this, _nombre_initializers, void 0));
            this.fechaVencimiento = (__runInitializers(this, _nombre_extraInitializers), __runInitializers(this, _fechaVencimiento_initializers, void 0));
            this.codigoSeguridad = (__runInitializers(this, _fechaVencimiento_extraInitializers), __runInitializers(this, _codigoSeguridad_initializers, void 0));
            this.idUser = (__runInitializers(this, _codigoSeguridad_extraInitializers), __runInitializers(this, _idUser_initializers, void 0));
            this.cardhash = (__runInitializers(this, _idUser_extraInitializers), __runInitializers(this, _cardhash_initializers, void 0));
            __runInitializers(this, _cardhash_extraInitializers);
        }
        return Tarjeta_1;
    }());
    __setFunctionName(_classThis, "Tarjeta");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idTarjeta_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _numeroTarjeta_decorators = [(0, typeorm_1.Column)()];
        _nombre_decorators = [(0, typeorm_1.Column)()];
        _fechaVencimiento_decorators = [(0, typeorm_1.Column)()];
        _codigoSeguridad_decorators = [(0, typeorm_1.Column)()];
        _idUser_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.tarjeta; }), (0, typeorm_1.JoinColumn)({ name: 'idUser' })];
        _cardhash_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _idTarjeta_decorators, { kind: "field", name: "idTarjeta", static: false, private: false, access: { has: function (obj) { return "idTarjeta" in obj; }, get: function (obj) { return obj.idTarjeta; }, set: function (obj, value) { obj.idTarjeta = value; } }, metadata: _metadata }, _idTarjeta_initializers, _idTarjeta_extraInitializers);
        __esDecorate(null, null, _numeroTarjeta_decorators, { kind: "field", name: "numeroTarjeta", static: false, private: false, access: { has: function (obj) { return "numeroTarjeta" in obj; }, get: function (obj) { return obj.numeroTarjeta; }, set: function (obj, value) { obj.numeroTarjeta = value; } }, metadata: _metadata }, _numeroTarjeta_initializers, _numeroTarjeta_extraInitializers);
        __esDecorate(null, null, _nombre_decorators, { kind: "field", name: "nombre", static: false, private: false, access: { has: function (obj) { return "nombre" in obj; }, get: function (obj) { return obj.nombre; }, set: function (obj, value) { obj.nombre = value; } }, metadata: _metadata }, _nombre_initializers, _nombre_extraInitializers);
        __esDecorate(null, null, _fechaVencimiento_decorators, { kind: "field", name: "fechaVencimiento", static: false, private: false, access: { has: function (obj) { return "fechaVencimiento" in obj; }, get: function (obj) { return obj.fechaVencimiento; }, set: function (obj, value) { obj.fechaVencimiento = value; } }, metadata: _metadata }, _fechaVencimiento_initializers, _fechaVencimiento_extraInitializers);
        __esDecorate(null, null, _codigoSeguridad_decorators, { kind: "field", name: "codigoSeguridad", static: false, private: false, access: { has: function (obj) { return "codigoSeguridad" in obj; }, get: function (obj) { return obj.codigoSeguridad; }, set: function (obj, value) { obj.codigoSeguridad = value; } }, metadata: _metadata }, _codigoSeguridad_initializers, _codigoSeguridad_extraInitializers);
        __esDecorate(null, null, _idUser_decorators, { kind: "field", name: "idUser", static: false, private: false, access: { has: function (obj) { return "idUser" in obj; }, get: function (obj) { return obj.idUser; }, set: function (obj, value) { obj.idUser = value; } }, metadata: _metadata }, _idUser_initializers, _idUser_extraInitializers);
        __esDecorate(null, null, _cardhash_decorators, { kind: "field", name: "cardhash", static: false, private: false, access: { has: function (obj) { return "cardhash" in obj; }, get: function (obj) { return obj.cardhash; }, set: function (obj, value) { obj.cardhash = value; } }, metadata: _metadata }, _cardhash_initializers, _cardhash_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tarjeta = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tarjeta = _classThis;
}();
exports.Tarjeta = Tarjeta;
