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
exports.Productos = void 0;
var herramientas_1 = require("src/herramientas/entities/herramientas");
var typeorm_1 = require("typeorm");
var semillas_1 = require("src/semillas/entities/semillas");
var abonos_1 = require("src/abonos/entities/abonos");
var carrito_1 = require("src/carrito/entities/carrito");
var Productos = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('productos')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idProducto_decorators;
    var _idProducto_initializers = [];
    var _idProducto_extraInitializers = [];
    var _nombre_decorators;
    var _nombre_initializers = [];
    var _nombre_extraInitializers = [];
    var _descripcion_decorators;
    var _descripcion_initializers = [];
    var _descripcion_extraInitializers = [];
    var _precio_decorators;
    var _precio_initializers = [];
    var _precio_extraInitializers = [];
    var _stock_decorators;
    var _stock_initializers = [];
    var _stock_extraInitializers = [];
    var _imagen_decorators;
    var _imagen_initializers = [];
    var _imagen_extraInitializers = [];
    var _Categoria_decorators;
    var _Categoria_initializers = [];
    var _Categoria_extraInitializers = [];
    var _herramientas_decorators;
    var _herramientas_initializers = [];
    var _herramientas_extraInitializers = [];
    var _semillas_decorators;
    var _semillas_initializers = [];
    var _semillas_extraInitializers = [];
    var _abonos_decorators;
    var _abonos_initializers = [];
    var _abonos_extraInitializers = [];
    var _carrito_decorators;
    var _carrito_initializers = [];
    var _carrito_extraInitializers = [];
    var Productos = _classThis = /** @class */ (function () {
        function Productos_1() {
            this.idProducto = __runInitializers(this, _idProducto_initializers, void 0);
            this.nombre = (__runInitializers(this, _idProducto_extraInitializers), __runInitializers(this, _nombre_initializers, void 0));
            this.descripcion = (__runInitializers(this, _nombre_extraInitializers), __runInitializers(this, _descripcion_initializers, void 0));
            this.precio = (__runInitializers(this, _descripcion_extraInitializers), __runInitializers(this, _precio_initializers, void 0));
            this.stock = (__runInitializers(this, _precio_extraInitializers), __runInitializers(this, _stock_initializers, void 0));
            this.imagen = (__runInitializers(this, _stock_extraInitializers), __runInitializers(this, _imagen_initializers, void 0));
            this.Categoria = (__runInitializers(this, _imagen_extraInitializers), __runInitializers(this, _Categoria_initializers, void 0));
            this.herramientas = (__runInitializers(this, _Categoria_extraInitializers), __runInitializers(this, _herramientas_initializers, void 0));
            this.semillas = (__runInitializers(this, _herramientas_extraInitializers), __runInitializers(this, _semillas_initializers, void 0));
            this.abonos = (__runInitializers(this, _semillas_extraInitializers), __runInitializers(this, _abonos_initializers, void 0));
            this.carrito = (__runInitializers(this, _abonos_extraInitializers), __runInitializers(this, _carrito_initializers, void 0));
            __runInitializers(this, _carrito_extraInitializers);
        }
        return Productos_1;
    }());
    __setFunctionName(_classThis, "Productos");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idProducto_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nombre_decorators = [(0, typeorm_1.Column)()];
        _descripcion_decorators = [(0, typeorm_1.Column)()];
        _precio_decorators = [(0, typeorm_1.Column)({ type: 'float' })];
        _stock_decorators = [(0, typeorm_1.Column)()];
        _imagen_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _Categoria_decorators = [(0, typeorm_1.Column)()];
        _herramientas_decorators = [(0, typeorm_1.OneToOne)(function () { return herramientas_1.Herramientas; }, function (herramientas) { return herramientas.productos; })];
        _semillas_decorators = [(0, typeorm_1.OneToOne)(function () { return semillas_1.Semillas; }, function (semillas) { return semillas.productos; })];
        _abonos_decorators = [(0, typeorm_1.OneToOne)(function () { return abonos_1.Abonos; }, function (abonos) { return abonos.productos; })];
        _carrito_decorators = [(0, typeorm_1.OneToMany)(function () { return carrito_1.Carrito; }, function (carrito) { return carrito.idProducto; })];
        __esDecorate(null, null, _idProducto_decorators, { kind: "field", name: "idProducto", static: false, private: false, access: { has: function (obj) { return "idProducto" in obj; }, get: function (obj) { return obj.idProducto; }, set: function (obj, value) { obj.idProducto = value; } }, metadata: _metadata }, _idProducto_initializers, _idProducto_extraInitializers);
        __esDecorate(null, null, _nombre_decorators, { kind: "field", name: "nombre", static: false, private: false, access: { has: function (obj) { return "nombre" in obj; }, get: function (obj) { return obj.nombre; }, set: function (obj, value) { obj.nombre = value; } }, metadata: _metadata }, _nombre_initializers, _nombre_extraInitializers);
        __esDecorate(null, null, _descripcion_decorators, { kind: "field", name: "descripcion", static: false, private: false, access: { has: function (obj) { return "descripcion" in obj; }, get: function (obj) { return obj.descripcion; }, set: function (obj, value) { obj.descripcion = value; } }, metadata: _metadata }, _descripcion_initializers, _descripcion_extraInitializers);
        __esDecorate(null, null, _precio_decorators, { kind: "field", name: "precio", static: false, private: false, access: { has: function (obj) { return "precio" in obj; }, get: function (obj) { return obj.precio; }, set: function (obj, value) { obj.precio = value; } }, metadata: _metadata }, _precio_initializers, _precio_extraInitializers);
        __esDecorate(null, null, _stock_decorators, { kind: "field", name: "stock", static: false, private: false, access: { has: function (obj) { return "stock" in obj; }, get: function (obj) { return obj.stock; }, set: function (obj, value) { obj.stock = value; } }, metadata: _metadata }, _stock_initializers, _stock_extraInitializers);
        __esDecorate(null, null, _imagen_decorators, { kind: "field", name: "imagen", static: false, private: false, access: { has: function (obj) { return "imagen" in obj; }, get: function (obj) { return obj.imagen; }, set: function (obj, value) { obj.imagen = value; } }, metadata: _metadata }, _imagen_initializers, _imagen_extraInitializers);
        __esDecorate(null, null, _Categoria_decorators, { kind: "field", name: "Categoria", static: false, private: false, access: { has: function (obj) { return "Categoria" in obj; }, get: function (obj) { return obj.Categoria; }, set: function (obj, value) { obj.Categoria = value; } }, metadata: _metadata }, _Categoria_initializers, _Categoria_extraInitializers);
        __esDecorate(null, null, _herramientas_decorators, { kind: "field", name: "herramientas", static: false, private: false, access: { has: function (obj) { return "herramientas" in obj; }, get: function (obj) { return obj.herramientas; }, set: function (obj, value) { obj.herramientas = value; } }, metadata: _metadata }, _herramientas_initializers, _herramientas_extraInitializers);
        __esDecorate(null, null, _semillas_decorators, { kind: "field", name: "semillas", static: false, private: false, access: { has: function (obj) { return "semillas" in obj; }, get: function (obj) { return obj.semillas; }, set: function (obj, value) { obj.semillas = value; } }, metadata: _metadata }, _semillas_initializers, _semillas_extraInitializers);
        __esDecorate(null, null, _abonos_decorators, { kind: "field", name: "abonos", static: false, private: false, access: { has: function (obj) { return "abonos" in obj; }, get: function (obj) { return obj.abonos; }, set: function (obj, value) { obj.abonos = value; } }, metadata: _metadata }, _abonos_initializers, _abonos_extraInitializers);
        __esDecorate(null, null, _carrito_decorators, { kind: "field", name: "carrito", static: false, private: false, access: { has: function (obj) { return "carrito" in obj; }, get: function (obj) { return obj.carrito; }, set: function (obj, value) { obj.carrito = value; } }, metadata: _metadata }, _carrito_initializers, _carrito_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Productos = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Productos = _classThis;
}();
exports.Productos = Productos;
