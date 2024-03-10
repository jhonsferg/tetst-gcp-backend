import { Request, Response} from 'express';
import { Product } from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    const data = await Product.findAll();

    res.json({
        data
    })
}