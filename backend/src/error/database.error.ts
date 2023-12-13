export class DatabaseError extends Error {
    public name: string;
    public message: string;
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
        this.message = message;
    }
}