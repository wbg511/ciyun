import axios from './httpAjax';
import phyInit from './phy.init';
import qs from "qs";
import $ from "jquery";



const routeEnterInfo = (nextState, replace) => {
  const isWx = window.localStorage.getItem('isWx');
  if (localStorage.hasOwnProperty('isWx') && localStorage.getItem("isWx") != 'undefined' && isWx == "true") {
    //微信处理
    const mpNum = phyInit.wxShareInfo.mpNum;
    const sharetitle = phyInit.wxShareInfo.title;
    const sharelinkUrl = phyInit.wxShareInfo.linkUrl;
    const shareimgUrl = phyInit.wxShareInfo.shareLogo;
    const sharedesc = phyInit.wxShareInfo.desc;
    const sharetype = "";
    const sharedataUrl = "";
    phyInit.wxShare(mpNum, sharetitle, sharelinkUrl, shareimgUrl, sharedesc, sharetype, sharedataUrl);
  }
};

export default routeEnterInfo;
