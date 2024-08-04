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
exports.CreateLikesDto = void 0;
var class_validator_1 = require("class-validator");
var user_1 = require("../../usuario/entities/user");
var typeorm_1 = require("typeorm");
var CreateLikesDto = function () {
    var _a;
    var _likes_decorators;
    var _likes_initializers = [];
    var _likes_extraInitializers = [];
    var _idUsuario_decorators;
    var _idUsuario_initializers = [];
    var _idUsuario_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateLikesDto() {
                this.likes = __runInitializers(this, _likes_initializers, void 0);
                this.idUsuario = (__runInitializers(this, _likes_extraInitializers), __runInitializers(this, _idUsuario_initializers, void 0));
                __runInitializers(this, _idUsuario_extraInitializers);
            }
            return CreateLikesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _likes_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)()];
            _idUsuario_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.idUser; })];
            __esDecorate(null, null, _likes_decorators, { kind: "field", name: "likes", static: false, private: false, access: { has: function (obj) { return "likes" in obj; }, get: function (obj) { return obj.likes; }, set: function (obj, value) { obj.likes = value; } }, metadata: _metadata }, _likes_initializers, _likes_extraInitializers);
            __esDecorate(null, null, _idUsuario_decorators, { kind: "field", name: "idUsuario", static: false, private: false, access: { has: function (obj) { return "idUsuario" in obj; }, get: function (obj) { return obj.idUsuario; }, set: function (obj, value) { obj.idUsuario = value; } }, metadata: _metadata }, _idUsuario_initializers, _idUsuario_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateLikesDto = CreateLikesDto;
