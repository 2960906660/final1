

### 运行前提
1. 本地下载并启动 mongodb 数据库  (mac下：)
  1.1 brew install mongodb
  1.2 brew services start mongodb 

  ubuntu下安装mongodbs数据库参见<https://segmentfault.com/a/1190000014385351> 

2. 本地下载并启动 ipfs 

  2.1 在ipfs上新建一个存放文件的文件夹：ipfs files mkdir /test1 （源程序中涉及ipfs文件上传的文件夹就是test1，如果改为其他名称，需要在源程序中进行替换）

  2.2  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
  2.3  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
  2.4  ipfs daemon

3. 安装 metamask 注册ropsten 测试网地址并且有余额

4. 程序默认把文件上传到 ipfs MFS 下的 /test1/ 路径下，可以考虑新建这个路径: 命令行输入 ipfs files mkdir /test1

### 项目运行：
1. 在本项目路径下执行 npm install 安装依赖包
2. 依赖包安装完成后，npm run start 启动 

### 可能遇到的问题：
1. 添加文件没有获取到 hash ,报错说 CORS 访问403: 因为访问ipfs本地的5001端口被拒绝，需要设置跨域访问，参考https://github.com/INFURA/tutorials/wiki/IPFS-and-CORS
2. ubuntu 可能会遇到启动失败的问题：Error：watch ENOSPC 报错，原因是达到了 ubuntu 默认的最大监听事件，解决方案参考：https://blog.csdn.net/qq_21460229/article/details/78290740

   
