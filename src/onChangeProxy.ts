const onChange = <T extends object>(
    object: T,
    onChange:
        | ((propName: string, newValue: any, previousValue: any, updatedObject: T) => void)
        | Record<string, (newValue: any, previousValue: any, updatedObject: T) => void>,
    thisArg?: {}
) => {
    const handler = {
        defineProperty(
            target: Record<string, any>,
            property: string,
            descriptor: PropertyDescriptor & ThisType<any>
        ) {
            if (!Object.is(descriptor.value, target[property])) {
                if (typeof onChange === "function") {
                    // propName, newValue, previousValue, updatedObject
                    onChange.call(
                        thisArg || this,
                        property,
                        descriptor.value,
                        target[property],
                        object
                    );
                } else {
                    // Separate listener for each property
                    // newValue, previousValue, updatedObject
                    onChange[property].call(
                        thisArg || this,
                        descriptor.value,
                        target[property],
                        object
                    );
                }
            }
            return Reflect.defineProperty(target, property, descriptor);
        },
    };

    return new Proxy<T>(object, handler);
};

export { onChange };
