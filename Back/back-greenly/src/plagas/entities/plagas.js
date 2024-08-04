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
exports.Plagas = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Plagas = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('plagas')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idPlaga_decorators;
    var _idPlaga_initializers = [];
    var _idPlaga_extraInitializers = [];
    var _nombrePlaga_decorators;
    var _nombrePlaga_initializers = [];
    var _nombrePlaga_extraInitializers = [];
    var _descripcion_decorators;
    var _descripcion_initializers = [];
    var _descripcion_extraInitializers = [];
    var _accionesPreventivas_decorators;
    var _accionesPreventivas_initializers = [];
    var _accionesPreventivas_extraInitializers = [];
    var _luchaDirecta_decorators;
    var _luchaDirecta_initializers = [];
    var _luchaDirecta_extraInitializers = [];
    var _img_decorators;
    var _img_initializers = [];
    var _img_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var Plagas = _classThis = /** @class */ (function () {
        function Plagas_1() {
            this.idPlaga = __runInitializers(this, _idPlaga_initializers, void 0);
            this.nombrePlaga = (__runInitializers(this, _idPlaga_extraInitializers), __runInitializers(this, _nombrePlaga_initializers, void 0));
            this.descripcion = (__runInitializers(this, _nombrePlaga_extraInitializers), __runInitializers(this, _descripcion_initializers, void 0));
            this.accionesPreventivas = (__runInitializers(this, _descripcion_extraInitializers), __runInitializers(this, _accionesPreventivas_initializers, void 0));
            this.luchaDirecta = (__runInitializers(this, _accionesPreventivas_extraInitializers), __runInitializers(this, _luchaDirecta_initializers, void 0));
            this.img = (__runInitializers(this, _luchaDirecta_extraInitializers), __runInitializers(this, _img_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _img_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        return Plagas_1;
    }());
    __setFunctionName(_classThis, "Plagas");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idPlaga_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nombrePlaga_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de la plaga es requerido' })];
        _descripcion_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)({ message: 'La descripcion de la plaga es requerida' })];
        _accionesPreventivas_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)({ message: 'Las acciones preventivas de la plaga son requeridas' })];
        _luchaDirecta_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)({ message: 'Las acciones de lucha directa de la plaga son requeridas' })];
        _img_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)({ message: 'La imagen de la plaga es requerida' })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _idPlaga_decorators, { kind: "field", name: "idPlaga", static: false, private: false, access: { has: function (obj) { return "idPlaga" in obj; }, get: function (obj) { return obj.idPlaga; }, set: function (obj, value) { obj.idPlaga = value; } }, metadata: _metadata }, _idPlaga_initializers, _idPlaga_extraInitializers);
        __esDecorate(null, null, _nombrePlaga_decorators, { kind: "field", name: "nombrePlaga", static: false, private: false, access: { has: function (obj) { return "nombrePlaga" in obj; }, get: function (obj) { return obj.nombrePlaga; }, set: function (obj, value) { obj.nombrePlaga = value; } }, metadata: _metadata }, _nombrePlaga_initializers, _nombrePlaga_extraInitializers);
        __esDecorate(null, null, _descripcion_decorators, { kind: "field", name: "descripcion", static: false, private: false, access: { has: function (obj) { return "descripcion" in obj; }, get: function (obj) { return obj.descripcion; }, set: function (obj, value) { obj.descripcion = value; } }, metadata: _metadata }, _descripcion_initializers, _descripcion_extraInitializers);
        __esDecorate(null, null, _accionesPreventivas_decorators, { kind: "field", name: "accionesPreventivas", static: false, private: false, access: { has: function (obj) { return "accionesPreventivas" in obj; }, get: function (obj) { return obj.accionesPreventivas; }, set: function (obj, value) { obj.accionesPreventivas = value; } }, metadata: _metadata }, _accionesPreventivas_initializers, _accionesPreventivas_extraInitializers);
        __esDecorate(null, null, _luchaDirecta_decorators, { kind: "field", name: "luchaDirecta", static: false, private: false, access: { has: function (obj) { return "luchaDirecta" in obj; }, get: function (obj) { return obj.luchaDirecta; }, set: function (obj, value) { obj.luchaDirecta = value; } }, metadata: _metadata }, _luchaDirecta_initializers, _luchaDirecta_extraInitializers);
        __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Plagas = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Plagas = _classThis;
}();
exports.Plagas = Plagas;
