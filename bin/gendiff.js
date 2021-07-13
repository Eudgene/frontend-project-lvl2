#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();
program
    .description('example')
    .version('0.0.1', '-v, --vers', 'output the current version');

program.parse();
