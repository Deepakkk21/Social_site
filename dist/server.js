"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const index_2 = __importDefault(require("./routes/index"));
const index_3 = __importDefault(require("./routes/index"));
require('./database/mongoose');
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: 'Deepak@2110',
    resave: false,
    saveUninitialized: false,
}));
app.use((0, connect_flash_1.default)());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(__dirname + '/assets'));
app.get('/', (req, res) => {
    return res.render("signup", { messages: req.flash() });
});
// Routes
app.use('/auth', index_1.default);
app.use('/user', index_2.default);
app.use('/posts', index_3.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
