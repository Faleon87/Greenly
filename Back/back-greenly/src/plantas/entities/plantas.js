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
exports.Plantas = void 0;
var typeorm_1 = require("typeorm");
var benef_perd_1 = require("../../beneficios_per/entities/benef_perd");
var Plantas = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idPlanta_decorators;
    var _idPlanta_initializers = [];
    var _idPlanta_extraInitializers = [];
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
    var _ProfundSiembra_decorators;
    var _ProfundSiembra_initializers = [];
    var _ProfundSiembra_extraInitializers = [];
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
    var _benefPerd_decorators;
    var _benefPerd_initializers = [];
    var _benefPerd_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var Plantas = _classThis = /** @class */ (function () {
        function Plantas_1() {
            this.idPlanta = __runInitializers(this, _idPlanta_initializers, void 0);
            this.nombrePlanta = (__runInitializers(this, _idPlanta_extraInitializers), __runInitializers(this, _nombrePlanta_initializers, void 0));
            this.nombreCientifico = (__runInitializers(this, _nombrePlanta_extraInitializers), __runInitializers(this, _nombreCientifico_initializers, void 0));
            this.identificacion = (__runInitializers(this, _nombreCientifico_extraInitializers), __runInitializers(this, _identificacion_initializers, void 0));
            this.img = (__runInitializers(this, _identificacion_extraInitializers), __runInitializers(this, _img_initializers, void 0));
            this.siembra = (__runInitializers(this, _img_extraInitializers), __runInitializers(this, _siembra_initializers, void 0));
            this.temporadaSiembra = (__runInitializers(this, _siembra_extraInitializers), __runInitializers(this, _temporadaSiembra_initializers, void 0));
            this.ProfundSiembra = (__runInitializers(this, _temporadaSiembra_extraInitializers), __runInitializers(this, _ProfundSiembra_initializers, void 0));
            this.distanciaPlantas = (__runInitializers(this, _ProfundSiembra_extraInitializers), __runInitializers(this, _distanciaPlantas_initializers, void 0));
            this.rotaciones = (__runInitializers(this, _distanciaPlantas_extraInitializers), __runInitializers(this, _rotaciones_initializers, void 0));
            this.climaTemperatura = (__runInitializers(this, _rotaciones_extraInitializers), __runInitializers(this, _climaTemperatura_initializers, void 0));
            this.riego = (__runInitializers(this, _climaTemperatura_extraInitializers), __runInitializers(this, _riego_initializers, void 0));
            this.riegoEstimado = (__runInitializers(this, _riego_extraInitializers), __runInitializers(this, _riegoEstimado_initializers, void 0));
            this.benefPerd = (__runInitializers(this, _riegoEstimado_extraInitializers), __runInitializers(this, _benefPerd_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _benefPerd_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        return Plantas_1;
    }());
    __setFunctionName(_classThis, "Plantas");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idPlanta_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nombrePlanta_decorators = [(0, typeorm_1.Column)()];
        _nombreCientifico_decorators = [(0, typeorm_1.Column)()];
        _identificacion_decorators = [(0, typeorm_1.Column)()];
        _img_decorators = [(0, typeorm_1.Column)()];
        _siembra_decorators = [(0, typeorm_1.Column)()];
        _temporadaSiembra_decorators = [(0, typeorm_1.Column)()];
        _ProfundSiembra_decorators = [(0, typeorm_1.Column)()];
        _distanciaPlantas_decorators = [(0, typeorm_1.Column)()];
        _rotaciones_decorators = [(0, typeorm_1.Column)()];
        _climaTemperatura_decorators = [(0, typeorm_1.Column)()];
        _riego_decorators = [(0, typeorm_1.Column)()];
        _riegoEstimado_decorators = [(0, typeorm_1.Column)()];
        _benefPerd_decorators = [(0, typeorm_1.OneToMany)(function () { return benef_perd_1.BenefPerd; }, function (benefPerd) { return benefPerd.idPlanta; })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _idPlanta_decorators, { kind: "field", name: "idPlanta", static: false, private: false, access: { has: function (obj) { return "idPlanta" in obj; }, get: function (obj) { return obj.idPlanta; }, set: function (obj, value) { obj.idPlanta = value; } }, metadata: _metadata }, _idPlanta_initializers, _idPlanta_extraInitializers);
        __esDecorate(null, null, _nombrePlanta_decorators, { kind: "field", name: "nombrePlanta", static: false, private: false, access: { has: function (obj) { return "nombrePlanta" in obj; }, get: function (obj) { return obj.nombrePlanta; }, set: function (obj, value) { obj.nombrePlanta = value; } }, metadata: _metadata }, _nombrePlanta_initializers, _nombrePlanta_extraInitializers);
        __esDecorate(null, null, _nombreCientifico_decorators, { kind: "field", name: "nombreCientifico", static: false, private: false, access: { has: function (obj) { return "nombreCientifico" in obj; }, get: function (obj) { return obj.nombreCientifico; }, set: function (obj, value) { obj.nombreCientifico = value; } }, metadata: _metadata }, _nombreCientifico_initializers, _nombreCientifico_extraInitializers);
        __esDecorate(null, null, _identificacion_decorators, { kind: "field", name: "identificacion", static: false, private: false, access: { has: function (obj) { return "identificacion" in obj; }, get: function (obj) { return obj.identificacion; }, set: function (obj, value) { obj.identificacion = value; } }, metadata: _metadata }, _identificacion_initializers, _identificacion_extraInitializers);
        __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
        __esDecorate(null, null, _siembra_decorators, { kind: "field", name: "siembra", static: false, private: false, access: { has: function (obj) { return "siembra" in obj; }, get: function (obj) { return obj.siembra; }, set: function (obj, value) { obj.siembra = value; } }, metadata: _metadata }, _siembra_initializers, _siembra_extraInitializers);
        __esDecorate(null, null, _temporadaSiembra_decorators, { kind: "field", name: "temporadaSiembra", static: false, private: false, access: { has: function (obj) { return "temporadaSiembra" in obj; }, get: function (obj) { return obj.temporadaSiembra; }, set: function (obj, value) { obj.temporadaSiembra = value; } }, metadata: _metadata }, _temporadaSiembra_initializers, _temporadaSiembra_extraInitializers);
        __esDecorate(null, null, _ProfundSiembra_decorators, { kind: "field", name: "ProfundSiembra", static: false, private: false, access: { has: function (obj) { return "ProfundSiembra" in obj; }, get: function (obj) { return obj.ProfundSiembra; }, set: function (obj, value) { obj.ProfundSiembra = value; } }, metadata: _metadata }, _ProfundSiembra_initializers, _ProfundSiembra_extraInitializers);
        __esDecorate(null, null, _distanciaPlantas_decorators, { kind: "field", name: "distanciaPlantas", static: false, private: false, access: { has: function (obj) { return "distanciaPlantas" in obj; }, get: function (obj) { return obj.distanciaPlantas; }, set: function (obj, value) { obj.distanciaPlantas = value; } }, metadata: _metadata }, _distanciaPlantas_initializers, _distanciaPlantas_extraInitializers);
        __esDecorate(null, null, _rotaciones_decorators, { kind: "field", name: "rotaciones", static: false, private: false, access: { has: function (obj) { return "rotaciones" in obj; }, get: function (obj) { return obj.rotaciones; }, set: function (obj, value) { obj.rotaciones = value; } }, metadata: _metadata }, _rotaciones_initializers, _rotaciones_extraInitializers);
        __esDecorate(null, null, _climaTemperatura_decorators, { kind: "field", name: "climaTemperatura", static: false, private: false, access: { has: function (obj) { return "climaTemperatura" in obj; }, get: function (obj) { return obj.climaTemperatura; }, set: function (obj, value) { obj.climaTemperatura = value; } }, metadata: _metadata }, _climaTemperatura_initializers, _climaTemperatura_extraInitializers);
        __esDecorate(null, null, _riego_decorators, { kind: "field", name: "riego", static: false, private: false, access: { has: function (obj) { return "riego" in obj; }, get: function (obj) { return obj.riego; }, set: function (obj, value) { obj.riego = value; } }, metadata: _metadata }, _riego_initializers, _riego_extraInitializers);
        __esDecorate(null, null, _riegoEstimado_decorators, { kind: "field", name: "riegoEstimado", static: false, private: false, access: { has: function (obj) { return "riegoEstimado" in obj; }, get: function (obj) { return obj.riegoEstimado; }, set: function (obj, value) { obj.riegoEstimado = value; } }, metadata: _metadata }, _riegoEstimado_initializers, _riegoEstimado_extraInitializers);
        __esDecorate(null, null, _benefPerd_decorators, { kind: "field", name: "benefPerd", static: false, private: false, access: { has: function (obj) { return "benefPerd" in obj; }, get: function (obj) { return obj.benefPerd; }, set: function (obj, value) { obj.benefPerd = value; } }, metadata: _metadata }, _benefPerd_initializers, _benefPerd_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Plantas = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Plantas = _classThis;
}();
exports.Plantas = Plantas;
