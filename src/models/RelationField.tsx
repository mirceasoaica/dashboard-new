import Field from './field.tsx';

class RelationField extends Field {
    private readonly _relatesTo: string;

    public constructor(data: any) {
        super(data);

        this._relatesTo = data.relates_to;
    }

    public get relatesTo() {
        return this._relatesTo;
    }
}

export default RelationField;
