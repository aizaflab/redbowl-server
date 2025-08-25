"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./app/config"));
const cloudinary_1 = require("cloudinary");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        cloudinary_1.v2.config({
            cloud_name: 'dhveyw0zn',
            api_key: '223823328644645',
            api_secret: 'm2qwuF2XJFdfldz1qm838xVcmcM',
        });
        // Connect to MongoDB
        yield mongoose_1.default.connect(config_1.default.database);
        console.log("[database]: Connected to MongoDB");
        // Start the server
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`[server]: Server is running at http://localhost:${config_1.default.port}`);
        });
        // Handle graceful shutdown
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("[server]: Received SIGINT. Shutting down gracefully...");
            yield shutdown();
            process.exit(0);
        }));
        process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("[server]: Received SIGTERM. Shutting down gracefully...");
            yield shutdown();
            process.exit(0);
        }));
        // Handle unhandled rejections
        process.on("unhandledRejection", (reason) => {
            console.error("[server]: Unhandled Rejection", reason);
            shutdown().finally(() => process.exit(1));
        });
        // Handle uncaught exceptions
        process.on("uncaughtException", (err) => {
            console.error("[server]: Uncaught Exception", err);
            shutdown().finally(() => process.exit(1));
        });
    }
    catch (err) {
        console.error("[server]: Failed to start the server", err);
        process.exit(1);
    }
});
// Graceful Shutdown Function
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Close server
        if (server) {
            server.close();
        }
        // Disconnect from MongoDB
        yield mongoose_1.default.disconnect();
        console.log("[server]: Shutdown complete.");
    }
    catch (err) {
        console.error("[server]: Error during shutdown", err);
    }
});
main().catch((err) => {
    console.error("[main]: Fatal error during initialization.", err);
    process.exit(1);
});
exports.default = app_1.default;
