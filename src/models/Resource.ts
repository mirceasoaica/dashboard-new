import Field from './field.tsx';
import Action from './Action';
import Schema from './Schema';

export default class Resource {
    private _name: string;
    private readonly _image: string;
    private readonly _description: string;

    private readonly _fields: { [fieldName: string]: Field } = {};
    private readonly _actions: { [actionName: string]: Action } = {};

    public constructor(data: any, name: string) {
        this._name = name;
        this._image = data?.image || '';
        this._description = data?.name || '';
        this.buildFields(data.fields);
        this.buildActions(data.actions || []);
    }

    public set name(value: string) {
        this._name = value;
    }

    public get name() {
        return this._name;
    }

    public get image() {
        return this._image;
    }

    public get description() {
        return this._description;
    }

    public get fields() {
        return this._fields;
    }

    public getField<F extends Field = Field>(name: string): F {
        return this._fields[name] as F;
    }

    public hasField(name: string) {
        return name in this._fields;
    }

    public hasAction(name: string) {
        return name in this._actions;
    }

    public getAction(name: string) {
        return this._actions[name];
    }

    private buildFields(data: any) {
        if (data) {
            Object.keys(data).forEach((fieldName: any) => {
                const field = Schema.processField(data[fieldName]);
                if (field) {
                    this._fields[fieldName] = field;
                }
            });
        }
    }

    private buildActions(data: any) {
        if (data) {
            Object.keys(data).forEach((actionName: any) => {
                this._actions[actionName] = new Action(
                    data[actionName],
                    actionName,
                );
            });
        }
    }
}
