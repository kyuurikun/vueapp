/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 8.0.15 : Database - baby
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`baby` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `baby`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `addressinfo` varchar(400) DEFAULT NULL,
  `isdefault` varchar(11) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `addressarea` varchar(400) DEFAULT NULL,
  `sname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `address` */

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int(100) NOT NULL AUTO_INCREMENT,
  `category_pid` int(11) DEFAULT NULL,
  `category_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`category_id`,`category_pid`,`category_name`) values (3,100001,'婴幼儿电器'),(4,100002,'婴幼儿服饰'),(5,100003,'婴幼儿食品'),(6,NULL,NULL);

/*Table structure for table `collect` */

DROP TABLE IF EXISTS `collect`;

CREATE TABLE `collect` (
  `collect_id` int(100) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`collect_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `collect_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `collect_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `collect` */

/*Table structure for table `goods_cart` */

DROP TABLE IF EXISTS `goods_cart`;

CREATE TABLE `goods_cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `goods_num` int(11) DEFAULT NULL,
  `created` varchar(200) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `goods_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `goods_cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `goods_cart` */

/*Table structure for table `lhg_city` */

DROP TABLE IF EXISTS `lhg_city`;

CREATE TABLE `lhg_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `fename` varchar(2) NOT NULL DEFAULT '',
  `ename` varchar(40) NOT NULL DEFAULT '',
  `pid` int(11) NOT NULL DEFAULT '0',
  `level` int(3) NOT NULL DEFAULT '0',
  `region` int(11) NOT NULL COMMENT '1是(北部沿海)2是(东部沿海)3是(南部沿海)4是(西部沿海)5是(中部内陆)',
  `map_x` varchar(50) NOT NULL DEFAULT '',
  `map_y` varchar(50) NOT NULL DEFAULT '',
  `map_z` varchar(5) NOT NULL DEFAULT '',
  `orders` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `istop` tinyint(1) NOT NULL DEFAULT '0',
  `city_id` int(11) NOT NULL DEFAULT '0',
  `city_area` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `name` (`name`),
  KEY `ename` (`ename`),
  KEY `pid` (`pid`),
  KEY `orders` (`orders`),
  KEY `status` (`status`)
) ENGINE=MyISAM AUTO_INCREMENT=3240 DEFAULT CHARSET=utf8;

/*Data for the table `lhg_city` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int(100) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `ocount` int(11) DEFAULT NULL,
  `total_price` decimal(8,2) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `stauts` int(11) DEFAULT NULL,
  `flag` varchar(11) DEFAULT NULL,
  `buid_time` varchar(200) DEFAULT NULL,
  `orderno` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  KEY `address_id` (`address_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`cart_id`) REFERENCES `goods_cart` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int(100) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_price` decimal(8,2) DEFAULT NULL,
  `product_img_url` varchar(400) DEFAULT NULL,
  `product_uprice` decimal(8,2) DEFAULT NULL,
  `product_num` varchar(100) DEFAULT NULL,
  `product_detail` text,
  `product_comment_num` int(8) DEFAULT NULL,
  `product_hot` int(11) DEFAULT NULL,
  `product_special` int(11) DEFAULT NULL,
  `product_search_hot` int(8) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `shop` (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`product_id`,`category_id`,`shop_id`,`product_name`,`product_price`,`product_img_url`,`product_uprice`,`product_num`,`product_detail`,`product_comment_num`,`product_hot`,`product_special`,`product_search_hot`) values (3,5,1,'嘉宝婴儿果汁 红莓味','30.00','https://baby-1258728828.cos.ap-shanghai.myqcloud.com/berryjuice.png','50.00','100','由100%鲜果制成，纯度完全符合美国食品与药物管理局的标准。无糖、无盐、无防腐剂、无人工色素和香精，更新的配方能够帮助宝宝形成良好的味觉系统，养成良好的饮食习惯。',51,1,0,0),(4,3,4,'babycare 吸管杯婴儿1-3岁 重力球学饮杯防漏防摔儿童水杯水壶宝宝喝水杯 淡藻绿240ml','59.00','https://baby-1258728828.cos.ap-shanghai.myqcloud.com/bottle.jpg','60.00','100','因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！',60,1,0,0),(5,4,5,'迪士尼迪士尼公主仙履奇缘灰姑娘仙蒂公主儿童春秋款连衣裙','698.60','	https://baby-1258728828.cos.ap-shanghai.myqcloud.com/disney.jpg','700.00','100','简单点缀梦幻花纹，银色细线勾勒，时尚简约',60,1,0,0),(6,5,5,'MILKANA百吉福棒棒奶酪宝宝零食儿童婴儿点心安全奶源原味水果味套餐500g*2两袋装','114.00','https://baby-1258728828.cos.ap-shanghai.myqcloud.com/bangbang.png','140.00','100','传承法国工艺，卓越品质之选',60,1,1,0);

/*Table structure for table `product_image` */

DROP TABLE IF EXISTS `product_image`;

CREATE TABLE `product_image` (
  `image_id` int(100) NOT NULL AUTO_INCREMENT,
  `product_id` int(100) DEFAULT NULL,
  `image_url` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=923 DEFAULT CHARSET=utf8;

/*Data for the table `product_image` */

insert  into `product_image`(`image_id`,`product_id`,`image_url`) values (1,3,'https://baby-1258728828.cos.ap-shanghai.myqcloud.com/berryjuice.png'),(2,4,'https://baby-1258728828.cos.ap-shanghai.myqcloud.com/bottle.jpg'),(3,5,'	https://baby-1258728828.cos.ap-shanghai.myqcloud.com/disney.jpg'),(4,6,'https://baby-1258728828.cos.ap-shanghai.myqcloud.com/bangbang.png');

/*Table structure for table `shop` */

DROP TABLE IF EXISTS `shop`;

CREATE TABLE `shop` (
  `shop_id` int(100) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(200) DEFAULT NULL,
  `shop_address` varchar(400) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=421 DEFAULT CHARSET=utf8;

/*Data for the table `shop` */

insert  into `shop`(`shop_id`,`shop_name`,`shop_address`,`category_id`) values (1,'嘉宝婴儿食品','山东济南',5),(2,'方广婴儿食品','四川成都',5),(3,'亨氏婴儿食品','广东惠州',5),(4,'babycare','北京朝阳',3),(5,'迪士尼儿童内衣','上海',4),(6,'百吉福儿童食品','上海',5);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `login_password` varchar(100) NOT NULL,
  `pay_password` varchar(100) DEFAULT NULL,
  `user_number` varchar(40) NOT NULL,
  `user_photo` varchar(200) DEFAULT NULL,
  `verification_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`user_id`,`user_name`,`login_password`,`pay_password`,`user_number`,`user_photo`,`verification_code`) values (5,'123','d772395d080e0c94558f1ad13dcd8aac',NULL,'123',NULL,NULL),(6,'123123','d772395d080e0c94558f1ad13dcd8aac',NULL,'123123',NULL,NULL),(39,'1234','d772395d080e0c94558f1ad13dcd8aac',NULL,'1234',NULL,NULL),(40,'12345','d772395d080e0c94558f1ad13dcd8aac',NULL,'12345',NULL,NULL),(41,'123456','d772395d080e0c94558f1ad13dcd8aac',NULL,'123456',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
