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
exports.Abonos = void 0;
var typeorm_1 = require("typeorm");
var productos_1 = require("src/productos/entities/productos");
var Abonos = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('abonos')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idAbono_decorators;
    var _idAbono_initializers = [];
    var _idAbono_extraInitializers = [];
    var _tipoAbono_decorators;
    var _tipoAbono_initializers = [];
    var _tipoAbono_extraInitializers = [];
    var _productos_decorators;
    var _productos_initializers = [];
    var _productos_extraInitializers = [];
    var Abonos = _classThis = /** @class */ (function () {
        function Abonos_1() {
            this.idAbono = __runInitializers(this, _idAbono_initializers, void 0);
            this.tipoAbono = (__runInitializers(this, _idAbono_extraInitializers), __runInitializers(this, _tipoAbono_initializers, void 0));
            this.productos = (__runInitializers(this, _tipoAbono_extraInitializers), __runInitializers(this, _productos_initializers, void 0));
            __runInitializers(this, _productos_extraInitializers);
        }
        return Abonos_1;
    }());
    __setFunctionName(_classThis, "Abonos");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idAbono_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _tipoAbono_decorators = [(0, typeorm_1.Column)()];
        _productos_decorators = [(0, typeorm_1.OneToOne)(function () { return productos_1.Productos; }, function (productos) { return productos.abonos; }), (0, typeorm_1.JoinColumn)({ name: 'idProducto' })];
        __esDecorate(null, null, _idAbono_decorators, { kind: "field", name: "idAbono", static: false, private: false, access: { has: function (obj) { return "idAbono" in obj; }, get: function (obj) { return obj.idAbono; }, set: function (obj, value) { obj.idAbono = value; } }, metadata: _metadata }, _idAbono_initializers, _idAbono_extraInitializers);
        __esDecorate(null, null, _tipoAbono_decorators, { kind: "field", name: "tipoAbono", static: false, private: false, access: { has: function (obj) { return "tipoAbono" in obj; }, get: function (obj) { return obj.tipoAbono; }, set: function (obj, value) { obj.tipoAbono = value; } }, metadata: _metadata }, _tipoAbono_initializers, _tipoAbono_extraInitializers);
        __esDecorate(null, null, _productos_decorators, { kind: "field", name: "productos", static: false, private: false, access: { has: function (obj) { return "productos" in obj; }, get: function (obj) { return obj.productos; }, set: function (obj, value) { obj.productos = value; } }, metadata: _metadata }, _productos_initializers, _productos_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Abonos = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Abonos = _classThis;
}();
exports.Abonos = Abonos;
