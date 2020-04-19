export interface IProduct {
  id: number;
  breweryId: string;
  name: string;
  catId: number;
  styleId: number;
  abv: number;
  ibu: number;
  srm: number;
  upc: number;
  filepath: string;
  descript: string;
  addUser: number;
  lastMod: string;
}

class Beer implements IProduct {
  public id: number;

  public breweryId: string;
  public name: string;

  public catId: number;

  public styleId: number;
  public abv: number;
  public ibu: number;
  public srm: number;
  public upc: number;
  public filepath: string;
  public descript: string;

  public addUser: number;

  public lastMod: string;

  constructor(
    id?: number,
    breweryId?: string,
    name?: string,
    catId?: number,
    styleId?: number,
    abv?: number,
    ibu?: number,
    srm?: number,
    upc?: number,
    filepath?: string,
    descript?: string,
    addUser?: number,
    lastMod?: string
  ) {
      this.id = id || -1;
      this.breweryId = breweryId || '';
      this.name = name || '';
      this.catId = catId || -1;
      this.styleId = styleId || -1;
      this.abv = abv || 0;
      this.ibu = ibu || 0;
      this.srm = srm || 0;
      this.upc = upc || 0;
      this.filepath = filepath || '';
      this.descript = descript || '';
      this.addUser = addUser || 0;
      this.lastMod = lastMod || '';
  }
}

export default Beer;
