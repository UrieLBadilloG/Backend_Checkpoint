"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Conexión a la base de datos
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.log('Error conectando a MongoDB:', err));
// Rutas
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
app.use('/users', UserRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map