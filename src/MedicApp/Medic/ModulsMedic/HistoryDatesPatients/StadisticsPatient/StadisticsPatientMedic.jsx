import React from 'react';
import './StadisticsPatientMedic.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import 'malihu-custom-scrollbar-plugin';
import { IoMdDownload } from "react-icons/io";
import { AppContext } from '../../../../../context';
import Swal from 'sweetalert2';
import * as echarts from 'echarts';
import $ from "jquery"
import Preloader from '../../../../../components/Preloader/Preloader';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import { FaEye } from "react-icons/fa";


export default function StadisticsPatientMedic() {

    /* navigate */
    
    let navigate=useNavigate()
    
    /* appContext */
    
    let {userData,token,selectCompleteDate,setSelectCompleteDate} = React.useContext(AppContext);
    
    /* useState */
    
    let [preloader,setPreloader] = React.useState(false);
    
    /* UseEffect */
    
    React.useEffect(()=>{

      console.log("CITA COMPLETA: ",selectCompleteDate);

    },[selectCompleteDate])

    /* functions */


    /* indicators */

    const [showOverlay, setShowOverlay] = React.useState(false);
    const [hiddenOverlay, setHiddenOverlay] = React.useState(true);
    const toggleOverlay = (cardId) => {
        setShowOverlay(cardId);
        setHiddenOverlay(false);
    };

    /* GRAFICA TENDENCIAS */
    
    React.useEffect(()=>{
        /**
     * GRAFICA SIGN IMC, PESO Y TALLA (LINE CHART)
     */
    if(selectCompleteDate !== null){

    let chartVitalSignsthree = echarts.init(document.getElementById('chart-vital-sign-three-'));
    let optionVitalSignsthree;

    const dataVitalSignsthree = [
      { valueOne: 'C1', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c1'], valueThree:selectCompleteDate?.analisis_senal_activo?.theta?.media['c1'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c1'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c1'] },
      { valueOne: 'C2', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c2'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c2'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c2'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c2'] },
      { valueOne: 'C3', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c3'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c3'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c3'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c3'] },
      { valueOne: 'C4', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c4'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c4'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c4'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c4'] },
      { valueOne: 'C5', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c5'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c5'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c5'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c5'] },
      { valueOne: 'C6', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c6'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c6'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c6'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c6'] },
      { valueOne: 'C7', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c7'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c7'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c7'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c7'] },
      { valueOne: 'C8', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c8'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c8'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c8'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c8'] },
      { valueOne: 'C9', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c9'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c9'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c9'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c9'] },
      { valueOne: 'C10', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c10'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c10'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c10'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c10'] },
      { valueOne: 'C11', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c11'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c11'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c11'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c11'] },
      { valueOne: 'C12', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c12'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c12'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c12'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c12'] },
      { valueOne: 'C13', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c13'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c13'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c13'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c13'] },
      { valueOne: 'C14', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c14'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c14'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c14'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c14'] },
      { valueOne: 'C15', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c15'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c15'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c15'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c15'] },
      { valueOne: 'C16', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.media['c16'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.media['c16'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.media['c16'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.media['c16'] }
    ];

    console.log("DATOS : ",dataVitalSignsthree)

    optionVitalSignsthree = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#FAFAFA',
            color: '#040E29',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          }
        },
        showDelay: 0,
        transitionDuration: 0.2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 5,
        textStyle: {
          color: '#414D55',
          fontSize: 12,
          lineHeight:10,
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        extraCssText: 'box-shadow: 0px 1px 8px #142E6E1A'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 10,
        bottom: 20,
        itemGap : 25,
        width: '90%',
        inactiveColor: '#728998',
        textStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        pageIconSize: 12,
        pageIconColor: '#FAFAFA',
        pageIconInactiveColor: '#414D55',
        pageTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        formatter : function(params, value){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 50;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p === rowNumber - 1) {
                    tempStr = (params.length > 6 ? (params.slice(0,50)+"...") : '' );
                } else {}
                newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
        },
        data: ['Media General', 'Media Theta', 'Media Alpha','Media Beta']
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          dataZoom: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          restore: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          saveAsImage: {
            type: 'png',
            name: 'medidas_tendencia_activa',
            backgroundColor: '#272727',
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          }
        },
        iconStyle: {
          borderColor: '#414D55'
        },
        emphasis: {
          iconStyle: {
            borderColor: '#414D55'
          },
        },
        bottom: 0,
        pixelRatio: 2,
      },
      grid: [
        {
          containLabel: true,
          borderColor: '#728998'
        }
      ],
      xAxis: {
        type: 'category',
        name: 'Canal',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLabel: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLine: {
          lineStyle: {
            color: '#728998',
            width: 1,
          }
        },
        boundaryGap: true,
        data: dataVitalSignsthree.map(item => item.valueOne)
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#728998',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
      ],
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Media General',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#000',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#d1a207",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueTwo),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Media Theta',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F96767",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueThree),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Media Alpha',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F19420",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueFour),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            clip: true,
            lineStyle: {
              width: 2,
            },
            top: 15,
            name: 'Media Beta',
            label: {
              normal: {
                show: false,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
            },
            itemStyle: {
              color: "#0463a2",
              shadowBlur: 0,
              shadowOffsetY: 0,
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: dataVitalSignsthree.map(item => item.valueFive),
            animationDelay: function (idx) {
              return idx * 15;
            }
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionVitalSignsthree && chartVitalSignsthree.setOption(optionVitalSignsthree);

    $(window).on('resize', function(){
      if(chartVitalSignsthree != null && chartVitalSignsthree !== undefined){
        chartVitalSignsthree.resize();
      }
    });

    } 
    
    },[])

    React.useEffect(()=>{
        /**
     * GRAFICA SIGN IMC, PESO Y TALLA (LINE CHART)
     */

    let chartVitalSignsthree = echarts.init(document.getElementById('chart-vital-sign-four-'));
    let optionVitalSignsthree;

    const dataVitalSignsthree = [
      { valueOne: 'C1', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c1'], valueThree:selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c1'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c1'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c1'] },
      { valueOne: 'C2', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c2'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c2'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c2'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c2'] },
      { valueOne: 'C3', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c3'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c3'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c3'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c3'] },
      { valueOne: 'C4', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c4'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c4'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c4'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c4'] },
      { valueOne: 'C5', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c5'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c5'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c5'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c5'] },
      { valueOne: 'C6', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c6'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c6'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c6'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c6'] },
      { valueOne: 'C7', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c7'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c7'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c7'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c7'] },
      { valueOne: 'C8', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c8'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c8'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c8'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c8'] },
      { valueOne: 'C9', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c9'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c9'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c9'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c9'] },
      { valueOne: 'C10', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c10'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c10'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c10'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c10'] },
      { valueOne: 'C11', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c11'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c11'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c11'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c11'] },
      { valueOne: 'C12', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c12'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c12'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c12'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c12'] },
      { valueOne: 'C13', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c13'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c13'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c13'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c13'] },
      { valueOne: 'C14', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c14'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c14'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c14'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c14'] },
      { valueOne: 'C15', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c15'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c15'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c15'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c15'] },
      { valueOne: 'C16', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.mediana['c16'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.mediana['c16'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.mediana['c16'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.mediana['c16'] }
    ];

    optionVitalSignsthree = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#FAFAFA',
            color: '#040E29',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          }
        },
        showDelay: 0,
        transitionDuration: 0.2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 5,
        textStyle: {
          color: '#414D55',
          fontSize: 12,
          lineHeight:10,
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        extraCssText: 'box-shadow: 0px 1px 8px #142E6E1A'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 10,
        bottom: 20,
        itemGap : 25,
        width: '90%',
        inactiveColor: '#728998',
        textStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        pageIconSize: 12,
        pageIconColor: '#FAFAFA',
        pageIconInactiveColor: '#414D55',
        pageTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        formatter : function(params, value){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 50;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p === rowNumber - 1) {
                    tempStr = (params.length > 6 ? (params.slice(0,50)+"...") : '' );
                } else {}
                newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
        },
        data: ['Mediana General', 'Mediana Theta', 'Mediana Alpha','Mediana Beta']
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          dataZoom: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          restore: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          saveAsImage: {
            type: 'png',
            name: 'medidas_tendencia_activa',
            backgroundColor: '#272727',
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          }
        },
        iconStyle: {
          borderColor: '#414D55'
        },
        emphasis: {
          iconStyle: {
            borderColor: '#414D55'
          },
        },
        bottom: 0,
        pixelRatio: 2,
      },
      grid: [
        {
          containLabel: true,
          borderColor: '#728998'
        }
      ],
      xAxis: {
        type: 'category',
        name: 'Canal',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLabel: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLine: {
          lineStyle: {
            color: '#728998',
            width: 1,
          }
        },
        boundaryGap: true,
        data: dataVitalSignsthree.map(item => item.valueOne)
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#728998',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
      ],
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Mediana General',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#d1a207",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueTwo),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Mediana Theta',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F96767",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueThree),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Mediana Alpha',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F19420",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueFour),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            clip: true,
            lineStyle: {
              width: 2,
            },
            top: 15,
            name: 'Mediana Beta',
            label: {
              normal: {
              show: false,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
            },
            itemStyle: {
              color: "#0463a2",
              shadowBlur: 0,
              shadowOffsetY: 0,
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: dataVitalSignsthree.map(item => item.valueFive),
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionVitalSignsthree && chartVitalSignsthree.setOption(optionVitalSignsthree);

    $(window).on('resize', function(){
      if(chartVitalSignsthree != null && chartVitalSignsthree !== undefined){
        chartVitalSignsthree.resize();
      }
    });
    },[])


    React.useEffect(()=>{
        /**
     * GRAFICA SIGN IMC, PESO Y TALLA (LINE CHART)
     */

    let chartVitalSignsthree = echarts.init(document.getElementById('chart-vital-sign-five-'));
    let optionVitalSignsthree;

    const dataVitalSignsthree = [
      { valueOne: 'C1', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c1'], valueThree:selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c1'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c1'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c1'] },
      { valueOne: 'C2', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c2'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c2'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c2'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c2'] },
      { valueOne: 'C3', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c3'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c3'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c3'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c3'] },
      { valueOne: 'C4', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c4'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c4'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c4'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c4'] },
      { valueOne: 'C5', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c5'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c5'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c5'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c5'] },
      { valueOne: 'C6', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c6'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c6'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c6'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c6'] },
      { valueOne: 'C7', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c7'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c7'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c7'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c7'] },
      { valueOne: 'C8', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c8'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c8'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c8'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c8'] },
      { valueOne: 'C9', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c9'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c9'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c9'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c9'] },
      { valueOne: 'C10', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c10'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c10'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c10'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c10'] },
      { valueOne: 'C11', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c11'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c11'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c11'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c11'] },
      { valueOne: 'C12', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c12'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c12'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c12'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c12'] },
      { valueOne: 'C13', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c13'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c13'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c13'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c13'] },
      { valueOne: 'C14', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c14'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c14'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c14'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c14'] },
      { valueOne: 'C15', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c15'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c15'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c15'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c15'] },
      { valueOne: 'C16', valueTwo: selectCompleteDate?.analisis_senal_activo?.general?.varianza['c16'], valueThree: selectCompleteDate?.analisis_senal_activo?.theta?.varianza['c16'], valueFour: selectCompleteDate?.analisis_senal_activo?.alpha?.varianza['c16'] ,valueFive: selectCompleteDate?.analisis_senal_activo?.beta?.varianza['c16'] }
    ];

    optionVitalSignsthree = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#FAFAFA',
            color: '#040E29',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          }
        },
        showDelay: 0,
        transitionDuration: 0.2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 5,
        textStyle: {
          color: '#414D55',
          fontSize: 12,
          lineHeight:10,
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        extraCssText: 'box-shadow: 0px 1px 8px #142E6E1A'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 10,
        bottom: 20,
        itemGap : 25,
        width: '90%',
        inactiveColor: '#728998',
        textStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        pageIconSize: 12,
        pageIconColor: '#FAFAFA',
        pageIconInactiveColor: '#414D55',
        pageTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        formatter : function(params, value){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 50;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p === rowNumber - 1) {
                    tempStr = (params.length > 6 ? (params.slice(0,50)+"...") : '' );
                } else {}
                newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
        },
        data: ['Varianza General', 'Varianza Theta', 'Varianza Alpha','Varianza Beta']
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          dataZoom: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          restore: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          saveAsImage: {
            type: 'png',
            name: 'medidas_tendencia_activa',
            backgroundColor: '#272727',
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          }
        },
        iconStyle: {
          borderColor: '#414D55'
        },
        emphasis: {
          iconStyle: {
            borderColor: '#414D55'
          },
        },
        bottom: 0,
        pixelRatio: 2,
      },
      grid: [
        {
          containLabel: true,
          borderColor: '#728998'
        }
      ],
      xAxis: {
        type: 'category',
        name: 'Canal',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLabel: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLine: {
          lineStyle: {
            color: '#728998',
            width: 1,
          }
        },
        boundaryGap: true,
        data: dataVitalSignsthree.map(item => item.valueOne)
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#728998',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
      ],
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Varianza General',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#d1a207",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueTwo),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Varianza Theta',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F96767",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueThree),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Varianza Alpha',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F19420",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueFour),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            clip: true,
            lineStyle: {
              width: 2,
            },
            top: 15,
            name: 'Varianza Beta',
            label: {
              normal: {
              show: false,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
            },
            itemStyle: {
              color: "#0463a2",
              shadowBlur: 0,
              shadowOffsetY: 0,
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: dataVitalSignsthree.map(item => item.valueFive),
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionVitalSignsthree && chartVitalSignsthree.setOption(optionVitalSignsthree);

    $(window).on('resize', function(){
      if(chartVitalSignsthree != null && chartVitalSignsthree !== undefined){
        chartVitalSignsthree.resize();
      }
    });
    },[])



    /* SEÑALES EN REPOSO */


    React.useEffect(()=>{
        /**
     * GRAFICA SIGN IMC, PESO Y TALLA (LINE CHART)
     */

    let chartVitalSignsthree = echarts.init(document.getElementById('chart-vital-sign-seven-'));
    let optionVitalSignsthree;

    const dataVitalSignsthree = [
      { valueOne: 'C1', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c1'], valueThree:selectCompleteDate?.analisis_senal_reposo?.theta?.media['c1'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c1'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c1'] },
      { valueOne: 'C2', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c2'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c2'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c2'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c2'] },
      { valueOne: 'C3', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c3'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c3'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c3'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c3'] },
      { valueOne: 'C4', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c4'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c4'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c4'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c4'] },
      { valueOne: 'C5', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c5'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c5'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c5'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c5'] },
      { valueOne: 'C6', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c6'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c6'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c6'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c6'] },
      { valueOne: 'C7', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c7'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c7'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c7'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c7'] },
      { valueOne: 'C8', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c8'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c8'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c8'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c8'] },
      { valueOne: 'C9', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c9'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c9'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c9'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c9'] },
      { valueOne: 'C10', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c10'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c10'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c10'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c10'] },
      { valueOne: 'C11', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c11'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c11'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c11'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c11'] },
      { valueOne: 'C12', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c12'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c12'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c12'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c12'] },
      { valueOne: 'C13', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c13'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c13'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c13'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c13'] },
      { valueOne: 'C14', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c14'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c14'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c14'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c14'] },
      { valueOne: 'C15', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c15'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c15'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c15'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c15'] },
      { valueOne: 'C16', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.media['c16'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.media['c16'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.media['c16'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.media['c16'] }
    ];

    optionVitalSignsthree = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#FAFAFA',
            color: '#040E29',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          }
        },
        showDelay: 0,
        transitionDuration: 0.2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 5,
        textStyle: {
          color: '#414D55',
          fontSize: 12,
          lineHeight:10,
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        extraCssText: 'box-shadow: 0px 1px 8px #142E6E1A'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 10,
        bottom: 20,
        itemGap : 25,
        width: '90%',
        inactiveColor: '#728998',
        textStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        pageIconSize: 12,
        pageIconColor: '#FAFAFA',
        pageIconInactiveColor: '#414D55',
        pageTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        formatter : function(params, value){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 50;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p === rowNumber - 1) {
                    tempStr = (params.length > 6 ? (params.slice(0,50)+"...") : '' );
                } else {}
                newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
        },
        data: ['Media General', 'Media Theta', 'Media Alpha','Media Beta']
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          dataZoom: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          restore: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          saveAsImage: {
            type: 'png',
            name: 'medidas_tendencia_reposo',
            backgroundColor: '#272727',
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          }
        },
        iconStyle: {
          borderColor: '#414D55'
        },
        emphasis: {
          iconStyle: {
            borderColor: '#414D55'
          },
        },
        bottom: 0,
        pixelRatio: 2,
      },
      grid: [
        {
          containLabel: true,
          borderColor: '#728998'
        }
      ],
      xAxis: {
        type: 'category',
        name: 'Canal',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLabel: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLine: {
          lineStyle: {
            color: '#728998',
            width: 1,
          }
        },
        boundaryGap: true,
        data: dataVitalSignsthree.map(item => item.valueOne)
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#728998',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
      ],
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Media General',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#d1a207",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueTwo),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Media Theta',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F96767",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueThree),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Media Alpha',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F19420",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueFour),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            clip: true,
            lineStyle: {
              width: 2,
            },
            top: 15,
            name: 'Media Beta',
            label: {
              normal: {
              show: false,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
            },
            itemStyle: {
              color: "#0463a2",
              shadowBlur: 0,
              shadowOffsetY: 0,
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: dataVitalSignsthree.map(item => item.valueFive),
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionVitalSignsthree && chartVitalSignsthree.setOption(optionVitalSignsthree);

    $(window).on('resize', function(){
      if(chartVitalSignsthree != null && chartVitalSignsthree !== undefined){
        chartVitalSignsthree.resize();
      }
    });
    },[])

    React.useEffect(()=>{
        /**
     * GRAFICA SIGN IMC, PESO Y TALLA (LINE CHART)
     */

    let chartVitalSignsthree = echarts.init(document.getElementById('chart-vital-sign-eight-'));
    let optionVitalSignsthree;

    const dataVitalSignsthree = [
      { valueOne: 'C1', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c1'], valueThree:selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c1'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c1'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c1'] },
      { valueOne: 'C2', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c2'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c2'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c2'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c2'] },
      { valueOne: 'C3', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c3'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c3'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c3'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c3'] },
      { valueOne: 'C4', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c4'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c4'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c4'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c4'] },
      { valueOne: 'C5', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c5'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c5'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c5'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c5'] },
      { valueOne: 'C6', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c6'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c6'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c6'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c6'] },
      { valueOne: 'C7', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c7'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c7'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c7'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c7'] },
      { valueOne: 'C8', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c8'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c8'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c8'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c8'] },
      { valueOne: 'C9', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c9'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c9'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c9'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c9'] },
      { valueOne: 'C10', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c10'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c10'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c10'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c10'] },
      { valueOne: 'C11', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c11'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c11'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c11'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c11'] },
      { valueOne: 'C12', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c12'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c12'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c12'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c12'] },
      { valueOne: 'C13', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c13'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c13'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c13'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c13'] },
      { valueOne: 'C14', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c14'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c14'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c14'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c14'] },
      { valueOne: 'C15', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c15'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c15'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c15'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c15'] },
      { valueOne: 'C16', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.mediana['c16'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.mediana['c16'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.mediana['c16'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.mediana['c16'] }
    ];

    optionVitalSignsthree = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#FAFAFA',
            color: '#040E29',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          }
        },
        showDelay: 0,
        transitionDuration: 0.2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 5,
        textStyle: {
          color: '#414D55',
          fontSize: 12,
          lineHeight:10,
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        extraCssText: 'box-shadow: 0px 1px 8px #142E6E1A'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 10,
        bottom: 20,
        itemGap : 25,
        width: '90%',
        inactiveColor: '#728998',
        textStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        pageIconSize: 12,
        pageIconColor: '#FAFAFA',
        pageIconInactiveColor: '#414D55',
        pageTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        formatter : function(params, value){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 50;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p === rowNumber - 1) {
                    tempStr = (params.length > 6 ? (params.slice(0,50)+"...") : '' );
                } else {}
                newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
        },
        data: ['Mediana General', 'Mediana Theta', 'Mediana Alpha','Mediana Beta']
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          dataZoom: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          restore: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          saveAsImage: {
            type: 'png',
            name: 'medidas_tendencia_reposo',
            backgroundColor: '#272727',
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          }
        },
        iconStyle: {
          borderColor: '#414D55'
        },
        emphasis: {
          iconStyle: {
            borderColor: '#414D55'
          },
        },
        bottom: 0,
        pixelRatio: 2,
      },
      grid: [
        {
          containLabel: true,
          borderColor: '#728998'
        }
      ],
      xAxis: {
        type: 'category',
        name: 'Canal',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLabel: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLine: {
          lineStyle: {
            color: '#728998',
            width: 1,
          }
        },
        boundaryGap: true,
        data: dataVitalSignsthree.map(item => item.valueOne)
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#728998',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
      ],
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Mediana General',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#d1a207",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueTwo),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Mediana Theta',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F96767",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueThree),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Mediana Alpha',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F19420",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueFour),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            clip: true,
            lineStyle: {
              width: 2,
            },
            top: 15,
            name: 'Mediana Beta',
            label: {
              normal: {
              show: false,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
            },
            itemStyle: {
              color: "#0463a2",
              shadowBlur: 0,
              shadowOffsetY: 0,
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: dataVitalSignsthree.map(item => item.valueFive),
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionVitalSignsthree && chartVitalSignsthree.setOption(optionVitalSignsthree);

    $(window).on('resize', function(){
      if(chartVitalSignsthree != null && chartVitalSignsthree !== undefined){
        chartVitalSignsthree.resize();
      }
    });
    },[])


    React.useEffect(()=>{
        /**
     * GRAFICA SIGN IMC, PESO Y TALLA (LINE CHART)
     */

    let chartVitalSignsthree = echarts.init(document.getElementById('chart-vital-sign-nine-'));
    let optionVitalSignsthree;

    const dataVitalSignsthree =[
      { valueOne: 'C1', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c1'], valueThree:selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c1'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c1'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c1'] },
      { valueOne: 'C2', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c2'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c2'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c2'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c2'] },
      { valueOne: 'C3', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c3'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c3'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c3'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c3'] },
      { valueOne: 'C4', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c4'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c4'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c4'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c4'] },
      { valueOne: 'C5', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c5'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c5'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c5'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c5'] },
      { valueOne: 'C6', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c6'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c6'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c6'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c6'] },
      { valueOne: 'C7', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c7'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c7'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c7'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c7'] },
      { valueOne: 'C8', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c8'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c8'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c8'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c8'] },
      { valueOne: 'C9', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c9'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c9'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c9'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c9'] },
      { valueOne: 'C10', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c10'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c10'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c10'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c10'] },
      { valueOne: 'C11', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c11'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c11'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c11'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c11'] },
      { valueOne: 'C12', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c12'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c12'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c12'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c12'] },
      { valueOne: 'C13', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c13'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c13'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c13'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c13'] },
      { valueOne: 'C14', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c14'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c14'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c14'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c14'] },
      { valueOne: 'C15', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c15'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c15'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c15'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c15'] },
      { valueOne: 'C16', valueTwo: selectCompleteDate?.analisis_senal_reposo?.general?.varianza['c16'], valueThree: selectCompleteDate?.analisis_senal_reposo?.theta?.varianza['c16'], valueFour: selectCompleteDate?.analisis_senal_reposo?.alpha?.varianza['c16'] ,valueFive: selectCompleteDate?.analisis_senal_reposo?.beta?.varianza['c16'] }
    ];

    optionVitalSignsthree = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#FAFAFA',
            color: '#040E29',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          }
        },
        showDelay: 0,
        transitionDuration: 0.2,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 5,
        textStyle: {
          color: '#414D55',
          fontSize: 12,
          lineHeight:10,
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        extraCssText: 'box-shadow: 0px 1px 8px #142E6E1A'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 10,
        bottom: 20,
        itemGap : 25,
        width: '90%',
        inactiveColor: '#728998',
        textStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        pageIconSize: 12,
        pageIconColor: '#FAFAFA',
        pageIconInactiveColor: '#414D55',
        pageTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular, Verdana',
        },
        formatter : function(params, value){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = 50;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                if (p === rowNumber - 1) {
                    tempStr = (params.length > 6 ? (params.slice(0,50)+"...") : '' );
                } else {}
                newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
        },
        data: ['Varianza General', 'Varianza Theta', 'Varianza Alpha','Varianza Beta']
      },
      toolbox: {
        show: true,
        orient: 'horizontal',
        showTitle: false,
        feature: {
          dataZoom: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          restore: {
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          },
          saveAsImage: {
            type: 'png',
            name: 'medidas_tendencia_reposo',
            backgroundColor: '#272727',
            show: true,
            iconStyle: {
              borderColor: '#414D55'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#414D55'
              },
            }
          }
        },
        iconStyle: {
          borderColor: '#414D55'
        },
        emphasis: {
          iconStyle: {
            borderColor: '#414D55'
          },
        },
        bottom: 0,
        pixelRatio: 2,
      },
      grid: [
        {
          containLabel: true,
          borderColor: '#728998'
        }
      ],
      xAxis: {
        type: 'category',
        name: 'Canal',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLabel: {
          color: '#FAFAFA',
          fontWeight: 'normal',
          fontFamily: 'Monserat-regular'
        },
        axisLine: {
          lineStyle: {
            color: '#728998',
            width: 1,
          }
        },
        boundaryGap: true,
        data: dataVitalSignsthree.map(item => item.valueOne)
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
        {
          type: 'value',
          name: '',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: {
            color: '#FAFAFA',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          axisLabel: {
            formatter : function(params, value){
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 12;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    if (p === rowNumber - 1) {
                        tempStr = (params.length > 6 ? (params.slice(0,12)+"...") : '' );
                    } else {}
                    newParamsName += tempStr;
                  }
              } else {
                newParamsName = params;
              }
              return newParamsName
            },
            color: '#728998',
            fontWeight: 'normal',
            fontFamily: 'Monserat-regular'
          },
          boundaryGap: [0, '0%'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#728998',
              width: 1,
            }
          },
        },
      ],
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Varianza General',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#d1a207",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueTwo),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Varianza Theta',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#414D55',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F96767",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueThree),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
          type: 'line',
          symbol: 'circle',
          smooth: true,
          clip: true,
          lineStyle: {
            width: 2,
          },
          top: 15,
          name: 'Varianza Alpha',
          label: {
            normal: {
              show: false,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              position: 'top',
              color: '#FAFAFA',
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
          },
          itemStyle: {
            color: "#F19420",
            shadowBlur: 0,
            shadowOffsetY: 0,
          },
          lableLine: {
            normal: {
              show: false,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            },
            emphasis: {
              show: true,
              fontSize: 12,
              fontWeight: 'normal',
              fontFamily: 'Monserat-regular'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: dataVitalSignsthree.map(item => item.valueFour),
          animationDelay: function (idx) {
            return idx * 15;
          }
        },
        {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            clip: true,
            lineStyle: {
              width: 2,
            },
            top: 15,
            name: 'Varianza Beta',
            label: {
              normal: {
              show: false,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                position: 'top',
                color: '#FAFAFA',
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
            },
            itemStyle: {
              color: "#0463a2",
              shadowBlur: 0,
              shadowOffsetY: 0,
            },
            lableLine: {
              normal: {
                show: false,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              },
              emphasis: {
                show: true,
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Monserat-regular'
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: dataVitalSignsthree.map(item => item.valueFive),
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    optionVitalSignsthree && chartVitalSignsthree.setOption(optionVitalSignsthree);

    $(window).on('resize', function(){
      if(chartVitalSignsthree != null && chartVitalSignsthree !== undefined){
        chartVitalSignsthree.resize();
      }
    });
    },[])




    return (
        <React.Fragment>
            <div className='ContainerGraph'>
                <div onClick={()=>navigate('/ModulsMedic/HistoryDatesPatients/ListPatientDates/')}  className='ButtonElement'style={{'marginBottom':'80px'}}>
                                <span  className='ButtonText'>Regresar</span>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center align-self-center mb-1'>
                        <h1 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- font_medium white orangeV3'>
                            Análisis señal activa
                        </h1>
                </div>
                <div id='wrapper-data-table' className='w-100 position-relative'>
                                <div className='card-body p-4 pt-0 pb-0 w-100'>
                                    <div className='table-responsive table-general-'>
                                    <table className='table table-sm table-striped table-no-border- align-middle'>
                                        <thead>
                                        <tr>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium '>Canal</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (General)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (banda theta)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (banda alpha)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (banda beta)</span>
                                            </div>
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium orangeV3'>C1</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c1']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C2</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c2']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C3</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c3']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C4</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c4']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C5</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c5']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C6</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c6']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C7</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c7']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C8</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c8']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C9</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c9']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C10</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c10']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C11</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center '>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c11']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C12</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c12']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C13</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c13']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C14</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c14']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C15</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c15']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C16</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.maximo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.maximo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.maximo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.maximo['c16']}</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                </div>
                <div id='wrapper-data-table' className='w-100 position-relative'>
                                <div className='card-body p-4 pt-0 pb-0 w-100'>
                                    <div className='table-responsive table-general-'>
                                    <table className='table table-sm table-striped table-no-border- align-middle'>
                                        <thead>
                                        <tr>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium '>Canal</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (General)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (banda theta)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (banda alpha)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (banda beta)</span>
                                            </div>
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium orangeV3'>C1</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c1']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C2</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c2']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C3</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c3']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C4</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c4']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C5</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c5']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C6</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c6']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C7</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c7']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C8</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c8']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C9</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c9']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C10</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c10']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C11</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center '>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c11']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C12</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c12']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C13</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c13']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C14</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c14']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C15</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c15']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C16</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.general?.minimo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.theta?.minimo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_activo?.alpha?.minimo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_activo?.beta?.minimo['c16']}</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center align-self-center mb-1' style={{'marginTop':'20px'}}>
                    <h5 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- font_medium white'>
                        Medidas de tendencia 
                    </h5>
                </div>
                <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-vital-sign-three-'></div>
                </div>

                <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-vital-sign-four-'></div>
                </div>

                <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-vital-sign-five-'></div>
                </div>

                <div className='d-flex flex-row justify-content-between align-items-center align-self-center mb-1'>
                        <h1 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- font_medium white orangeV3'>
                            Análisis señal reposo
                        </h1>
                </div>
                <div id='wrapper-data-table' className='w-100 position-relative'>
                                <div className='card-body p-4 pt-0 pb-0 w-100'>
                                    <div className='table-responsive table-general-'>
                                    <table className='table table-sm table-striped table-no-border- align-middle'>
                                        <thead>
                                        <tr>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium '>Canal</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (General)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (banda theta)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (banda alpha)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Máximo (banda beta)</span>
                                            </div>
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium orangeV3'>C1</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c1']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C2</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c2']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C3</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c3']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C4</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c4']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C5</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c5']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C6</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c6']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C7</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c7']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C8</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c8']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C9</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c9']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C10</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c10']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C11</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center '>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c11']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C12</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c12']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C13</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c13']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C14</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c14']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C15</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c15']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C16</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.maximo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.maximo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.maximo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.maximo['c16']}</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                </div>
                <div id='wrapper-data-table' className='w-100 position-relative'>
                                <div className='card-body p-4 pt-0 pb-0 w-100'>
                                    <div className='table-responsive table-general-'>
                                    <table className='table table-sm table-striped table-no-border- align-middle'>
                                        <thead>
                                        <tr>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium '>Canal</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (General)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (banda theta)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (banda alpha)</span>
                                            </div>
                                            </th>
                                            <th scope="col" className='th-width-sm-'>
                                            <div className='d-flex flex-row justify-content-center align-items-center align-self-center w-100'>
                                                <span className='fs-5- ff-monse-regular- fw-bold tx-dark-purple- font_medium'>Mínimo (banda beta)</span>
                                            </div>
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium orangeV3'>C1</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c1']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c1']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C2</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c2']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c2']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C3</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c3']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c3']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C4</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c4']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c4']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C5</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c5']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c5']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C6</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c6']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c6']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C7</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c7']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c7']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C8</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c8']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c8']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C9</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c9']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c9']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C10</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c10']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c10']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C11</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center '>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c11']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c11']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C12</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c12']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c12']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C13</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c13']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c13']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C14</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c14']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c14']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C15</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c15']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c15']}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center orangeV3'>C16</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.general?.minimo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.theta?.minimo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center'>{selectCompleteDate?.analisis_senal_reposo?.alpha?.minimo['c16']}</p>
                                            </td>
                                            <td className='align-middle'>
                                            <p className='m-0 lh-sm fs-5- ff-monse-regular- fw-normal text-center font_medium'>{selectCompleteDate?.analisis_senal_reposo?.beta?.minimo['c16']}</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                </div>
                
                {/* <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-adverse-events-one-' style={{'width':'100%','height':'400px'}}></div>
                </div> */}
                

                <div className='d-flex flex-row justify-content-between align-items-center align-self-center mb-1' style={{'marginTop':'20px'}}>
                    <h5 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- font_medium white'>
                        Medidas de tendencia 
                    </h5>
                </div>
                <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-vital-sign-seven-'></div>
                </div>

                <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-vital-sign-eight-'></div>
                </div>

                <div className='card-body p-4 w-100' style={{'width':'100%','height':'400px'}}>
                    <div className='w-100 h-100 mx-auto' id='chart-vital-sign-nine-'></div>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center align-self-center mb-1'>
                        <h1 className='m-0 p-0 lh-sm fs-4- ff-monse-regular- fw-bold tx-dark-purple- font_medium white orangeV3'>
                            Topoplots
                        </h1>
                </div>
                <div className='topoplotsContainer'>
                        <div  className='topoplotContainer'>
                                <img onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_general)} src={selectCompleteDate?.imag_topo_activo_general} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>General activo</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_general)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div> 
                        </div>
                        <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_general)} className='topoplotContainer'>
                                <img src={selectCompleteDate?.imag_topo_reposo_general} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Reposo general</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_general)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div>
                        </div>
                </div>
                <div className='topoplotsContainer'>
                        <div  className='topoplotContainer'>
                                <img onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_alpha)} src={selectCompleteDate?.imag_topo_activo_alpha} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Activo alpha</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_alpha)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div> 
                        </div>
                        <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_alpha)} className='topoplotContainer'>
                                <img src={selectCompleteDate?.imag_topo_reposo_alpha} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Reposo alpha</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_alpha)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div>
                        </div>
                </div>
                <div className='topoplotsContainer'>
                        <div  className='topoplotContainer'>
                                <img onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_beta)} src={selectCompleteDate?.imag_topo_activo_beta} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Activo beta</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_beta)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div> 
                        </div>
                        <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_beta)} className='topoplotContainer'>
                                <img src={selectCompleteDate?.imag_topo_reposo_beta} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Reposo beta</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_beta)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div>
                        </div>
                </div>
                <div className='topoplotsContainer'>
                        <div  className='topoplotContainer'>
                                <img onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_delta)} src={selectCompleteDate?.imag_topo_activo_delta} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Activo delta</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_delta)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div> 
                        </div>
                        <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_delta)} className='topoplotContainer'>
                                <img src={selectCompleteDate?.imag_topo_reposo_delta} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Reposo delta</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_delta)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div>
                        </div>
                </div>
                <div className='topoplotsContainer'>
                        <div  className='topoplotContainer'>
                                <img onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_theta)} src={selectCompleteDate?.imag_topo_activo_theta} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Activo theta</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_activo_theta)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div> 
                        </div>
                        <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_theta)} className='topoplotContainer'>
                                <img src={selectCompleteDate?.imag_topo_reposo_theta} className='topoplot'></img>
                                <span className='nameTopoplot font_medium'>Reposo theta</span>
                                <div onClick={()=>window.open(selectCompleteDate?.imag_topo_reposo_theta)} className='IConTopoplot'>
                                      <IoMdDownload  color='white' size={20}/>
                                </div>
                        </div>
                </div>
                

                <div onClick={()=>window.open(selectCompleteDate?.documento_topoplot_test)}  className='ButtonElement'style={{'marginBottom':'80px'}}>
                                <span  className='ButtonText'>Visualizar pdf</span>
                </div>
            </div>
            
        </React.Fragment>
    )
}
