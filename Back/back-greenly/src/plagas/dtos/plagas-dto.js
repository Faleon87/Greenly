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
exports.PlagasDto = void 0;
var class_validator_1 = require("class-validator");
var PlagasDto = function () {
    var _a;
    var _idPlaga_decorators;
    var _idPlaga_initializers = [];
    var _idPlaga_extraInitializers = [];
    var _img_decorators;
    var _img_initializers = [];
    var _img_extraInitializers = [];
    var _nombrePlaga_decorators;
    var _nombrePlaga_initializers = [];
    var _nombrePlaga_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PlagasDto() {
                this.idPlaga = __runInitializers(this, _idPlaga_initializers, void 0);
                this.img = (__runInitializers(this, _idPlaga_extraInitializers), __runInitializers(this, _img_initializers, void 0));
                this.nombrePlaga = (__runInitializers(this, _img_extraInitializers), __runInitializers(this, _nombrePlaga_initializers, void 0));
                __runInitializers(this, _nombrePlaga_extraInitializers);
            }
            return PlagasDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _idPlaga_decorators = [(0, class_validator_1.IsNumber)()];
            _img_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            _nombrePlaga_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _idPlaga_decorators, { kind: "field", name: "idPlaga", static: false, private: false, access: { has: function (obj) { return "idPlaga" in obj; }, get: function (obj) { return obj.idPlaga; }, set: function (obj, value) { obj.idPlaga = value; } }, metadata: _metadata }, _idPlaga_initializers, _idPlaga_extraInitializers);
            __esDecorate(null, null, _img_decorators, { kind: "field", name: "img", static: false, private: false, access: { has: function (obj) { return "img" in obj; }, get: function (obj) { return obj.img; }, set: function (obj, value) { obj.img = value; } }, metadata: _metadata }, _img_initializers, _img_extraInitializers);
            __esDecorate(null, null, _nombrePlaga_decorators, { kind: "field", name: "nombrePlaga", static: false, private: false, access: { has: function (obj) { return "nombrePlaga" in obj; }, get: function (obj) { return obj.nombrePlaga; }, set: function (obj, value) { obj.nombrePlaga = value; } }, metadata: _metadata }, _nombrePlaga_initializers, _nombrePlaga_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PlagasDto = PlagasDto;
