import "core-js/stable";
import "regenerator-runtime/runtime";

import { launch } from './server'

const PORT = process.env.PORT || 4242;

launch(PORT);