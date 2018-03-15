import React, {Component} from "react";
import Layout from "./Layout";
import channel from "../channel/container/ChannelList"
import booking from "../booking/route"
import special from "../special/route"
import bookingForm from "../bookingForm/route"
import bookingResult from "../bookingResult/route"
import confirmOrder from "../pay/route"
import histroy from "../histroy/route"
import huojianwa from "../huojianwa/route"
import routeEnterInfo from "../common/routeEnterInfo"

export default[
  {
    path : "/",
    component : Layout,
    onEnter: routeEnterInfo,
    indexRoute : {
      component: channel
    },
    childRoutes : [
      booking,
      special,
      bookingForm,
      bookingResult,
      confirmOrder,
      histroy,
      huojianwa,
    ]
  }
]
