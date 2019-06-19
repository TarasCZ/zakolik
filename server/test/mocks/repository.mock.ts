export class RepositoryMock<T> {
    set findOneResult(value: T) {
        this.findOne.and.returnValue(new Promise((resolve) => resolve(value)));
    }

    find = jasmine.createSpy('findSpy');
    findOne = jasmine.createSpy('findOneSpy');
    save = jasmine.createSpy('saveSpy').and.callFake((param) => param);
    delete = jasmine.createSpy('deleteSpy');
}
