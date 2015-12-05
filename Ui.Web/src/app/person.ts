class Person {
    private _firstName: string;

    constructor(firstName: string) {
        this._firstName = firstName;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }
}
