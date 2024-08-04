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
exports.UpdatePlantasDto = void 0;
var class_validator_1 = require("class-validator");
var UpdatePlantasDto = function () {
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
    return _a = /** @class */ (function () {
            function UpdatePlantasDto() {
                this.nombrePlanta = __runInitializers(this, _nombrePlanta_initializers, void 0);
                this.nombreCientifico = (__runInitializers(this, _nombrePlanta_extraInitializers), __runInitializers(this, _nombreCientifico_initializers, void 0));
                this.identificacion = (__runInitializers(this, _nombreCientifico_extraInitializers), __runInitializers(this, _identificacion_initializers, void 0));
                this.img = (__runInitializers(this, _identificacion_extraInitializers), __runInitializers(this, _img_initializers, void 0));
                __runInitializers(this, _img_extraInitializers);
            }
            return UpdatePlantasDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _nombrePlanta_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)()];
            _nombreCientifico_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)()];
            _identificacion_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)()];
            _img_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _nombrePlanta_decorators, { kind: "field", name: "nombrePlanta", static: false, private: false, access: { has: function (obj) { return "nombrePlanta" in obj; }, get: function (obj) { return obj.nombrePlanta; }, set: function (obj, value) { obj.nombrePlanta = value; } }, metadata: _metadata }, _nombrePlanta_initializers, _nombrePlanta_extraInitializers);
            __esDecorate(null, null, _nombreCientifico_decorators, { kind: "field", name: "nombreCientifico", static: false, private: false, access: { has: function (obj) { return "nombreCientifico" in obj; }, get: function (obj) { return obj.nombreCientifico; }, set: function (obj, value) { obj.nombreCientifico = value; } }, metadata: _metadata }, _nombreCientifico_initializers, _nombreCientifico_extraInitializers);
            __esDecorate(null, null, _identificacion_decorators, { kind: "field", name: "identificacion", static: false, private: false, access: { has: function (obj) { return "identificacion" in obj; }, get: function (obj) { return obj.identificacion; }, set: function (obj, value) { obj.identificacion = value; } }, metadata: _metadata }, _identificacion_initializers, _identificacion_extraInitializers);
            __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdatePlantasDto = UpdatePlantasDto;
