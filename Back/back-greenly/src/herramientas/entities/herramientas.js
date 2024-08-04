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
exports.Herramientas = void 0;
var typeorm_1 = require("typeorm");
var productos_1 = require("src/productos/entities/productos");
var Herramientas = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('herramientas')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idHerramienta_decorators;
    var _idHerramienta_initializers = [];
    var _idHerramienta_extraInitializers = [];
    var _marca_decorators;
    var _marca_initializers = [];
    var _marca_extraInitializers = [];
    var _peso_decorators;
    var _peso_initializers = [];
    var _peso_extraInitializers = [];
    var _productos_decorators;
    var _productos_initializers = [];
    var _productos_extraInitializers = [];
    var Herramientas = _classThis = /** @class */ (function () {
        function Herramientas_1() {
            this.idHerramienta = __runInitializers(this, _idHerramienta_initializers, void 0);
            this.marca = (__runInitializers(this, _idHerramienta_extraInitializers), __runInitializers(this, _marca_initializers, void 0));
            this.peso = (__runInitializers(this, _marca_extraInitializers), __runInitializers(this, _peso_initializers, void 0));
            this.productos = (__runInitializers(this, _peso_extraInitializers), __runInitializers(this, _productos_initializers, void 0));
            __runInitializers(this, _productos_extraInitializers);
        }
        return Herramientas_1;
    }());
    __setFunctionName(_classThis, "Herramientas");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idHerramienta_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _marca_decorators = [(0, typeorm_1.Column)()];
        _peso_decorators = [(0, typeorm_1.Column)({ type: 'float' })];
        _productos_decorators = [(0, typeorm_1.OneToOne)(function () { return productos_1.Productos; }, function (productos) { return productos.herramientas; }), (0, typeorm_1.JoinColumn)({ name: 'idProducto' })];
        __esDecorate(null, null, _idHerramienta_decorators, { kind: "field", name: "idHerramienta", static: false, private: false, access: { has: function (obj) { return "idHerramienta" in obj; }, get: function (obj) { return obj.idHerramienta; }, set: function (obj, value) { obj.idHerramienta = value; } }, metadata: _metadata }, _idHerramienta_initializers, _idHerramienta_extraInitializers);
        __esDecorate(null, null, _marca_decorators, { kind: "field", name: "marca", static: false, private: false, access: { has: function (obj) { return "marca" in obj; }, get: function (obj) { return obj.marca; }, set: function (obj, value) { obj.marca = value; } }, metadata: _metadata }, _marca_initializers, _marca_extraInitializers);
        __esDecorate(null, null, _peso_decorators, { kind: "field", name: "peso", static: false, private: false, access: { has: function (obj) { return "peso" in obj; }, get: function (obj) { return obj.peso; }, set: function (obj, value) { obj.peso = value; } }, metadata: _metadata }, _peso_initializers, _peso_extraInitializers);
        __esDecorate(null, null, _productos_decorators, { kind: "field", name: "productos", static: false, private: false, access: { has: function (obj) { return "productos" in obj; }, get: function (obj) { return obj.productos; }, set: function (obj, value) { obj.productos = value; } }, metadata: _metadata }, _productos_initializers, _productos_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Herramientas = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Herramientas = _classThis;
}();
exports.Herramientas = Herramientas;
