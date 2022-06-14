import * as commonService from '../service/common.service';
import path from 'path';

/*
  POST /api/common/findVisitorsCntWeek
*/
export const findVisitorsCntWeek = async (req, res) => {
  let result = [];

  try {
    const { prev, next } = req.body;

    result = await commonService.findVisitorsCntWeek(prev, next);
  } catch (e) {
    res.status(500).send({ status: 500, msg: e.message });
    return;
  }

  res.send(result);
};

/*
  POST /api/common/findImage
*/
export const findImage = async (req, res) => {
  const filePath = path.join(__dirname, process.env.IMAGE_PATH);
  console.log(filePath + `/${req.body.image}`);

  res.sendFile(filePath + `/${req.body.image}`);
};
