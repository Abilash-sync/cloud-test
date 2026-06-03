"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
function createApp() {
    const app = (0, express_1.default)();
    // Middleware
    app.use(express_1.default.json());
    // Routes
    app.use('/auth', auth_1.default);
    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    return app;
}
exports.default = createApp;
//# sourceMappingURL=app.js.map