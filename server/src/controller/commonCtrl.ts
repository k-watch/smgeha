import * as commonService from '../service/common.service';

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
