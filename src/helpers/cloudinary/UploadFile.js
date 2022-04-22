import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { STATUSES } from '../../constants/ResponseStatuses';

const FileUploader = {
  upload: async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(err.httpCode || STATUSES.BAD_REQUEST).send(({
          status: STATUSES.BAD_REQUEST,
          message: err.message,
        }));
        return;
      }
      cloudinary.uploader.upload(files.fille.filepath, { folder: 'dotpharma' }).then((result) => {
        if (result.public_id) {
          res.status(STATUSES.OK).send(({
            status: STATUSES.OK,
            url: result.url,
            secure_url: result.secure_url,
            message: 'Image uploaded successfully',
          }));
        }
      }).catch((error) => {
        res.status(STATUSES.SERVERERROR).send(({
          status: STATUSES.SERVERERROR,
          message: error.message
        }));
      });
    });
  }
};

export default FileUploader;
