import { Request, Response, NextFunction } from "express";

export class LibraryController {

    private static instance: LibraryController;

    private constructor() {}

    public static getInstance(): LibraryController {
        if (!LibraryController.instance) {
            LibraryController.instance = new LibraryController();
        }
        return LibraryController.instance;
    }

    public index(request: Request, response: Response, next: NextFunction): void {
        response.json({
            data: [
                {
                    name: "Library 1",
                    location: "Here",
                },
                {
                    name: "Library 2",
                    location: "Here",
                }
            ]
        })
    }
}