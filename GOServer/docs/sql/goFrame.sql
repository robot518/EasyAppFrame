DROP TABLE IF EXISTS `t_user`;
CREATE TABLE t_user
(
    id int NOT NULl AUTO_INCREMENT,
    phone  varchar(20),
    passwd varchar(50),
    created_on int(10) unsigned DEFAULT '0' COMMENT '新建时间',
    modified_on int(10) unsigned DEFAULT '0' COMMENT '修改时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_nodeinfo`;
CREATE TABLE t_nodeinfo
(
    id int NOT NULl AUTO_INCREMENT,
    created_on int(10) unsigned DEFAULT '0' COMMENT '新建时间',
    modified_on int(10) unsigned DEFAULT '0' COMMENT '修改时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;