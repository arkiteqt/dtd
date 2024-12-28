import React from 'react';
import { createRoot } from 'react-dom/client';
import Dtd from './App';
import "./styles/main.scss";

import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fas, fab)

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Dtd />);
