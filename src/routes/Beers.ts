import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import BeerDao from '@daos/Beer/BeerDao.mock';
import { paramMissingError } from '@shared/constants';

// Init shared
const router = Router();
const beerDao = new BeerDao();


/******************************************************************************
 *                      Get All Beers - "GET /api/beers/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const beers = await beerDao.getAll();
    return res.status(OK).json({beers});
});


/******************************************************************************
 *                       Add One - "POST /api/beers/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { beer } = req.body;
    if (!beer) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await beerDao.add(beer);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/beers/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { beer } = req.body;
    if (!beer) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    beer.id = Number(beer.id);
    await beerDao.update(beer);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/beers/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await beerDao.delete(Number(id));
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
