'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getFileInfo', controller.publish.getFileInfo);
  router.get('/download', controller.publish.downloadFile);
  router.get('/downloadFile', controller.publish.downloadIFile);
  router.get('/getDownloadInfo', controller.publish.getDownloadInfo);
  router.post('/file_record/afid', controller.publish.getFileRecord)
  router.get('/getFileParameter', controller.publish.getFileParameter);
};
