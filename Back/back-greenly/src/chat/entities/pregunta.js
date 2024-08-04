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
exports.Pregunta = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("../../usuario/entities/user");
var Pregunta = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('pregunta')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idPregunta_decorators;
    var _idPregunta_initializers = [];
    var _idPregunta_extraInitializers = [];
    var _pregunta_decorators;
    var _pregunta_initializers = [];
    var _pregunta_extraInitializers = [];
    var _idUsuario_decorators;
    var _idUsuario_initializers = [];
    var _idUsuario_extraInitializers = [];
    var _descripcion_decorators;
    var _descripcion_initializers = [];
    var _descripcion_extraInitializers = [];
    var _nombreCultivo_decorators;
    var _nombreCultivo_initializers = [];
    var _nombreCultivo_extraInitializers = [];
    var _fechaHora_decorators;
    var _fechaHora_initializers = [];
    var _fechaHora_extraInitializers = [];
    var Pregunta = _classThis = /** @class */ (function () {
        function Pregunta_1() {
            this.idPregunta = __runInitializers(this, _idPregunta_initializers, void 0);
            this.pregunta = (__runInitializers(this, _idPregunta_extraInitializers), __runInitializers(this, _pregunta_initializers, void 0));
            this.idUsuario = (__runInitializers(this, _pregunta_extraInitializers), __runInitializers(this, _idUsuario_initializers, void 0));
            this.descripcion = (__runInitializers(this, _idUsuario_extraInitializers), __runInitializers(this, _descripcion_initializers, void 0));
            this.nombreCultivo = (__runInitializers(this, _descripcion_extraInitializers), __runInitializers(this, _nombreCultivo_initializers, void 0));
            this.fechaHora = (__runInitializers(this, _nombreCultivo_extraInitializers), __runInitializers(this, _fechaHora_initializers, void 0));
            __runInitializers(this, _fechaHora_extraInitializers);
        }
        return Pregunta_1;
    }());
    __setFunctionName(_classThis, "Pregunta");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idPregunta_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _pregunta_decorators = [(0, typeorm_1.Column)('text')];
        _idUsuario_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.preguntas; })];
        _descripcion_decorators = [(0, typeorm_1.Column)('text')];
        _nombreCultivo_decorators = [(0, typeorm_1.Column)('text')];
        _fechaHora_decorators = [(0, typeorm_1.CreateDateColumn)()];
        __esDecorate(null, null, _idPregunta_decorators, { kind: "field", name: "idPregunta", static: false, private: false, access: { has: function (obj) { return "idPregunta" in obj; }, get: function (obj) { return obj.idPregunta; }, set: function (obj, value) { obj.idPregunta = value; } }, metadata: _metadata }, _idPregunta_initializers, _idPregunta_extraInitializers);
        __esDecorate(null, null, _pregunta_decorators, { kind: "field", name: "pregunta", static: false, private: false, access: { has: function (obj) { return "pregunta" in obj; }, get: function (obj) { return obj.pregunta; }, set: function (obj, value) { obj.pregunta = value; } }, metadata: _metadata }, _pregunta_initializers, _pregunta_extraInitializers);
        __esDecorate(null, null, _idUsuario_decorators, { kind: "field", name: "idUsuario", static: false, private: false, access: { has: function (obj) { return "idUsuario" in obj; }, get: function (obj) { return obj.idUsuario; }, set: function (obj, value) { obj.idUsuario = value; } }, metadata: _metadata }, _idUsuario_initializers, _idUsuario_extraInitializers);
        __esDecorate(null, null, _descripcion_decorators, { kind: "field", name: "descripcion", static: false, private: false, access: { has: function (obj) { return "descripcion" in obj; }, get: function (obj) { return obj.descripcion; }, set: function (obj, value) { obj.descripcion = value; } }, metadata: _metadata }, _descripcion_initializers, _descripcion_extraInitializers);
        __esDecorate(null, null, _nombreCultivo_decorators, { kind: "field", name: "nombreCultivo", static: false, private: false, access: { has: function (obj) { return "nombreCultivo" in obj; }, get: function (obj) { return obj.nombreCultivo; }, set: function (obj, value) { obj.nombreCultivo = value; } }, metadata: _metadata }, _nombreCultivo_initializers, _nombreCultivo_extraInitializers);
        __esDecorate(null, null, _fechaHora_decorators, { kind: "field", name: "fechaHora", static: false, private: false, access: { has: function (obj) { return "fechaHora" in obj; }, get: function (obj) { return obj.fechaHora; }, set: function (obj, value) { obj.fechaHora = value; } }, metadata: _metadata }, _fechaHora_initializers, _fechaHora_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Pregunta = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Pregunta = _classThis;
}();
exports.Pregunta = Pregunta;
