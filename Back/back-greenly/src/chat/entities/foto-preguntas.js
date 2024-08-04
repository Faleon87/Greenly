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
exports.FotoPreguntas = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("../../usuario/entities/user");
var FotoPreguntas = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('fotopregunta')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idFotoPregunta_decorators;
    var _idFotoPregunta_initializers = [];
    var _idFotoPregunta_extraInitializers = [];
    var _nombreFoto_decorators;
    var _nombreFoto_initializers = [];
    var _nombreFoto_extraInitializers = [];
    var _idUsuario_decorators;
    var _idUsuario_initializers = [];
    var _idUsuario_extraInitializers = [];
    var FotoPreguntas = _classThis = /** @class */ (function () {
        function FotoPreguntas_1() {
            this.idFotoPregunta = __runInitializers(this, _idFotoPregunta_initializers, void 0);
            this.nombreFoto = (__runInitializers(this, _idFotoPregunta_extraInitializers), __runInitializers(this, _nombreFoto_initializers, void 0));
            this.idUsuario = (__runInitializers(this, _nombreFoto_extraInitializers), __runInitializers(this, _idUsuario_initializers, void 0));
            __runInitializers(this, _idUsuario_extraInitializers);
        }
        return FotoPreguntas_1;
    }());
    __setFunctionName(_classThis, "FotoPreguntas");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idFotoPregunta_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nombreFoto_decorators = [(0, typeorm_1.Column)({ length: 255 })];
        _idUsuario_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.fotosPreguntas; })];
        __esDecorate(null, null, _idFotoPregunta_decorators, { kind: "field", name: "idFotoPregunta", static: false, private: false, access: { has: function (obj) { return "idFotoPregunta" in obj; }, get: function (obj) { return obj.idFotoPregunta; }, set: function (obj, value) { obj.idFotoPregunta = value; } }, metadata: _metadata }, _idFotoPregunta_initializers, _idFotoPregunta_extraInitializers);
        __esDecorate(null, null, _nombreFoto_decorators, { kind: "field", name: "nombreFoto", static: false, private: false, access: { has: function (obj) { return "nombreFoto" in obj; }, get: function (obj) { return obj.nombreFoto; }, set: function (obj, value) { obj.nombreFoto = value; } }, metadata: _metadata }, _nombreFoto_initializers, _nombreFoto_extraInitializers);
        __esDecorate(null, null, _idUsuario_decorators, { kind: "field", name: "idUsuario", static: false, private: false, access: { has: function (obj) { return "idUsuario" in obj; }, get: function (obj) { return obj.idUsuario; }, set: function (obj, value) { obj.idUsuario = value; } }, metadata: _metadata }, _idUsuario_initializers, _idUsuario_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FotoPreguntas = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FotoPreguntas = _classThis;
}();
exports.FotoPreguntas = FotoPreguntas;
