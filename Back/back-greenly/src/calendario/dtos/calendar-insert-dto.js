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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarInsertDto = void 0;
var class_validator_1 = require("class-validator");
var CalendarInsertDto = function () {
    var _a;
    var _idUsuario_decorators;
    var _idUsuario_initializers = [];
    var _idUsuario_extraInitializers = [];
    var _fecha_decorators;
    var _fecha_initializers = [];
    var _fecha_extraInitializers = [];
    var _tipoAcción_decorators;
    var _tipoAcción_initializers = [];
    var _tipoAcción_extraInitializers = [];
    var _idPlanta_decorators;
    var _idPlanta_initializers = [];
    var _idPlanta_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CalendarInsertDto() {
                this.idUsuario = __runInitializers(this, _idUsuario_initializers, void 0);
                this.fecha = (__runInitializers(this, _idUsuario_extraInitializers), __runInitializers(this, _fecha_initializers, void 0));
                this.tipoAcción = (__runInitializers(this, _fecha_extraInitializers), __runInitializers(this, _tipoAcción_initializers, void 0));
                this.idPlanta = (__runInitializers(this, _tipoAcción_extraInitializers), __runInitializers(this, _idPlanta_initializers, void 0));
                __runInitializers(this, _idPlanta_extraInitializers);
            }
            return CalendarInsertDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _idUsuario_decorators = [(0, class_validator_1.Min)(1)];
            _fecha_decorators = [(0, class_validator_1.IsDateString)()];
            _tipoAcción_decorators = [(0, class_validator_1.MaxLength)(255)];
            _idPlanta_decorators = [(0, class_validator_1.Min)(1)];
            __esDecorate(null, null, _idUsuario_decorators, { kind: "field", name: "idUsuario", static: false, private: false, access: { has: function (obj) { return "idUsuario" in obj; }, get: function (obj) { return obj.idUsuario; }, set: function (obj, value) { obj.idUsuario = value; } }, metadata: _metadata }, _idUsuario_initializers, _idUsuario_extraInitializers);
            __esDecorate(null, null, _fecha_decorators, { kind: "field", name: "fecha", static: false, private: false, access: { has: function (obj) { return "fecha" in obj; }, get: function (obj) { return obj.fecha; }, set: function (obj, value) { obj.fecha = value; } }, metadata: _metadata }, _fecha_initializers, _fecha_extraInitializers);
            __esDecorate(null, null, _tipoAcción_decorators, { kind: "field", name: "tipoAcci\u00F3n", static: false, private: false, access: { has: function (obj) { return "tipoAcci\u00F3n" in obj; }, get: function (obj) { return obj.tipoAcción; }, set: function (obj, value) { obj.tipoAcción = value; } }, metadata: _metadata }, _tipoAcción_initializers, _tipoAcción_extraInitializers);
            __esDecorate(null, null, _idPlanta_decorators, { kind: "field", name: "idPlanta", static: false, private: false, access: { has: function (obj) { return "idPlanta" in obj; }, get: function (obj) { return obj.idPlanta; }, set: function (obj, value) { obj.idPlanta = value; } }, metadata: _metadata }, _idPlanta_initializers, _idPlanta_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CalendarInsertDto = CalendarInsertDto;
