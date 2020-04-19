import { IProduct } from '@entities/Beer';
import { getRandomInt } from '@shared/functions';
import { IProductDao } from './BeerDao';
import { BeerDaoMock } from '@daos/BeerDb/MockBeerDb.mock';


class BeerDao extends BeerDaoMock implements IProductDao {


    public async getOne(name: string): Promise<IProduct | null> {
        try {
            const db = await super.openDb();
            for (const beer of db.beers) {
                if (beer.name === name) {
                    return beer;
                }
            }
            return null;
        } catch (err) {
            throw err;
        }
    }


    public async getAll(): Promise<IProduct[]> {
        try {
            const db = await super.openDb();
            return db.beers;
        } catch (err) {
            throw err;
        }
    }


    public async add(beer: IProduct): Promise<void> {
        try {
            const db = await super.openDb();
            beer.id = getRandomInt();
            db.beers.push(beer);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }


    public async update(beer: IProduct): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.beers.length; i++) {
                if (db.beers[i].id === beer.id) {
                    db.beers[i] = beer;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Beer not found');
        } catch (err) {
            throw err;
        }
    }


    public async delete(id: number): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.beers.length; i++) {
                if (db.beers[i].id === id) {
                    db.beers.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Beer not found');
        } catch (err) {
            throw err;
        }
    }
}

export default BeerDao;
