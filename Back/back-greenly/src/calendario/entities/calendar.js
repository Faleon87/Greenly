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
exports.Calendar = void 0;
var typeorm_1 = require("typeorm");
var plantas_1 = require("../../plantas/entities/plantas");
var user_1 = require("../../usuario/entities/user");
var Calendar = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('calendar')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _idCalendario_decorators;
    var _idCalendario_initializers = [];
    var _idCalendario_extraInitializers = [];
    var _fecha_decorators;
    var _fecha_initializers = [];
    var _fecha_extraInitializers = [];
    var _tipoAcción_decorators;
    var _tipoAcción_initializers = [];
    var _tipoAcción_extraInitializers = [];
    var _idPlanta_decorators;
    var _idPlanta_initializers = [];
    var _idPlanta_extraInitializers = [];
    var _idUsuario_decorators;
    var _idUsuario_initializers = [];
    var _idUsuario_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var Calendar = _classThis = /** @class */ (function () {
        function Calendar_1() {
            this.idCalendario = __runInitializers(this, _idCalendario_initializers, void 0);
            this.fecha = (__runInitializers(this, _idCalendario_extraInitializers), __runInitializers(this, _fecha_initializers, void 0));
            this.tipoAcción = (__runInitializers(this, _fecha_extraInitializers), __runInitializers(this, _tipoAcción_initializers, void 0));
            this.idPlanta = (__runInitializers(this, _tipoAcción_extraInitializers), __runInitializers(this, _idPlanta_initializers, void 0));
            this.idUsuario = (__runInitializers(this, _idPlanta_extraInitializers), __runInitializers(this, _idUsuario_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _idUsuario_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        return Calendar_1;
    }());
    __setFunctionName(_classThis, "Calendar");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _idCalendario_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _fecha_decorators = [(0, typeorm_1.Column)({ type: 'date' })];
        _tipoAcción_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 8 })];
        _idPlanta_decorators = [(0, typeorm_1.ManyToOne)(function () { return plantas_1.Plantas; }, function (plantas) { return plantas.idPlanta; })];
        _idUsuario_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.idUser; })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _idCalendario_decorators, { kind: "field", name: "idCalendario", static: false, private: false, access: { has: function (obj) { return "idCalendario" in obj; }, get: function (obj) { return obj.idCalendario; }, set: function (obj, value) { obj.idCalendario = value; } }, metadata: _metadata }, _idCalendario_initializers, _idCalendario_extraInitializers);
        __esDecorate(null, null, _fecha_decorators, { kind: "field", name: "fecha", static: false, private: false, access: { has: function (obj) { return "fecha" in obj; }, get: function (obj) { return obj.fecha; }, set: function (obj, value) { obj.fecha = value; } }, metadata: _metadata }, _fecha_initializers, _fecha_extraInitializers);
        __esDecorate(null, null, _tipoAcción_decorators, { kind: "field", name: "tipoAcci\u00F3n", static: false, private: false, access: { has: function (obj) { return "tipoAcci\u00F3n" in obj; }, get: function (obj) { return obj.tipoAcción; }, set: function (obj, value) { obj.tipoAcción = value; } }, metadata: _metadata }, _tipoAcción_initializers, _tipoAcción_extraInitializers);
        __esDecorate(null, null, _idPlanta_decorators, { kind: "field", name: "idPlanta", static: false, private: false, access: { has: function (obj) { return "idPlanta" in obj; }, get: function (obj) { return obj.idPlanta; }, set: function (obj, value) { obj.idPlanta = value; } }, metadata: _metadata }, _idPlanta_initializers, _idPlanta_extraInitializers);
        __esDecorate(null, null, _idUsuario_decorators, { kind: "field", name: "idUsuario", static: false, private: false, access: { has: function (obj) { return "idUsuario" in obj; }, get: function (obj) { return obj.idUsuario; }, set: function (obj, value) { obj.idUsuario = value; } }, metadata: _metadata }, _idUsuario_initializers, _idUsuario_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Calendar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Calendar = _classThis;
}();
exports.Calendar = Calendar;
