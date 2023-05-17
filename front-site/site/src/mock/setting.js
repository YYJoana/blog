import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
    siteTitle: "我的个人空间",
    github: "https://github.com/DuYi-Edu",
    qq: "3263023350",
    qqQrCode: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
    weixin: "yh777bao",
    weixinQrCode: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
    mail: "duyi@gmail.com",
    icp: "黑ICP备17001719号",
    githubName: "DuYi-Edu",
    favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
  },
});
