import Field from './field.tsx';
import Schema from './Schema';

export default class Action {
    private readonly _name: string;

    private readonly _args: { [argName: string]: Field } = {};

    public constructor(data: any, name: string) {
        const { args } = data;
        this._name = name;
        this.buildArgs(args);
    }

    public get name() {
        return this._name;
    }

    public hasArg(name: string | string[]) {
        if (Array.isArray(name)) {
            let allowed = false;

            name.forEach((n) => {
                allowed = allowed || n in this._args;
            });

            return allowed;
        }

        return name in this._args;
    }

    public getArg(name: string) {
        return this._args[name];
    }

    public getArgs() {
        return this._args;
    }

    private buildArgs(data: any) {
        Object.keys(data).forEach((argName: any) => {
            const field = Schema.processField(data[argName]);

            if (field) {
                this._args[field.name] = field;
            }
        });
    }
}
