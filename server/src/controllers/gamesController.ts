import { Request, Response } from 'express';

import db from '../database';

class GamesController {
    public async list(req: Request, res: Response): Promise<void> {
        const games = await db.query('SELECT * FROM videojuego');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await db.query('SELECT * FROM videojuego WHERE COD_VIDEOJUEGO = ?', [id]);
        res.json(games[0]);
    }

    public async create(req: Request, res: Response): Promise<void> {

        await db.query('INSERT INTO videojuego set ?', [req.body]);
        // Envio de parametro
        console.log(req.body);
        res.json({ messasge: 'creando un juego' });
    }

    public async update(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        await db.query('UPDATE videojuego set ? WHERE COD_VIDEOJUEGO = ?', [req.body, id]);
        res.json({ messasge: 'actu un juego' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await db.query('DELETE FROM videojuego WHERE COD_VIDEOJUEGO = ?', [id]);
        res.json({ messge: 'Juego borrado' })
    }

    
}

const gamesController = new GamesController();
export default gamesController;