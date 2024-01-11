
export interface IRepository {
    findById(id: string): any;
    findAll(): any;
    save(obj:any): void;
}