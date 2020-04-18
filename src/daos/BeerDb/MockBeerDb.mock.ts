import jsonfile from 'jsonfile';

export class BeerDaoMock {

    private readonly dbFilePath = 'src/daos/BeerDb/BeerDb.json';

    protected openDb(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    protected saveDb(db: any): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}