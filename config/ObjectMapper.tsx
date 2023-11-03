class ObjectMapper {
    public readValue<T>(json: string, classType: new () => T): T {
        const obj = JSON.parse(json);
        const instance = new classType();
  
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                (instance as any)[key] = obj[key];
            }
        }
  
        return instance;
    }
}

export { ObjectMapper };
