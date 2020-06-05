import query from '../../db';
// 为文件进行命名（唯一标识）
import {v1} from 'uuid';
import fs from 'fs';
import Utils from '../../utils';

class FileController {
  //上传
   static async uploadFile(ctx) {
    try {
      // 前端必须以formData格式进行文件的传递
      const file = ctx.request.files.files; // 获取上传文件
      if (file) {
        // 命名文件
        const fileName = v1();
        // 创建文件可读流
        const reader = fs.createReadStream(file.path);
         // 获取上传文件扩展名
        const ext = file.name.split('.').pop();
        // 命名文件以及拓展名
        const fileUrl = `${fileName}.${ext}`;
        // 调用方法(封装在utils文件夹内)
        const result = await Utils.upload(reader, fileUrl);
        if (result) {
          const data = await query('UPDATE user SET user_pic=? where id=?', [result.src, 29]);
          if (data.affectedRows === 1) {
            ctx.success(result,'上传成功!');
          }
        } else {
          ctx.fail('上传失败');
        }
      } else {
        ctx.response.status = 400;
        ctx.fail('没有选择图片');
      }
    } catch (err) {
      ctx.fail('未知错误');
    }
  }
}

export default FileController;
