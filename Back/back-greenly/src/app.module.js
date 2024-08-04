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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var plantas_service_1 = require("./plantas/services/plantas.service");
var plantas_controller_1 = require("./plantas/controllers/plantas.controller");
var plantas_1 = require("./plantas/entities/plantas");
var user_controller_1 = require("./usuario/controllers/user.controller");
var user_service_1 = require("./usuario/services/user.service");
var user_1 = require("./usuario/entities/user");
var foto_preguntas_1 = require("./chat/entities/foto-preguntas");
var pregunta_1 = require("./chat/entities/pregunta");
var likes_1 = require("./chat/entities/likes");
var respuestas_1 = require("./chat/entities/respuestas");
var benef_perd_1 = require("./beneficios_per/entities/benef_perd");
var chat_controller_1 = require("./chat/controllers/chat.controller");
var pregunta_service_service_1 = require("./chat/services/pregunta-service.service");
var foto_preguntas_service_1 = require("./chat/services/foto-preguntas.service");
var likes_service_1 = require("./chat/services/likes.service");
var plagas_controller_1 = require("./plagas/controller/plagas.controller");
var plagas_service_1 = require("./plagas/services/plagas.service");
var plagas_1 = require("./plagas/entities/plagas");
var plagas_dto_detail_1 = require("./plagas/dtos/plagas-dto-detail");
var fertilizantes_1 = require("./fertilizantes/entities/fertilizantes");
var fertilizantes_controller_1 = require("./fertilizantes/controllers/fertilizantes.controller");
var fertilizantes_service_1 = require("./fertilizantes/services/fertilizantes.service");
var calendar_controller_1 = require("./calendario/controllers/calendar.controller");
var calendar_service_1 = require("./calendario/services/calendar.service");
var calendar_1 = require("./calendario/entities/calendar");
var productos_controller_1 = require("./productos/controller/productos.controller");
var productos_service_1 = require("./productos/servicies/productos.service");
var herramientas_controller_1 = require("./herramientas/controller/herramientas.controller");
var herramientas_service_1 = require("./herramientas/servicies/herramientas.service");
var semillas_controller_1 = require("./semillas/controller/semillas.controller");
var semillas_service_1 = require("./semillas/servicies/semillas.service");
var abonos_controller_1 = require("./abonos/controller/abonos.controller");
var abonos_service_1 = require("./abonos/servicies/abonos.service");
var carrito_controller_1 = require("./carrito/controller/carrito.controller");
var carrito_service_1 = require("./carrito/servicies/carrito.service");
var abonos_1 = require("./abonos/entities/abonos");
var herramientas_1 = require("./herramientas/entities/herramientas");
var semillas_1 = require("./semillas/entities/semillas");
var productos_1 = require("./productos/entities/productos");
var carrito_1 = require("./carrito/entities/carrito");
var tarjeta_controller_1 = require("./tarjeta/controller/tarjeta.controller");
var tarjeta_service_1 = require("./tarjeta/servicies/tarjeta.service");
var tarjeta_1 = require("./tarjeta/entities/tarjeta");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres', // Cambia esto por el tipo de base de datos que estás usando
                    host: 'greenly.c9k3e9wvgt2e.us-east-1.rds.amazonaws.com', // Cambia esto por tu host
                    port: 5432, // Cambia esto por tu puerto
                    username: 'viju', // Cambia esto por tu nombre de usuario
                    password: 'Viju2003$', // Cambia esto por tu contraseña
                    database: 'postgres', // Cambia esto por tu nombre de base de datos
                    entities: [
                        plantas_1.Plantas,
                        user_1.User,
                        foto_preguntas_1.FotoPreguntas,
                        pregunta_1.Pregunta,
                        likes_1.Likes,
                        respuestas_1.Respuestas,
                        benef_perd_1.BenefPerd,
                        plagas_1.Plagas,
                        fertilizantes_1.Fertilizantes,
                        calendar_1.Calendar,
                        herramientas_1.Herramientas,
                        semillas_1.Semillas,
                        abonos_1.Abonos,
                        productos_1.Productos,
                        carrito_1.Carrito,
                        tarjeta_1.Tarjeta,
                    ],
                    synchronize: true,
                    ssl: true,
                    extra: {
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    },
                }),
                typeorm_1.TypeOrmModule.forFeature([
                    plantas_1.Plantas,
                    user_1.User,
                    foto_preguntas_1.FotoPreguntas,
                    pregunta_1.Pregunta,
                    likes_1.Likes,
                    respuestas_1.Respuestas,
                    benef_perd_1.BenefPerd,
                    plagas_1.Plagas,
                    fertilizantes_1.Fertilizantes,
                    calendar_1.Calendar,
                    productos_1.Productos,
                    herramientas_1.Herramientas,
                    semillas_1.Semillas,
                    abonos_1.Abonos,
                    carrito_1.Carrito,
                    tarjeta_1.Tarjeta
                ]),
            ],
            controllers: [
                app_controller_1.AppController,
                plantas_controller_1.PlantasController,
                user_controller_1.UserController,
                chat_controller_1.ChatController,
                plagas_controller_1.PlagasController,
                fertilizantes_controller_1.FertilizantesController,
                calendar_controller_1.CalendarController,
                productos_controller_1.ProductosController,
                herramientas_controller_1.HerramientasController,
                semillas_controller_1.SemillasController,
                abonos_controller_1.AbonosController,
                carrito_controller_1.CarritoController,
                tarjeta_controller_1.TarjetaController,
            ],
            providers: [
                app_service_1.AppService,
                plantas_service_1.PlantasService,
                user_service_1.UserService,
                pregunta_service_service_1.PreguntaServiceService,
                foto_preguntas_service_1.FotoPreguntasService,
                likes_service_1.LikesService,
                plagas_service_1.PlagasService,
                plagas_dto_detail_1.PlagasDtoDetail,
                fertilizantes_service_1.FertilizantesService,
                calendar_service_1.CalendarService,
                productos_service_1.ProductosService,
                herramientas_service_1.HerramientasService,
                semillas_service_1.SemillasService,
                abonos_service_1.AbonosService,
                carrito_service_1.CarritoService,
                tarjeta_service_1.TarjetaService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
