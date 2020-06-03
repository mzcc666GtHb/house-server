#mysql数据库表结构

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` char(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `user_password` char(128) NOT NULL DEFAULT '' COMMENT '用户密码',
  `user_email` char(128) NOT NULL DEFAULT '' COMMENT '邮箱地址',
  `create_time` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '注册时间',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最后登录时间',
  `user_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `user_extend` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '扩展信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户据库表';
