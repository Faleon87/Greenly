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
exports.Carrito = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("src/usuario/entities/user");
var productos_1 = require("src/productos/entities/productos");
var Carrito = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('carrito')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idCarrito_decorators;
    var _idCarrito_initializers = [];
    var _idCarrito_extraInitializers = [];
    var _idUser_decorators;
    var _idUser_initializers = [];
    var _idUser_extraInitializers = [];
    var _idProducto_decorators;
    var _idProducto_initializers = [];
    var _idProducto_extraInitializers = [];
    var Carrito = _classThis = /** @class */ (function () {
        function Carrito_1() {
            this.idCarrito = __runInitializers(this, _idCarrito_initializers, void 0);
            this.idUser = (__runInitializers(this, _idCarrito_extraInitializers), __runInitializers(this, _idUser_initializers, void 0));
            this.idProducto = (__runInitializers(this, _idUser_extraInitializers), __runInitializers(this, _idProducto_initializers, void 0));
            __runInitializers(this, _idProducto_extraInitializers);
        }
        return Carrito_1;
    }());
    __setFunctionName(_classThis, "Carrito");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idCarrito_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _idUser_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.carrito; }), (0, typeorm_1.JoinColumn)({ name: 'idUser' })];
        _idProducto_decorators = [(0, typeorm_1.ManyToOne)(function () { return productos_1.Productos; }, function (productos) { return productos.carrito; }), (0, typeorm_1.JoinColumn)({ name: 'idProducto' })];
        __esDecorate(null, null, _idCarrito_decorators, { kind: "field", name: "idCarrito", static: false, private: false, access: { has: function (obj) { return "idCarrito" in obj; }, get: function (obj) { return obj.idCarrito; }, set: function (obj, value) { obj.idCarrito = value; } }, metadata: _metadata }, _idCarrito_initializers, _idCarrito_extraInitializers);
        __esDecorate(null, null, _idUser_decorators, { kind: "field", name: "idUser", static: false, private: false, access: { has: function (obj) { return "idUser" in obj; }, get: function (obj) { return obj.idUser; }, set: function (obj, value) { obj.idUser = value; } }, metadata: _metadata }, _idUser_initializers, _idUser_extraInitializers);
        __esDecorate(null, null, _idProducto_decorators, { kind: "field", name: "idProducto", static: false, private: false, access: { has: function (obj) { return "idProducto" in obj; }, get: function (obj) { return obj.idProducto; }, set: function (obj, value) { obj.idProducto = value; } }, metadata: _metadata }, _idProducto_initializers, _idProducto_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Carrito = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Carrito = _classThis;
}();
exports.Carrito = Carrito;
