import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router: Router = Router();

router.post('/save', (req: Request, res: Response) => {
    const themeData = req.body;
    const themePath = path.join(__dirname, '../../../theme-blueprint.json');
    fs.writeFile(themePath, JSON.stringify(themeData, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to save theme' });
        }
        res.send({ success: true });
    });
});

export default router;
