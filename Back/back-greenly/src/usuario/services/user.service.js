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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var bcrypt = require("bcrypt");
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var user_1 = require("../entities/user");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
var UserService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserService = _classThis = /** @class */ (function () {
        function UserService_1(userRepository) {
            this.userRepository = userRepository;
        }
        // Método para iniciar sesión
        UserService_1.prototype.login = function (username, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, accessToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: [{ username: username }, { email: username }],
                            })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new common_2.HttpException('User not found', common_2.HttpStatus.NOT_FOUND);
                            }
                            _a = !user.password ||
                                !password;
                            if (_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, bcrypt.compare(password, user.password)];
                        case 2:
                            _a = !(_b.sent());
                            _b.label = 3;
                        case 3:
                            if (_a) {
                                throw new common_2.HttpException('Invalid password', common_2.HttpStatus.UNAUTHORIZED);
                            }
                            accessToken = jwt.sign({ userId: user.idUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UserService_1.prototype.hashPassword = function (password) {
            return __awaiter(this, void 0, void 0, function () {
                var salt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, bcrypt.genSalt()];
                        case 1:
                            salt = _a.sent();
                            return [2 /*return*/, bcrypt.hash(password, salt)];
                    }
                });
            });
        };
        UserService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var adminUser, salt, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            try {
                                dotenv.config();
                            }
                            catch (error) {
                                console.log('Error al cargar las variables de entorno');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { username: 'admin' },
                                })];
                        case 1:
                            adminUser = _b.sent();
                            if (!adminUser) {
                                adminUser = new user_1.User();
                                adminUser.username = process.env.ADMIN_USERNAME;
                                adminUser.email = process.env.ADMIN_EMAIL;
                                adminUser.nombre = process.env.ADMIN_NAME;
                                adminUser.apellido = process.env.ADMIN_LASTNAME;
                            }
                            return [4 /*yield*/, bcrypt.genSalt()];
                        case 2:
                            salt = _b.sent();
                            if (!process.env.ADMIN_PASSWORD) return [3 /*break*/, 5];
                            _a = adminUser;
                            return [4 /*yield*/, bcrypt.hash(process.env.ADMIN_PASSWORD, salt)];
                        case 3:
                            _a.password = _b.sent();
                            return [4 /*yield*/, this.userRepository.save(adminUser)];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 6];
                        case 5: throw new Error('ADMIN_PASSWORD is not defined');
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        UserService_1.prototype.register = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var password, userDetails, hashedPassword, newUser, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Received createUserDto:', createUserDto);
                            password = createUserDto.password, userDetails = __rest(createUserDto, ["password"]);
                            console.log('Password received:', password);
                            return [4 /*yield*/, this.hashPassword(password)];
                        case 1:
                            hashedPassword = _a.sent();
                            newUser = this.userRepository.create(__assign(__assign({}, userDetails), { password: hashedPassword }));
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.userRepository.save(newUser)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            // Aquí podrías manejar errores específicos, por ejemplo, errores de duplicado
                            throw new common_2.HttpException("Error saving user: ".concat(error_1.message), // Aquí podrías personalizar el mensaje de error
                            common_2.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/, newUser];
                    }
                });
            });
        };
        UserService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userRepository.find({
                            select: ["nombre", "img", "idUser"]
                        })];
                });
            });
        };
        UserService_1.prototype.getProfile = function (idUser) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { idUser: idUser } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException("User with ID ".concat(idUser, " not found"));
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UserService_1.prototype.update = function (idUser, updatedData) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, userToUpdate;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log('Received updatedData:', updatedData);
                            if (!updatedData.password) return [3 /*break*/, 2];
                            _a = updatedData;
                            return [4 /*yield*/, this.hashPassword(updatedData.password)];
                        case 1:
                            _a.password = _b.sent();
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.userRepository.preload(__assign({ idUser: idUser }, updatedData))];
                        case 3:
                            userToUpdate = _b.sent();
                            // Si no se encuentra el usuario, lanza una excepción.
                            if (!userToUpdate) {
                                throw new common_1.NotFoundException("User with ID ".concat(idUser, " not found"));
                            }
                            // Guarda el usuario actualizado en la base de datos.
                            return [2 /*return*/, this.userRepository.save(userToUpdate)];
                    }
                });
            });
        };
        return UserService_1;
    }());
    __setFunctionName(_classThis, "UserService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserService = _classThis;
}();
exports.UserService = UserService;
