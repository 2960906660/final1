#  星际文献查询分享系统(IPaFS)

## 项目简介

**星际文献查询分享系统**（IPaFS）是基于区块链和IPFS技术打造的一个去中心化的学术论文分享社区，使得科研论文开放、共享，充分发挥学术论文的价值。IPaFS通过“区块链+IPFS+学术文献”新型模式的深度整合，创建以全球高校、科研院所等研究机构等为主体的社区生态圈。在保证论文数据安全、溯源的前提下，社区中论文共享者发布自己的学术研究论文，社区中论文查询者查阅所需的论文，以此打破学术论文被出版商垄断的现状，建立学术文献横向流通机制，真正使学术论文流动起来，实现学术论文的价值，最终推动全球科研创新的步伐。

## 目录
  - [项目优势](#项目优势)
  - [设计理念](#设计理念)
  - [系统架构](#系统架构)
  - [项目安装与运行](#项目安装与运行)
     - [搭建运行环境](#搭建运行环境)
     - [安装项目](#安装项目)
     - [运行项目](#运行项目)
     - [可能遇到的问题](#可能遇到的问题)
  - [使用说明](#使用说明)
    
## 项目优势

 - 基于区块链和IPFS技术实现了论文分享的去中心化、点对点、分布式存储等特点,降低了文件的存储成本，自然从根本上降低了系统的运营维护成本。通过有激励机制的评价系统、低门槛的上传下载吸引优质的论文分享用户加入，大大降低了论文资源的获取门槛，用户不需要支付高额的会员费用，只需加入成为系统的节点，贡献一部分自己的硬盘空间，或是乐于给出优质的评论。
- 利用IPFS和区块链技术来实现去中心化，存储方面用分布式存储替代了中心化存储，降低了存储成本，合理运用空闲资源；管理方面实现监管去中心化，用区块链记录文件上传信息，所记录的信息都会准确的在区块链上存档，这些存档信息会对所有用户公开，以便进行追溯、参考，防止信息被篡改，保护上传者的权益，同时防止黑客攻击窃取数据。
 - 通过有激励机制的评价系统改变目前论文无法评价的局面，促进学术思想的交流、分享，激励更多的用户参与，给用户发表看法和见解的空间，让学术气氛更活跃，让每个读者阅读论文时不再觉得孤单。
## 设计理念

星际文献查询分享系统（IPaFS）利用最新的区块链技术和IPFS技术来构建一个去中心化的免费学术文献参阅、分享社区，充分发挥学术文献的价值要求：任意节点都可以通过网络进行分布式、P2P论文分享；网络能够提供可扩展的数据传输和存储能力，具有很强的容错性；节点可以通过网络免费获取学术论文；网络能够对上传论文进行溯源，解决论文版权问题；网络将文献流行程度记录在区块链上，通过查看文献的受流行程度，在社区中自动区分优质和劣质文献，解决了传统论文没有同行审议的缺陷。

## 系统架构
星际文献查询分享系统（IPaFS）主要分为两部分：**IPFS存储网络**，**以太坊联盟链**。IPaFS设计并将实现一个完全去中心化的网络协议栈，其核心包括基于可信联盟链，基于IPFS技术的分布式数据存储，基于智能合约的去中心化价值激励。可信联盟链主要存储用户论文上传记录以及论文名与IPFS哈希键值对；IPFS负责对用户上传的论文进行分布式存储，通过智能合约来实现用户对论文的评分，通过质押评分机制可以保证用户对论文做出公正评价，方便社区实现对优质论文以及优质用户的筛选。
整个系统的框架如下图所示：
![系统框架图](https://raw.githubusercontent.com/hong00271/my-img/master/2022/10/28/JBTc7jNr8flmjIzZ.png)


## 项目安装与运行
### 搭建运行环境
1. 本地下载并启动 mongodb 数据库 (mac下)
``` javascript
brew install mongodb
brew services start mongodb
```
ubuntu下安装mongodbs数据库参见（https://segmentfault.com/a/1190000014385351)

2. 本地下载ipfs，然后运行ipfs：
 ```javascript
 ipfs files mkdir /test1 ##在ipfs上新建一个存放文件的文件夹
 ```
 （源程序中涉及ipfs文件上传的文件夹就是 test1，如果改为其他名称，需要在源程序中进行替换）
 ```javascript
 ipfs confifig --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs confifig --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]' 
ipfs daemon 
```

3. Google浏览器安装 metamask ，注册ropsten 测试网地址并且有余额

### 安装项目
``` javascript
npm install package  ##在本项目路径下执行
```

### 运行项目
``` javascript
npm run start
```

### 可能遇到的问题

 1. 添加文件没有获取到 hash ,报错说 CORS 访问403: 因为访问ipfs本地的5001端口被拒绝，需要设置跨域访问，参考(https://github.com/INFURA/tutorials/wiki/IPFS-and-CORS)

2. ubuntu 可能会遇到启动失败的问题：Error：watch ENOSPC 报错，原因是达到了 ubuntu 默认的最大监听事件，解决方案参考：
(https://blog.csdn.net/qq_21460229/article/details/78290740)

## 使用说明
- 系统首页，用户首先需要注册账号并登录
![输入图片说明](https://raw.githubusercontent.com/hong00271/my-img/master/2022/10/30/swKY2LeZW7HAEKg8.png)
![输入图片说明](https://raw.githubusercontent.com/hong00271/my-img/master/2022/10/30/eJqhUr1xWWMIn8Bs.png)

- 应用首页，可以选择本地磁盘中的文献文件发送到IPaFS系统中，文献发送后，系统会返回记录该次上传信息的区块和交易信息
![输入图片说明](https://raw.githubusercontent.com/hong00271/my-img/master/2022/10/30/EYacarveBTjCe4Um.png)
<br>

-  在User页面可以展示当前用户所有已经上传的文件，并可以对其进行删除或查看具体信息
![输入图片说明](https://github.com/2960906660/my_image/blob/main/usr.png?raw=true)
<br>

-  在检索页面可以根据文件名称或者Hash，在IPaFS系统中检索到对应的文献并下载或是预览
![输入图片说明](https://github.com/2960906660/my_image/blob/main/topic.png?raw=true)
