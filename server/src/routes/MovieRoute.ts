import Express from 'express';
import { MovieService } from '../services/MovieService';
import ResponseHandler from './RequestHandler';
import { SearchCondition } from '../entities/SearchCondition';

const router = Express.Router();

router.get('/:id', async (req, res) => {
  try {
    const result = await MovieService.findById(req.params.id);
    ResponseHandler.sendData(result, res);
  } catch (error) {
    ResponseHandler.sendData(null, res);
  }
})

router.get('/', async (req, res) => {
  const result = await MovieService.find(req.query as any as SearchCondition);
  ResponseHandler.sendPageData(result, res);
})

router.post('/', async (req, res) => {
  const result = await MovieService.add(req.body);
  if (Array.isArray(result)) {
    ResponseHandler.sendError(result, res);
  } else {
    ResponseHandler.sendData(result, res);
  }
})

router.put('/:id', async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHandler.sendError(result, res);
    } else {
      ResponseHandler.sendData(true, res)
    }
  } catch {
    ResponseHandler.sendError("id错误", res)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await MovieService.delete(req.params.id);
    ResponseHandler.sendData(true, res)
  } catch {
    ResponseHandler.sendError("id错误", res)
  }
})

export default router;