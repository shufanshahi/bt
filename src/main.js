import "./styles/index.css";
import { renderRoute } from "./app/router.js";
import { bindInteractions } from "./features/interactions.js";

bindInteractions(renderRoute());
