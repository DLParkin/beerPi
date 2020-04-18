import jsonfile from 'jsonfile';

export class BeerDbMock {

    private readonly dbFilePath = 'src/daos/BeerDb/BeerDb.json';

    protected openDb(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    protected saveDb(db: any): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}