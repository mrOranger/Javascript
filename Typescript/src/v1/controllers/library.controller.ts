import { Request, Response, NextFunction } from "express";
import { MySqlDataSource } from "../database/mysql.datasource";
import { Book } from "../models";

export class LibraryController {

    private static instance: LibraryController;

    private constructor() {}

    public static getInstance(): LibraryController {
        if (!LibraryController.instance) {
            LibraryController.instance = new LibraryController();
        }
        return LibraryController.instance;
    }

    public index(request: Request, response: Response, next: NextFunction) {
    }
}