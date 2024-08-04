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
exports.BenefPerd = void 0;
var typeorm_1 = require("typeorm");
var plantas_1 = require("../../plantas/entities/plantas");
var BenefPerd = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('BeneficiosPerjudiciales')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _idBeneficioPerjudicial_decorators;
    var _idBeneficioPerjudicial_initializers = [];
    var _idBeneficioPerjudicial_extraInitializers = [];
    var _planta_decorators;
    var _planta_initializers = [];
    var _planta_extraInitializers = [];
    var _idPlanta_decorators;
    var _idPlanta_initializers = [];
    var _idPlanta_extraInitializers = [];
    var _boolean_decorators;
    var _boolean_initializers = [];
    var _boolean_extraInitializers = [];
    var BenefPerd = _classThis = /** @class */ (function () {
        function BenefPerd_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.idBeneficioPerjudicial = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _idBeneficioPerjudicial_initializers, void 0));
            this.planta = (__runInitializers(this, _idBeneficioPerjudicial_extraInitializers), __runInitializers(this, _planta_initializers, void 0));
            this.idPlanta = (__runInitializers(this, _planta_extraInitializers), __runInitializers(this, _idPlanta_initializers, void 0));
            this.boolean = (__runInitializers(this, _idPlanta_extraInitializers), __runInitializers(this, _boolean_initializers, void 0));
            __runInitializers(this, _boolean_extraInitializers);
        }
        return BenefPerd_1;
    }());
    __setFunctionName(_classThis, "BenefPerd");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _idBeneficioPerjudicial_decorators = [(0, typeorm_1.Column)()];
        _planta_decorators = [(0, typeorm_1.ManyToOne)(function () { return plantas_1.Plantas; }, function (planta) { return planta.benefPerd; }), (0, typeorm_1.JoinColumn)({ name: 'idPlanta' })];
        _idPlanta_decorators = [(0, typeorm_1.Column)()];
        _boolean_decorators = [(0, typeorm_1.Column)('boolean')];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _idBeneficioPerjudicial_decorators, { kind: "field", name: "idBeneficioPerjudicial", static: false, private: false, access: { has: function (obj) { return "idBeneficioPerjudicial" in obj; }, get: function (obj) { return obj.idBeneficioPerjudicial; }, set: function (obj, value) { obj.idBeneficioPerjudicial = value; } }, metadata: _metadata }, _idBeneficioPerjudicial_initializers, _idBeneficioPerjudicial_extraInitializers);
        __esDecorate(null, null, _planta_decorators, { kind: "field", name: "planta", static: false, private: false, access: { has: function (obj) { return "planta" in obj; }, get: function (obj) { return obj.planta; }, set: function (obj, value) { obj.planta = value; } }, metadata: _metadata }, _planta_initializers, _planta_extraInitializers);
        __esDecorate(null, null, _idPlanta_decorators, { kind: "field", name: "idPlanta", static: false, private: false, access: { has: function (obj) { return "idPlanta" in obj; }, get: function (obj) { return obj.idPlanta; }, set: function (obj, value) { obj.idPlanta = value; } }, metadata: _metadata }, _idPlanta_initializers, _idPlanta_extraInitializers);
        __esDecorate(null, null, _boolean_decorators, { kind: "field", name: "boolean", static: false, private: false, access: { has: function (obj) { return "boolean" in obj; }, get: function (obj) { return obj.boolean; }, set: function (obj, value) { obj.boolean = value; } }, metadata: _metadata }, _boolean_initializers, _boolean_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BenefPerd = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BenefPerd = _classThis;
}();
exports.BenefPerd = BenefPerd;
