import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import { readFileSync } from 'fs';

const env = process.env.NODE_ENV || 'development';
const data = readFileSync(`env/.env.${env}`);

const expanded = expand( dotenv.parse(data) );

Object.assign(process.env, expanded);
