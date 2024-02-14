import express, { Router } from 'express';
import Sequelize from '@sequelize/core';
import { sequelize } from './db/configSequelize';

type MapRoutes = {
  [key: string]: Router;
};

export default class App {
  private server: express.Express;
  private routes: MapRoutes;
  private db: Sequelize;

  constructor(expressServer: express.Express, routes: MapRoutes) {
    this.routes = routes;
    this.server = expressServer;
    this.db = sequelize;
    this.startRoutes();
  }

  private startRoutes() {
    this.server.use(express.json());
    Object.entries(this.routes).forEach(([route, fn]) => {
      this.server.use(`/${route}`, fn);
    });
  }

  startServer(port: Number) {
    this.server.listen(port, () => {
      console.log('The serve is running at port: ', port);
    });
  }
}
