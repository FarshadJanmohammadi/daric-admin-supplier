declare type ClassesValue =
    | string
    | number
    | null
    | false
    | boolean
    | undefined
    | string[]
    | Record<string, null | boolean | undefined>
    | ClassesValue[];

declare type RecordClasses<T extends string> = Partial<Record<T, ClassesValue>>;

declare type ElementType<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never;

declare interface IBaseModalConfiguration {
    moveable?: boolean;
    animation?: boolean;
    callbackFunction?: () => void;
}
