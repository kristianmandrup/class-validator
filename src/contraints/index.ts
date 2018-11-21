import { ValidationTypes } from "../validation/ValidationTypes";
import { IsNumberOptions } from "../validation/ValidationTypeOptions";
import { ValidationOptions } from "../validation/ValidationOptions";
import { ValidationMetadata } from "../metadata/ValidationMetadata";
import { ValidationMetadataArgs } from "../metadata/ValidationMetadataArgs";
import { getFromContainer } from "../container";
import { MetadataStorage } from "../metadata/MetadataStorage";
import { ConstraintMetadata } from "../metadata/ConstraintMetadata";

export function addValidatorConstraint(
    target: Function,
    options?: { name?: string; async?: boolean }
) {
    const isAsync = options && options.async ? true : false;
    let name = options && options.name ? options.name : "";
    if (!name) {
        name = (target as any).name;
        if (!name)
            // generate name if it was not given
            name = name
                .replace(/\.?([A-Z]+)/g, (x, y) => "_" + y.toLowerCase())
                .replace(/^_/, "");
    }
    const metadata = new ConstraintMetadata(target, name, isAsync);
    getFromContainer(MetadataStorage).addConstraintMetadata(metadata);
}

export function addValidate(
    object: Object,
    propertyName: string,
    options: {
        constraintClass: Function;
        constraintsOrValidationOptions?: any[] | ValidationOptions;
        maybeValidationOptions?: ValidationOptions;
    }
) {
    const {
        constraintClass,
        constraintsOrValidationOptions,
        maybeValidationOptions
    } = options;
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.CUSTOM_VALIDATION,
        target: object.constructor,
        propertyName: propertyName,
        constraintCls: constraintClass,
        constraints:
            constraintsOrValidationOptions instanceof Array
                ? (constraintsOrValidationOptions as any[])
                : undefined,
        validationOptions: !(constraintsOrValidationOptions instanceof Array)
            ? (constraintsOrValidationOptions as ValidationOptions)
            : maybeValidationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateNested(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.NESTED_VALIDATION,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateAllow(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.WHITELIST,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIf(
    object: Object,
    propertyName: string,
    condition: (object: any, value: any) => boolean,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [condition],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateDefined(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_DEFINED,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateEquals(
    object: Object,
    propertyName: string,
    comparison: any,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.EQUALS,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [comparison],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateNotEquals(
    object: Object,
    propertyName: string,
    comparison: any,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.NOT_EQUALS,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [comparison],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsEmpty(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_EMPTY,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsNotEmpty(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_NOT_EMPTY,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsIn(
    object: Object,
    propertyName: string,
    values: any[],
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_IN,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [values],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsNotIn(
    object: Object,
    propertyName: string,
    values: any[],
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_NOT_IN,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [values],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsOptional(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [
            (object: any, value: any) => {
                return (
                    object[propertyName] !== null &&
                    object[propertyName] !== undefined
                );
            }
        ],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsBoolean(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_BOOLEAN,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsDate(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_DATE,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsNumber(
    object: Object,
    propertyName: string,
    options: IsNumberOptions = {},
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_NUMBER,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [options],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsInt(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_INT,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsString(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_STRING,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsDateString(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_DATE_STRING,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsArray(
    object: Object,
    propertyName: string,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_ARRAY,
        target: object.constructor,
        propertyName: propertyName,
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}

export function addValidateIsEnum(
    object: Object,
    propertyName: string,
    entity: Object,
    validationOptions?: ValidationOptions
) {
    const args: ValidationMetadataArgs = {
        type: ValidationTypes.IS_ENUM,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [entity],
        validationOptions: validationOptions
    };
    getFromContainer(MetadataStorage).addValidationMetadata(
        new ValidationMetadata(args)
    );
}
