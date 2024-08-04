"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantasService = void 0;
var common_1 = require("@nestjs/common");
var plantas_1 = require("../entities/plantas");
var PlantasService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PlantasService = _classThis = /** @class */ (function () {
        function PlantasService_1(plantasRepository, benefPerdRepository) {
            this.plantasRepository = plantasRepository;
            this.benefPerdRepository = benefPerdRepository;
        }
        PlantasService_1.prototype.findAll = function () {
            return this.plantasRepository.find();
        };
        PlantasService_1.prototype.update = function (id, updatePlantasDto) {
            return __awaiter(this, void 0, void 0, function () {
                var planta, error_1, updatedPlanta;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.plantasRepository.findOneOrFail({
                                    where: { idPlanta: id },
                                })];
                        case 1:
                            planta = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            throw new common_1.NotFoundException("Planta with ID ".concat(id, " not found"));
                        case 3:
                            updatedPlanta = Object.assign(planta, updatePlantasDto);
                            return [2 /*return*/, this.plantasRepository.save(updatedPlanta)];
                    }
                });
            });
        };
        PlantasService_1.prototype.findOne = function (id) {
            return this.plantasRepository.findOne({ where: { idPlanta: id } });
        };
        PlantasService_1.prototype.findBeneficiosPerjudiciales = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.benefPerdRepository.find({
                            where: { idPlanta: id },
                        })];
                });
            });
        };
        PlantasService_1.prototype.getPlantWithState = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var planta, benefPerd, plantasReferenciadas;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            planta = _a.sent();
                            return [4 /*yield*/, this.findBeneficiosPerjudiciales(id)];
                        case 2:
                            benefPerd = _a.sent();
                            console.log('benefPerd', benefPerd);
                            console.log('planta', planta);
                            if (!benefPerd.length) {
                                console.log('No se encontraron beneficios o perjuicios para la planta con id ' + id);
                                return [2 /*return*/, {
                                        plantaOriginal: this.formatPlantData(planta),
                                        plantasReferenciadas: [],
                                    }];
                            }
                            return [4 /*yield*/, Promise.all(benefPerd.map(function (benefPerdItem) { return __awaiter(_this, void 0, void 0, function () {
                                    var plantaReferenciada;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.findOne(benefPerdItem.idBeneficioPerjudicial)];
                                            case 1:
                                                plantaReferenciada = _a.sent();
                                                return [2 /*return*/, __assign(__assign({}, this.formatPlantData(plantaReferenciada)), { estado: benefPerdItem.boolean ? 'beneficiosa' : 'perjudicial' })];
                                        }
                                    });
                                }); }))];
                        case 3:
                            plantasReferenciadas = _a.sent();
                            return [2 /*return*/, {
                                    plantaOriginal: this.formatPlantData(planta),
                                    plantasReferenciadas: plantasReferenciadas,
                                }];
                    }
                });
            });
        };
        PlantasService_1.prototype.formatPlantData = function (planta) {
            return planta;
        };
        PlantasService_1.prototype.create = function (createPlantDto) {
            return __awaiter(this, void 0, void 0, function () {
                var planta;
                return __generator(this, function (_a) {
                    planta = new plantas_1.Plantas();
                    planta.nombrePlanta = createPlantDto.nombrePlanta;
                    planta.nombreCientifico = createPlantDto.nombreCientifico;
                    planta.identificacion = createPlantDto.identificacion;
                    planta.img = createPlantDto.img;
                    planta.siembra = createPlantDto.siembra;
                    planta.temporadaSiembra = createPlantDto.temporadaSiembra;
                    planta.ProfundSiembra = createPlantDto.profundSiembra;
                    planta.distanciaPlantas = createPlantDto.distanciaPlantas;
                    planta.rotaciones = createPlantDto.rotaciones;
                    planta.climaTemperatura = createPlantDto.climaTemperatura;
                    planta.riego = createPlantDto.riego;
                    planta.riegoEstimado = createPlantDto.riegoEstimado;
                    return [2 /*return*/, this.plantasRepository.save(planta)];
                });
            });
        };
        return PlantasService_1;
    }());
    __setFunctionName(_classThis, "PlantasService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlantasService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlantasService = _classThis;
}();
exports.PlantasService = PlantasService;
