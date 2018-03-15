import React, {
  Component
} from "react";
import Layout from "./Layout";
import Index from "../index/container/Index"
import PersonalInfomationReport from "../PersonalInfomationReport/route";
import MajorPhysiologyIndicatorsReport from "../MajorPhysiologyIndicatorsReport/route";
import LifeStyleAssessmentReport from "../LifeStyleAssessmentReport/route";
import ObesityReport from "../ObesityReport/route";
import DiabReport from "../DiabReport/route";
import HbpRepor from "../HbpReport/route";
import CvdReport from "../CvdReport/route";
import StrokeReport from "../StrokeReport/route";
import MetabolicSyndromeReport from "../MetabolicSyndromeReport/route";
import DyslipidemiaReport from "../DyslipidemiaReport/route";
import OsteoporosisReport from "../OsteoporosisReport/route";
import DepressionReport from "../DepressionReport/route";
import SasReport from "../SasReport/route";
import SportRiskReport from "../SportRiskReport/route";
import LungCancerReport from "../LungCancerReport/route";
import PcReport from "../PcReport/route";


import NurPrescriptionReport from "../NurPrescriptionReport/route";
import SportPrescriptionReport from "../SportPrescriptionReport/route";
import answer from "../answer/route"

import routeEnterInfo from "../common/routeEnterInfo"


export default [{
  path: "/",
  component: Layout,
  onEnter: routeEnterInfo,
  indexRoute: {
    component: Index
  },
  childRoutes: [
    PersonalInfomationReport, MajorPhysiologyIndicatorsReport, LifeStyleAssessmentReport, ObesityReport, DiabReport, HbpRepor, CvdReport, StrokeReport, MetabolicSyndromeReport, DyslipidemiaReport, OsteoporosisReport, DepressionReport, SasReport, SportRiskReport, LungCancerReport, PcReport, NurPrescriptionReport, SportPrescriptionReport, answer
  ]
}]