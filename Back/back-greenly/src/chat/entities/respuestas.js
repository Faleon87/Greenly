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
exports.Respuestas = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("../../usuario/entities/user");
var Respuestas = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('respuestas')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idRespuesta_decorators;
    var _idRespuesta_initializers = [];
    var _idRespuesta_extraInitializers = [];
    var _respuesta_decorators;
    var _respuesta_initializers = [];
    var _respuesta_extraInitializers = [];
    var _idUsuario_decorators;
    var _idUsuario_initializers = [];
    var _idUsuario_extraInitializers = [];
    var _fechaHora_decorators;
    var _fechaHora_initializers = [];
    var _fechaHora_extraInitializers = [];
    var Respuestas = _classThis = /** @class */ (function () {
        function Respuestas_1() {
            this.idRespuesta = __runInitializers(this, _idRespuesta_initializers, void 0);
            this.respuesta = (__runInitializers(this, _idRespuesta_extraInitializers), __runInitializers(this, _respuesta_initializers, void 0));
            this.idUsuario = (__runInitializers(this, _respuesta_extraInitializers), __runInitializers(this, _idUsuario_initializers, void 0));
            this.fechaHora = (__runInitializers(this, _idUsuario_extraInitializers), __runInitializers(this, _fechaHora_initializers, void 0));
            __runInitializers(this, _fechaHora_extraInitializers);
        }
        return Respuestas_1;
    }());
    __setFunctionName(_classThis, "Respuestas");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idRespuesta_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _respuesta_decorators = [(0, typeorm_1.Column)('text')];
        _idUsuario_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.idUser; })];
        _fechaHora_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _idRespuesta_decorators, { kind: "field", name: "idRespuesta", static: false, private: false, access: { has: function (obj) { return "idRespuesta" in obj; }, get: function (obj) { return obj.idRespuesta; }, set: function (obj, value) { obj.idRespuesta = value; } }, metadata: _metadata }, _idRespuesta_initializers, _idRespuesta_extraInitializers);
        __esDecorate(null, null, _respuesta_decorators, { kind: "field", name: "respuesta", static: false, private: false, access: { has: function (obj) { return "respuesta" in obj; }, get: function (obj) { return obj.respuesta; }, set: function (obj, value) { obj.respuesta = value; } }, metadata: _metadata }, _respuesta_initializers, _respuesta_extraInitializers);
        __esDecorate(null, null, _idUsuario_decorators, { kind: "field", name: "idUsuario", static: false, private: false, access: { has: function (obj) { return "idUsuario" in obj; }, get: function (obj) { return obj.idUsuario; }, set: function (obj, value) { obj.idUsuario = value; } }, metadata: _metadata }, _idUsuario_initializers, _idUsuario_extraInitializers);
        __esDecorate(null, null, _fechaHora_decorators, { kind: "field", name: "fechaHora", static: false, private: false, access: { has: function (obj) { return "fechaHora" in obj; }, get: function (obj) { return obj.fechaHora; }, set: function (obj, value) { obj.fechaHora = value; } }, metadata: _metadata }, _fechaHora_initializers, _fechaHora_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Respuestas = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Respuestas = _classThis;
}();
exports.Respuestas = Respuestas;
