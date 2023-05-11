'use strict';

module.exports = {
  apps: [
    {
      name: 'turn-up',
      script: './dist/app.js',
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
      env: { NODE_ENV: 'development' },
      env_production: { NODE_ENV: 'production' },
      ignore_watch: ['node_modules', '.whatap', 'logs', 'paramkey.txt'],
    },
  ],
};
