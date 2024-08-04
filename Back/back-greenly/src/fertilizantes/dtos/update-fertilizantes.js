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
exports.UpdateFertilizanteDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateFertilizanteDto = function () {
    var _a;
    var _nombreFertilizante_decorators;
    var _nombreFertilizante_initializers = [];
    var _nombreFertilizante_extraInitializers = [];
    var _tipoFertilizante_decorators;
    var _tipoFertilizante_initializers = [];
    var _tipoFertilizante_extraInitializers = [];
    var _img_decorators;
    var _img_initializers = [];
    var _img_extraInitializers = [];
    var _descripcion_decorators;
    var _descripcion_initializers = [];
    var _descripcion_extraInitializers = [];
    var _elaboracion_decorators;
    var _elaboracion_initializers = [];
    var _elaboracion_extraInitializers = [];
    var _ubicacion_decorators;
    var _ubicacion_initializers = [];
    var _ubicacion_extraInitializers = [];
    var _cantidad_decorators;
    var _cantidad_initializers = [];
    var _cantidad_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateFertilizanteDto() {
                this.nombreFertilizante = __runInitializers(this, _nombreFertilizante_initializers, void 0);
                this.tipoFertilizante = (__runInitializers(this, _nombreFertilizante_extraInitializers), __runInitializers(this, _tipoFertilizante_initializers, void 0));
                this.img = (__runInitializers(this, _tipoFertilizante_extraInitializers), __runInitializers(this, _img_initializers, void 0));
                this.descripcion = (__runInitializers(this, _img_extraInitializers), __runInitializers(this, _descripcion_initializers, void 0));
                this.elaboracion = (__runInitializers(this, _descripcion_extraInitializers), __runInitializers(this, _elaboracion_initializers, void 0));
                this.ubicacion = (__runInitializers(this, _elaboracion_extraInitializers), __runInitializers(this, _ubicacion_initializers, void 0));
                this.cantidad = (__runInitializers(this, _ubicacion_extraInitializers), __runInitializers(this, _cantidad_initializers, void 0));
                __runInitializers(this, _cantidad_extraInitializers);
            }
            return UpdateFertilizanteDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nombreFertilizante_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _tipoFertilizante_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _img_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _descripcion_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _elaboracion_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _ubicacion_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _cantidad_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _nombreFertilizante_decorators, { kind: "field", name: "nombreFertilizante", static: false, private: false, access: { has: function (obj) { return "nombreFertilizante" in obj; }, get: function (obj) { return obj.nombreFertilizante; }, set: function (obj, value) { obj.nombreFertilizante = value; } }, metadata: _metadata }, _nombreFertilizante_initializers, _nombreFertilizante_extraInitializers);
            __esDecorate(null, null, _tipoFertilizante_decorators, { kind: "field", name: "tipoFertilizante", static: false, private: false, access: { has: function (obj) { return "tipoFertilizante" in obj; }, get: function (obj) { return obj.tipoFertilizante; }, set: function (obj, value) { obj.tipoFertilizante = value; } }, metadata: _metadata }, _tipoFertilizante_initializers, _tipoFertilizante_extraInitializers);
            __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
            __esDecorate(null, null, _descripcion_decorators, { kind: "field", name: "descripcion", static: false, private: false, access: { has: function (obj) { return "descripcion" in obj; }, get: function (obj) { return obj.descripcion; }, set: function (obj, value) { obj.descripcion = value; } }, metadata: _metadata }, _descripcion_initializers, _descripcion_extraInitializers);
            __esDecorate(null, null, _elaboracion_decorators, { kind: "field", name: "elaboracion", static: false, private: false, access: { has: function (obj) { return "elaboracion" in obj; }, get: function (obj) { return obj.elaboracion; }, set: function (obj, value) { obj.elaboracion = value; } }, metadata: _metadata }, _elaboracion_initializers, _elaboracion_extraInitializers);
            __esDecorate(null, null, _ubicacion_decorators, { kind: "field", name: "ubicacion", static: false, private: false, access: { has: function (obj) { return "ubicacion" in obj; }, get: function (obj) { return obj.ubicacion; }, set: function (obj, value) { obj.ubicacion = value; } }, metadata: _metadata }, _ubicacion_initializers, _ubicacion_extraInitializers);
            __esDecorate(null, null, _cantidad_decorators, { kind: "field", name: "cantidad", static: false, private: false, access: { has: function (obj) { return "cantidad" in obj; }, get: function (obj) { return obj.cantidad; }, set: function (obj, value) { obj.cantidad = value; } }, metadata: _metadata }, _cantidad_initializers, _cantidad_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateFertilizanteDto = UpdateFertilizanteDto;
