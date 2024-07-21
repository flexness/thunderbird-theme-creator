import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/change', (req: Request, res: Response) => {
    const { color } = req.body;
    console.log(`Color changed to: ${color}`);
    res.send({ success: true, color });
});

export default router;
