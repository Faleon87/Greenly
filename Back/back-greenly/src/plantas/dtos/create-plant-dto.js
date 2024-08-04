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
exports.CreatePlantDto = void 0;
var class_validator_1 = require("class-validator");
// create-plant.dto.ts
var CreatePlantDto = function () {
    var _a;
    var _nombrePlanta_decorators;
    var _nombrePlanta_initializers = [];
    var _nombrePlanta_extraInitializers = [];
    var _nombreCientifico_decorators;
    var _nombreCientifico_initializers = [];
    var _nombreCientifico_extraInitializers = [];
    var _identificacion_decorators;
    var _identificacion_initializers = [];
    var _identificacion_extraInitializers = [];
    var _img_decorators;
    var _img_initializers = [];
    var _img_extraInitializers = [];
    var _siembra_decorators;
    var _siembra_initializers = [];
    var _siembra_extraInitializers = [];
    var _temporadaSiembra_decorators;
    var _temporadaSiembra_initializers = [];
    var _temporadaSiembra_extraInitializers = [];
    var _profundSiembra_decorators;
    var _profundSiembra_initializers = [];
    var _profundSiembra_extraInitializers = [];
    var _distanciaPlantas_decorators;
    var _distanciaPlantas_initializers = [];
    var _distanciaPlantas_extraInitializers = [];
    var _rotaciones_decorators;
    var _rotaciones_initializers = [];
    var _rotaciones_extraInitializers = [];
    var _climaTemperatura_decorators;
    var _climaTemperatura_initializers = [];
    var _climaTemperatura_extraInitializers = [];
    var _riego_decorators;
    var _riego_initializers = [];
    var _riego_extraInitializers = [];
    var _riegoEstimado_decorators;
    var _riegoEstimado_initializers = [];
    var _riegoEstimado_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePlantDto() {
                this.nombrePlanta = __runInitializers(this, _nombrePlanta_initializers, void 0);
                this.nombreCientifico = (__runInitializers(this, _nombrePlanta_extraInitializers), __runInitializers(this, _nombreCientifico_initializers, void 0));
                this.identificacion = (__runInitializers(this, _nombreCientifico_extraInitializers), __runInitializers(this, _identificacion_initializers, void 0));
                this.img = (__runInitializers(this, _identificacion_extraInitializers), __runInitializers(this, _img_initializers, void 0));
                this.siembra = (__runInitializers(this, _img_extraInitializers), __runInitializers(this, _siembra_initializers, void 0));
                this.temporadaSiembra = (__runInitializers(this, _siembra_extraInitializers), __runInitializers(this, _temporadaSiembra_initializers, void 0));
                this.profundSiembra = (__runInitializers(this, _temporadaSiembra_extraInitializers), __runInitializers(this, _profundSiembra_initializers, void 0));
                this.distanciaPlantas = (__runInitializers(this, _profundSiembra_extraInitializers), __runInitializers(this, _distanciaPlantas_initializers, void 0));
                this.rotaciones = (__runInitializers(this, _distanciaPlantas_extraInitializers), __runInitializers(this, _rotaciones_initializers, void 0));
                this.climaTemperatura = (__runInitializers(this, _rotaciones_extraInitializers), __runInitializers(this, _climaTemperatura_initializers, void 0));
                this.riego = (__runInitializers(this, _climaTemperatura_extraInitializers), __runInitializers(this, _riego_initializers, void 0));
                this.riegoEstimado = (__runInitializers(this, _riego_extraInitializers), __runInitializers(this, _riegoEstimado_initializers, void 0));
                __runInitializers(this, _riegoEstimado_extraInitializers);
            }
            return CreatePlantDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nombrePlanta_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _nombreCientifico_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _identificacion_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _img_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _siembra_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _temporadaSiembra_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _profundSiembra_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _distanciaPlantas_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _rotaciones_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _climaTemperatura_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _riego_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _riegoEstimado_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _nombrePlanta_decorators, { kind: "field", name: "nombrePlanta", static: false, private: false, access: { has: function (obj) { return "nombrePlanta" in obj; }, get: function (obj) { return obj.nombrePlanta; }, set: function (obj, value) { obj.nombrePlanta = value; } }, metadata: _metadata }, _nombrePlanta_initializers, _nombrePlanta_extraInitializers);
            __esDecorate(null, null, _nombreCientifico_decorators, { kind: "field", name: "nombreCientifico", static: false, private: false, access: { has: function (obj) { return "nombreCientifico" in obj; }, get: function (obj) { return obj.nombreCientifico; }, set: function (obj, value) { obj.nombreCientifico = value; } }, metadata: _metadata }, _nombreCientifico_initializers, _nombreCientifico_extraInitializers);
            __esDecorate(null, null, _identificacion_decorators, { kind: "field", name: "identificacion", static: false, private: false, access: { has: function (obj) { return "identificacion" in obj; }, get: function (obj) { return obj.identificacion; }, set: function (obj, value) { obj.identificacion = value; } }, metadata: _metadata }, _identificacion_initializers, _identificacion_extraInitializers);
            __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
            __esDecorate(null, null, _siembra_decorators, { kind: "field", name: "siembra", static: false, private: false, access: { has: function (obj) { return "siembra" in obj; }, get: function (obj) { return obj.siembra; }, set: function (obj, value) { obj.siembra = value; } }, metadata: _metadata }, _siembra_initializers, _siembra_extraInitializers);
            __esDecorate(null, null, _temporadaSiembra_decorators, { kind: "field", name: "temporadaSiembra", static: false, private: false, access: { has: function (obj) { return "temporadaSiembra" in obj; }, get: function (obj) { return obj.temporadaSiembra; }, set: function (obj, value) { obj.temporadaSiembra = value; } }, metadata: _metadata }, _temporadaSiembra_initializers, _temporadaSiembra_extraInitializers);
            __esDecorate(null, null, _profundSiembra_decorators, { kind: "field", name: "profundSiembra", static: false, private: false, access: { has: function (obj) { return "profundSiembra" in obj; }, get: function (obj) { return obj.profundSiembra; }, set: function (obj, value) { obj.profundSiembra = value; } }, metadata: _metadata }, _profundSiembra_initializers, _profundSiembra_extraInitializers);
            __esDecorate(null, null, _distanciaPlantas_decorators, { kind: "field", name: "distanciaPlantas", static: false, private: false, access: { has: function (obj) { return "distanciaPlantas" in obj; }, get: function (obj) { return obj.distanciaPlantas; }, set: function (obj, value) { obj.distanciaPlantas = value; } }, metadata: _metadata }, _distanciaPlantas_initializers, _distanciaPlantas_extraInitializers);
            __esDecorate(null, null, _rotaciones_decorators, { kind: "field", name: "rotaciones", static: false, private: false, access: { has: function (obj) { return "rotaciones" in obj; }, get: function (obj) { return obj.rotaciones; }, set: function (obj, value) { obj.rotaciones = value; } }, metadata: _metadata }, _rotaciones_initializers, _rotaciones_extraInitializers);
            __esDecorate(null, null, _climaTemperatura_decorators, { kind: "field", name: "climaTemperatura", static: false, private: false, access: { has: function (obj) { return "climaTemperatura" in obj; }, get: function (obj) { return obj.climaTemperatura; }, set: function (obj, value) { obj.climaTemperatura = value; } }, metadata: _metadata }, _climaTemperatura_initializers, _climaTemperatura_extraInitializers);
            __esDecorate(null, null, _riego_decorators, { kind: "field", name: "riego", static: false, private: false, access: { has: function (obj) { return "riego" in obj; }, get: function (obj) { return obj.riego; }, set: function (obj, value) { obj.riego = value; } }, metadata: _metadata }, _riego_initializers, _riego_extraInitializers);
            __esDecorate(null, null, _riegoEstimado_decorators, { kind: "field", name: "riegoEstimado", static: false, private: false, access: { has: function (obj) { return "riegoEstimado" in obj; }, get: function (obj) { return obj.riegoEstimado; }, set: function (obj, value) { obj.riegoEstimado = value; } }, metadata: _metadata }, _riegoEstimado_initializers, _riegoEstimado_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePlantDto = CreatePlantDto;
