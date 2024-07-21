import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    const blueprintPath = path.join(__dirname, '../../../theme-blueprint.json');
    fs.readFile(blueprintPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to load blueprint' });
        }
        res.send(JSON.parse(data));
    });
});

export default router;
