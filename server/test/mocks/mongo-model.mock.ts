export function MongoModelMock() {
    this.mockFunctions = {
        exec: jasmine.createSpy('execSpy'),
        save: jasmine.createSpy('saveSpy'),
    }
    this.find = jasmine.createSpy('findSpy').and.returnValue(this.mockFunctions.exec);
    this.upsert = jasmine.createSpy('constructorSpy').and.returnValue(this.mockFunctions.save);
};
