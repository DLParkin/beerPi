import { IProduct } from '@entities/Beer';


export interface IProductDao {
    getOne: (name: string) => Promise<IProduct | null>;
    getAll: () => Promise<IProduct[]>;
    add: (name: IProduct) => Promise<void>;
    update: (name: IProduct) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class BeerDao implements IProductDao {

    public async getOne(name: string): Promise<IProduct| null> {
        // TODO
        return [] as any;
    }

    public async getAll(): Promise<IProduct[]> {
        // TODO
        return [] as any;
    }

    public async add(name: IProduct): Promise<void> {
        // TODO
        return {} as any;
    }

    public async update(id: IProduct): Promise<void> {
        // TODO
        return {} as any;
    }

    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}

export default BeerDao;
