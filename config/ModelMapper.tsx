class ModelMapper {
    public map<Source, Destination>(source: Source, destinationType: new (...args: any[]) => Destination): Destination {
        const destination = new destinationType(source);

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                (destination as any)[key] = (source as any)[key];
            }
        }

        return destination;
    }
}

export { ModelMapper };
