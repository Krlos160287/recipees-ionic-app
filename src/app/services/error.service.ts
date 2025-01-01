import { Injectable } from "@angular/core";

@Injectable()
export class ErrorService {
    public show(message: string): string {
        return message;
    }
}