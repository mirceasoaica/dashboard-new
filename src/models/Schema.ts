import Resource from './Resource';
import Action from './Action';
import Field from './field.tsx';
// import Text from '../components/Fields/Text';
// import Email from '../components/Fields/Email';
// import Picklist from '../components/Fields/Picklist';
// import Percent from '../components/Fields/Percent';
// import Bool from '../components/Fields/Boolean';
// import Url from '../components/Fields/Url';
// import Id from '../components/Fields/Id';
// import Time from '../components/Fields/Time';
// import Datetime from '../components/Fields/Datetime';
// import Date from '../components/Fields/Date';
// import Daterange from '../components/Fields/Daterange';
// import Color from '../components/Fields/Color';
// import TranslatedText from '../components/Fields/TranslatedText';
// import BelongsTo from '../components/Fields/BelongsTo';
// import Integer from '../components/Fields/Integer';
// import Decimal from '../components/Fields/Decimal';
// import Price from '../components/Fields/Price';
// import Phone from '../components/Fields/Phone';
// import Geo from '../components/Fields/Geo';
// import Ancestors from '../components/Fields/Ancestors';
// import BelongsToMany from '../components/Fields/BelongsToMany';
// import ListOf from '../components/Fields/ListOf';
// import Composed from '../components/Fields/Composed';
// import Password from '../components/Fields/Password';
// import Size from '../components/Fields/Size';
// import RelationField from './RelationField';
// import Svg from '../components/Fields/Svg';
// import WebsiteImage from '../components/Fields/WebsiteImage';
// import Json from '../components/Fields/Json';

interface Permission {
    resource: string;
    field?: string | string[];
    action?: string;
}

export default class Schema {
    private readonly _resources: { [resourceName: string]: Resource } = {};

    public constructor(data: any) {
        Object.keys(data).forEach((resourceName: any) => {
            this.registerResource(resourceName, data[resourceName]);
        });
    }

    private registerResource(name: string, data: any) {
        this._resources[name] = new Resource(data, name);
    }

    public get resources() {
        return this._resources;
    }

    public getResource(name: string) {
        return this._resources[name];
    }

    public hasResource(name: string) {
        return name in this._resources;
    }

    public static processField(fieldData: any): Field | null {
        return null;
        // switch (fieldData.type) {
        //     case 'id':
        //         return new Id(fieldData);
        //     case 'text':
        //     case 'secret':
        //         return new Text(fieldData);
        //     case 'email':
        //         return new Email(fieldData);
        //     case 'phone':
        //         return new Phone(fieldData);
        //     case 'integer':
        //         return new Integer(fieldData);
        //     case 'decimal':
        //         return new Decimal(fieldData);
        //     case 'geo':
        //         return new Geo(fieldData);
        //     case 'picklist':
        //         return new Picklist(fieldData);
        //     case 'percent':
        //         return new Percent(fieldData);
        //     case 'price':
        //         return new Price(fieldData);
        //     case 'boolean':
        //         return new Bool(fieldData);
        //     case 'url':
        //         return new Url(fieldData);
        //     case 'time':
        //         return new Time(fieldData);
        //     case 'datetime':
        //         return new Datetime(fieldData);
        //     case 'date':
        //         return new Date(fieldData);
        //     case 'daterange':
        //         return new Daterange(fieldData);
        //     case 'color':
        //         return new Color(fieldData);
        //     case 'translated-text':
        //         return new TranslatedText(fieldData);
        //     case 'belongs-to':
        //         return new BelongsTo(fieldData);
        //     case 'ancestors':
        //         return new Ancestors(fieldData);
        //     case 'belongs-to-many':
        //         return new BelongsToMany(fieldData);
        //     case 'list-of':
        //         return new ListOf(fieldData);
        //     case 'composed':
        //         return new Composed(fieldData);
        //     case 'password':
        //         return new Password(fieldData);
        //     case 'size':
        //         return new Size(fieldData);
        //     case 'has-many':
        //     case 'has-one':
        //         return new RelationField(fieldData);
        //     case 'svg':
        //         return new Svg(fieldData);
        //     case 'website-image':
        //         return new WebsiteImage(fieldData);
        //     case 'json':
        //         return new Json(fieldData);
        //     default:
        //         return null;
        // }
    }

    public findField(
        resource: string,
        field: string,
        action?: string,
    ): Field | null {
        if (!this.hasResource(resource)) {
            return null;
        }

        const res = this.getResource(resource) as Resource;

        if (action) {
            if (!res.hasAction(action)) {
                return null;
            }

            const act = res.getAction(action) as Action;

            if (act.hasArg(field)) {
                return act.getArg(field) as Field;
            }
        } else {
            const fieldSplit = field.split('.');

            // field is base field
            if (fieldSplit.length === 1 && res.hasField(field)) {
                return res.getField(field) as Field;
            }

            // field is path to field
            const relationFields = fieldSplit.slice(0, -1);
            let finalField: any = null;
            let currentResource = res;

            relationFields.forEach((field: string) => {
                finalField = currentResource.getField(field);
                currentResource = this.getResource(finalField.relatesTo);
            });

            return currentResource?.getField(fieldSplit[fieldSplit.length - 1]);
        }

        return null;
    }

    public fieldPathToLabelArray(resourceName: string, path: string): string[] {
        let currentResource = this.getResource(resourceName) as Resource;

        const pathSplit = path.split('.');

        // field is base field
        if (pathSplit.length === 1) {
            return [currentResource.getField(path).label];
        }

        // field is path to field
        let result: any = [];
        let resource = currentResource;

        pathSplit.forEach((f: string) => {
            const field: any = resource.getField(f);

            result.push(field.label);
            resource = this.getResource(field.relatesTo);
        });

        return result;
    }

    public getResourcesFromPath(resourceName: string, path: string): string[] {
        let currentResource = this.getResource(resourceName) as Resource;
        let currentField: any = null;
        const pathSplit = path.split('.');
        const ancestors = pathSplit.slice(0, -1);

        return ancestors.map((item: string) => {
            currentField = currentResource.getField(item);
            currentResource = this.getResource(currentField.relatesTo);

            return currentResource.name;
        });
    }

    public canAny(permissions: Permission[]): boolean {
        let allowed = false;

        permissions.forEach((p) => {
            allowed = allowed || this.can(p.resource, p.field, p.action);
        });

        return allowed;
    }

    public canAll(permissions: Permission[]): boolean {
        let allowed = permissions.length > 0;

        permissions.forEach((p) => {
            allowed = allowed && this.can(p.resource, p.field, p.action);
        });

        return allowed;
    }

    public canAction(resource: string, action: string | string[]): boolean {
        if (Array.isArray(action)) {
            let allowed = true;

            action.forEach((a) => {
                allowed = allowed && this.can(resource, undefined, a);
            });

            return allowed && action.length > 0;
        }

        return this.can(resource, undefined, action);
    }

    public can(
        resource: string,
        field?: string | string[],
        action?: string | string[],
    ): boolean {
        if (!this.hasResource(resource)) {
            return false;
        }

        let res = this.getResource(resource) as Resource;

        if (action) {
            if (Array.isArray(action)) {
                return this.canAction(resource, action);
            }

            if (!res.hasAction(action)) {
                return false;
            }

            let act = res.getAction(action) as Action;

            if (field) {
                return act.hasArg(field);
            }

            return true;
        }

        if (typeof field === 'string') {
            const names = field.split('.');
            if (names.length > 1) {
                return this.hasFieldPath(names, res);
            }
            return res.hasField(field);
        } else if (Array.isArray(field) && field.length > 0) {
            return this.canAny(
                field.map((f) => ({ resource: res.name, field: f })),
            );
        }

        return true;
    }

    public hasFieldPath(names: string[], res: Resource): boolean {
        const relations = names.slice(0, -1);
        let resource: Resource = res;
        let exists = true;

        relations.forEach((relation) => {
            exists = exists && resource.hasField(relation);

            if (exists) {
                const relationField = resource.getField(relation);
                if (relationField instanceof RelationField) {
                    resource = this.getResource(relationField.relatesTo);
                } else {
                    exists = false;
                }
            }
        });

        if (exists) {
            return resource.hasField(names[names.length - 1]);
        }

        return false;
    }

    public findFieldAtPath(resource: string, path: string) {
        if (!this.hasResource(resource)) {
            return null;
        }

        let res: Resource = this.getResource(resource);
        const pathSplit = path.split('.');
        const relations = pathSplit.slice(0, -1);
        let exists = true;

        relations.forEach((relation) => {
            exists = exists && res.hasField(relation);

            if (exists) {
                const relationField = res.getField(relation);
                if (relationField instanceof RelationField) {
                    res = this.getResource(relationField.relatesTo);
                } else {
                    exists = false;
                }
            }
        });

        if (exists) {
            return res.getField(pathSplit[pathSplit.length - 1]);
        }

        return null;
    }

    public findFieldResourceAtPath(resource: string, path: string) {
        const pathSplit = path.split('.');

        return pathSplit.length > 1
            ? pathSplit[pathSplit.length - 2]
            : resource;
    }

    public findFieldParentResources(resource: string, path: string) {
        let result: Resource[] = [];
        const pathSplit = path.split('.');
        const res = this.getResource(resource);

        if (res && this.hasFieldPath(pathSplit, res)) {
            const relations = pathSplit.slice(0, -1);

            relations.forEach((relation) => {
                const relationField = res.getField(relation);
                result.push(
                    this.getResource(
                        (relationField as RelationField).relatesTo,
                    ),
                );
            });
        }

        return result;
    }
}
