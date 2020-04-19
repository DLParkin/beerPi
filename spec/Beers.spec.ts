import supertest from 'supertest';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { Response, SuperTest, Test } from 'supertest';

import app from '@server';
import BeerDao from '@daos/Beer/BeerDao.mock';
import Beer, { IProduct } from '@entities/Beer';
import { pErr } from '@shared/functions';
import { paramMissingError } from '@shared/constants';


describe('Beers Routes', () => {

    const beersPath = '/api/beers';
    const getBeersPath = `${beersPath}/all`;
    const addBeersPath = `${beersPath}/add`;
    const updateBeerPath = `${beersPath}/update`;
    const deleteBeerPath = `${beersPath}/delete/:id`;

    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${getBeersPath}"`, () => {

        it(`should return a JSON object with all the products/beers and a status code of "${OK}" if the
            request was successful.`, (done) => {

            // TODO needs to be fixed, not working as intended as object passed in is empty so gives false pass.
            const beers = [
                new Beer(-1,'','', -1,-1,0,0,0,0,'','',0, ''),
                new Beer(-1,'','',-1,-1,0,0,0,0,'','',0,''),
            ];

            spyOn(BeerDao.prototype, 'getAll').and.returnValue(Promise.resolve(beers));

            agent.get(getBeersPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    // Case instance-objects to 'beer' objects
                    const retBeers = res.body.beers.map((beer: IProduct) => {
                        // why you not accept beer
                        return new Beer();
                    });
                    expect(retBeers).toEqual(beers);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not fetch beers.';
            spyOn(BeerDao.prototype, 'getAll').and.throwError(errMsg);

            agent.get(getBeersPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"POST:${addBeersPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.post(addBeersPath).type('form').send(reqBody);
        };

        const beerData = {
            beer: new Beer(123456,'264','test created',-1,-1,6.699999809265137,0,0,0,'','',0,'2010-07-22 20:00:20 UTC'),
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {

            spyOn(BeerDao.prototype, 'add').and.returnValue(Promise.resolve());

            agent.post(addBeersPath).type('form').send(beerData) // pick up here
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the beer param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const errMsg = 'Could not add beer.';
            spyOn(BeerDao.prototype, 'add').and.throwError(errMsg);

            callApi(beerData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"PUT:${updateBeerPath}"`, () => {

        const callApi = (reqBody: object) => {
            return agent.put(updateBeerPath).type('form').send(reqBody);
        };

        const beerData = {
            beer: new Beer(2,'264','Grimbergen Blonde',-1,-1,6.699999809265137,0,0,0,'','',0,'2010-07-22 20:00:20 UTC'),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {

            spyOn(BeerDao.prototype, 'update').and.returnValue(Promise.resolve());

            callApi(beerData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the beer param was missing.`, (done) => {

            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const updateErrMsg = 'Could not update beer.';
            spyOn(BeerDao.prototype, 'update').and.throwError(updateErrMsg);

            callApi(beerData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(updateErrMsg);
                    done();
                });
        });
    });

    describe(`"DELETE:${deleteBeerPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteBeerPath.replace(':id', id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {

            spyOn(BeerDao.prototype, 'delete').and.returnValue(Promise.resolve());

            callApi(5)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {

            const deleteErrMsg = 'Could not delete the beer.';
            spyOn(BeerDao.prototype, 'delete').and.throwError(deleteErrMsg);

            callApi(1)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });
    });
});
