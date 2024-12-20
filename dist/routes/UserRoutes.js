"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.post('/register', UserController_1.registerUser);
router.post('/login', UserController_1.loginUser);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map