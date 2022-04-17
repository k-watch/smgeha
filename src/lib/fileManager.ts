import { Request, Response } from 'express';
import Joi from 'joi';
import fs from 'fs';
const { promisify } = require('util');

export const deleteFile = async (files) => {
  files.map(async (file) => {
    const unlinkAsync = promisify(fs.unlink);
    await unlinkAsync(file.path);
  });
};

export const checkImg = async (req: Request, res: Response, next) => {
  if (req.files) {
    const files = req.files as Array<Express.Multer.File>;

    files.map(async (file) => {
      // mimetype 이미지 확인
      try {
        const type = /(.*?)\/(jpg|jpeg|png)$/;
        if (!file.mimetype.match(type)) {
          deleteFile(req.files);
          return res.status(400).send(file);
        }
      } catch (e) {
        return res.status(500).send(e);
      }
    });
  }
  return next();
};
