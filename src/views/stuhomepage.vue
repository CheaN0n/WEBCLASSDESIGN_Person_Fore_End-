<template>
    <body>
<section class="container">
    <section class="left">
        <div class="title"><img src="../assets/logo.jpg">学生信息管理系统</div>
        <nav class="leftsider">
            <ul>
                <li><a href='#' class="selected" target="_self">首页</a></li>
                <li><a href='#' @click="toinfo" >基本信息</a></li>
                <li><a href='#' @click="toselectclass" >学生选课</a></li>
                <li><a href='#' @click="togradecheck">成绩查看</a></li>
                <li><a href="#">社会成果</a></li>
                <li><a href="#">网站支持</a></li>
            </ul>
        </nav>
    </section>
    <section class="right">
        <section class="upcontent">
            <div class="wel">欢迎用户 <a href="#" @click="toinfo">{{this.stuinfo.username}}</a></div>
            <a href="#" class="changekey" @click="tochangepassword">密码修改<div class="iconfont icon-3denglumima"></div> </a>
            <a href="/" class="exit">退出<div class="iconfont icon-Enter-2"></div></a>
        </section>
        <section class="main">
            <section class="timetablemod" id="graph1">
            </section>
            <section class="announcemod">
                <div class="iconfont icon-gengduo"></div>
            <section class="announcement">
                <div class="antitle">
                    最新通知<div class="iconfont icon-gonggao1"></div>
                </div>
                <div class="ancontent" >
                    <ul>
                        <li><a href="#">学生信息管理系统今日正式上线</a></li>
                        <li><a href="#">10月21日更新日志</a></li>
                        <li><a href="#">教师端系统正在开发</a></li>
                    </ul>
                </div>
            </section>
            </section>
            <section class="infomod">
                <div class="iconfont icon-gengduo"></div>
                <section class="infofinishcal">
                    <h2>账号管理</h2>
                    <div class="infograph" id="graph2"></div>
                    <h4>个人资料完善度</h4>
                    <a href="#" @click="toinfo">立即去补充<div class="iconfont icon-youjiantou"></div></a>
                </section>
            </section>
            <section class="calendarmod">
                <div class="iconfont icon-gengduo"></div>
            <section class="calendarpanel">
                <h3>日历</h3>
                <div class="calendar" id="calendar"></div>
            </section>
            </section>
            <section class="todaytodomod">
                <div class="iconfont icon-gengduo"></div>
                <h3>今日待办</h3>
                <div class="todaytodocontent">暂无</div>
            </section>
            <section class="instructionmod">
                <div class="iconfont icon-gengduo"></div>
                <h3>导航说明</h3>
                <ul>
                    <li>基本信息：查看或修改学生信息</li>
                    <li>学生选课：进行选课或查看已选课程</li>
                    <li>成绩查看：查看本学期已选课程成绩</li>
                    <li>社会成果：查看或修改本学期社会实践活动</li>
                    <li>网站支持：查看制作者信息</li>
                </ul>
            </section>
        </section>
    </section>
</section>
<footer>
    <section class="footerimg">
        <img src="../assets/footer.png">
        <div class="intro">本网页设计仅供课程设计使用</div>
    </section>
    <section class="copyright">System 山东大学信息管理系统 ©2004-2021 SDU Studemt Information Control Systembr <br> PE: 0.031701s , QE: 12, Redis On</section>
</footer>
</body>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: 'stuhomepage',
  data () {
    return {
        chart:null,
        classDatas:[],
        stuinfo: {
          username:'',
          password:'',
        },
    }
  },
  created (){
        this.stuinfo = JSON.parse(this.$route.query.ruleForm) 
        const _this = this;
        axios.get('http://localhost:8181/grade/checkgrade/'+_this.stuinfo.username).then(function(resp){
            for(var i in resp.data){
                _this.classDatas[i] = (resp.data[i].timeandplace).split('/');
                _this.classDatas[i][2]+='\n'+resp.data[i].name+'\n';
            //  console.log((resp.data[i].timeandplace).split('/'));
            }
            // for(var j in _this.classDatas){
            //     console.log(_this.classDatas[j])
            // }
            console.log(_this.classDatas)
            _this.timetable();
            // _this.gradechart();
        })
  },
  mounted () {
    this.infochart();
    this.$chart.calendar()
  },
  methods:{
      toinfo (){
          const _this = this;
          _this.$router.push({
              path:'/stuinfo',
              query:{
                  stuinfo: JSON.stringify(this.stuinfo)
              }
          })
      },
      tochangepassword(){
          const _this = this;
          _this.$router.push({
              path:'/stuinfo?#changePassword',
              query:{
                  stuinfo: JSON.stringify(this.stuinfo)
              }
          })
      },
      toselectclass (){
          const _this = this;
          _this.$router.push({
              path:'/selectclass',
              query:{
                  stuinfo: JSON.stringify(this.stuinfo)
              }
          })
      },
      togradecheck(){
          const _this = this;
          _this.$router.push({
              path:'/gradecheck',
              query:{
                  stuinfo: JSON.stringify(this.stuinfo)
              }
          })
      },
      timetable:function (){
        const _this = this;
        var myChart = echarts.init(document.getElementById('graph1'));
        myChart.setOption({
            backgroundColor: 'white',
            title: {
                text: '课程表',
                subtext: '数据来自选课平台',
 
            },
            legend: {
                top: 20,
                right: 80,
                inactiveColor: '#9FB6CD',
                textStyle: {
                    color: '#6495ED'
                }
 
            },
            grid: {},
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            tooltip: {
                show: true,
                formatter:'{c}',
                //trigger:'axis',
                hideDelay: 300,
            },
            xAxis: {
                type: 'category',
                data: ['', '08:00-09:50', '10:10-12:00', '14:00-15:50', '16:10-18:00', '19:00-20:50'],
                boundaryGap: false,
                splitLine: {
                    show: true
                },
                axisLabel: {
                    interval: 0,
                    rotate: 30
                }
 
            },
 
            yAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    show: true
                },
                data: ['', '周一', '周二', '周三', '周四', '周五','']
            },
            series: [{
                type: 'scatter',
                symbol: 'pin',
                symbolSize: 60,
                //symbolRotate:30,
                label: {
                    normal: {
                        show: true,
                        rotate: 30,
                        backgroundColor: 'rgb(224,255,255)',
                        borderColor: '#aaa',
                        fontWeight: 200,
                        borderWidth: 1,
                        borderRadius: 4,
                        formatter: [
                            '{a|{c}}'
                        ].join('\n'),
                        rich: {
                            a: {
                                align: 'center',
                                color: '#000',
                                fontSize: 15,
                                textShadowBlur: 2,
                                //textShadowColor: '#7A67EE',
                                textBorderColor: '#9F79EE',
                                textBorderWidth: 1
                            },
                        }
                    }
                },
                coordinateSystem: 'cartesian2d',
                data: _this.classDatas
 
            }, 
            ]
        });
        
      },
      infochart() {
            this.chart = echarts.init(document.getElementById("graph2"))
            this.chart.clear()
            this.chart.setOption({
                    backgroundColor:'#fff',
                    grid: {
                        left: '10%',
                        right: '10%',
                        top: '10%',
                        bottom: '5%',
                        containLabel: true,
                        // show: true,
                    },
                    title: {
                        text: '{a|' + 50 + '}{c|' + 33 + '}',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            rich: {
                                a: {
                                    fontSize: 50,
                                    fontWeight: 700,
                                    color: '#579ff9'
                                },
                                c: {
                                    fontSize: 25,
                                    color: '#579ff9',
                                    fontWeight: 500,
                                    padding: [5, 0]
                                }
                            }
                        }
                    },
                    series: [
                        {
                            type: 'gauge',
                            startAngle: 270,
                            endAngle: -89.9999,
                            center: ['50%', '50%'],
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            radius: '78%',
                            splitNumber: '52',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: [
                                        [1, '#2f78d3']
                                    ],
                                    width: 20
                                }
                            },
                            splitLine: {
                                length: 30,
                                lineStyle: {
                                    width: 5,
                                    color: '#1755ff',
                                    distance: 10,
                                } //刻度节点线
                            },
                            detail: {
                                show: false
                            },
                        }, //外环刻度
                        {
                            type: 'gauge',
                            radius: '68%',
                            clockwise: true,
                            startAngle: '90',
                            endAngle: '-269.9999',
                            splitNumber: 15,
                            detail: {
                                offsetCenter: [0, -50],
                                formatter: ' '
                            },
                            pointer: {
                                show: false
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: [
                                        [0, '#1452ff'],
                                        [52 / 100, '#65b4ff'],
                                        [1, '#1654ff']
                                    ],
                                    width: 70
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: false
                            }
                        }, //中间环形
                        {
                            type: 'gauge',
                            radius: '68%',
                            clockwise: true,
                            startAngle: '90',
                            endAngle: '-269.9999',
                            splitNumber: 12,
                            detail: {
                                offsetCenter: [0, -50],
                                formatter: ' '
                            },
                            pointer: {
                                show: false
                            },
                            axisLine: {
                                show: false,

                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true,
                                length: 70,
                                lineStyle: {
                                    color: '#051F54',
                                    width: 20,
                                }
                            },
                            axisLabel: {
                                show: false
                            }
                        }, //中间环形分割线

                        {
                            type: 'pie',
                            name: '内层细圆环',
                            radius: ['44%', '46%'],
                            hoverAnimation: false,
                            clockWise: false,
                            itemStyle: {
                                normal: {
                                    color: '#0C355E'
                                }
                            },
                            label: {
                                show: false
                            },
                            data: [100]
                        } //内层细圆环
                    ]
                });
            }
      
  }
}
</script>
<style>
.container{
    overflow: hidden;
}
/*两栏布局，左侧固定，右侧自适应*/
/*左侧*/
.left{
    width: 200px;
    float: left;
    margin-right: -200px;
    position: relative;

}
.left .title{
    font-size: 16px;
    text-align: left;
    background-color: #3582d6;
    color: white;
    height: 35px;
    padding-top: 40px;
    padding-bottom: 15px;
}
/*左侧栏*/
.leftsider{
    float: left;
    width: 200px;
    height: 400px;
    margin-top: -12px;

}
.leftsider ul{
    background: url(../assets/directory_bg_big.gif);
    padding-left: 50px;
    list-style-type: none;
    line-height: 45px;
    font-size: 20px;
    font-style: normal;
    font-family: sans-serif;
}
.leftsider ul li{
    padding: 9px 0 7px;
}
.leftsider ul li a:hover{
    color: #ff4f46;
}
.leftsider ul li a{
    color: #000000;
    text-decoration: none;
}
.leftsider ul li .selected{
    color: #1500e5;
}
/*右侧*/
.right{
    width: 100%;
    float: left;
    margin-left: 200px;
    background: white;
    /* background: #cd1f46; */
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}
.upcontent{
    background: #3582d6;
    color: white;
    height: 29px;
    padding-top: 61px;
}

.upcontent a:hover{
    color: yellow;
}
.upcontent .wel{
    display: inline-block;
    margin-left: 650px;
    margin-bottom: 8px;
}
.upcontent .wel a{
    color: white;
    text-decoration: none;
    font-weight: bold;
}
.upcontent .wel a:hover{
    color: yellow;
}
.upcontent .changekey{
    padding-left: 25px;
    display: inline-block;
    margin-bottom: 8px;
    color: white;
    text-decoration: none;
    font-weight: bold;
}
.upcontent .changekey .icon-3denglumima{
    display: inline;
}

.upcontent .exit{
    padding-left: 25px;
    display: inline-block;
    color: white;
    font-weight: bold;
    text-decoration: none;
    margin-bottom: 8px;
}
.upcontent .exit .icon-Enter-2{
    display: inline;
}
.main{
    overflow: hidden;
    background-color: #eeeeee;
}
.main .icon-gengduo{
    margin-top: 15px;
    margin-right: 15px;
    float: right;
    font-size: 35px;
    color: #3582d6;
}
.main .timetablemod{
    background-color: white;
    margin-top: 50px;
    margin-left:30px;
    display: block;
    width: 1080px;
    height: 600px;
    border: 2px solid rgba(45, 43, 43, 0.44);

}
.main .announcemod{
    background-color: white;
    width: 600px;
    height: 500px;
    display: block;
    float: left;
    margin-top: 50px;
    margin-left: 30px;
    border: 2px solid rgba(45, 43, 43, 0.44);
}
.main .announcement{
    margin-top: 75px;
    margin-left: 45px;
    width: 500px;
    height: 350px;
    border:10px solid #ddd;
    border-image: -webkit-linear-gradient(#F80, #2ED) 20 20;
    border-image: -moz-linear-gradient(#F80, #2ED) 20 20;
    border-image: -o-linear-gradient(#F80, #2ED) 20 20;
    border-image: linear-gradient(#F80, #2ED) 20 20;
}
.main .announcement .antitle{
    font-size: 20px;
    padding: 10px 10px 10px;
    border-bottom: 1px solid #3582d6;
}
.main .announcement .ancontent ul{
    font-size: 18px;
    line-height: 2em;
}
.main .announcement .ancontent ul li a{
    text-decoration: none;
}
.main .announcement .ancontent ul li a:hover{
    color: yellow;
}
.main .announcement .antitle .icon-gonggao1{
    display: inline-block;
}
.main .calendarmod{
    background-color: white;
    text-align: center;
    width: 600px;
    height: 400px;
    border: 2px solid rgba(45, 43, 43, 0.44);
    margin-top: 600px;
    margin-left: 30px;
    margin-bottom: 50px;
}
.main .calendarmod .calendarpanel{
    width: 470px;
    margin-left: 75px;
    margin-top: 25px;
    border: 1px solid #eeeeee;
}
.main .calendar .calendar-title-box{
    position: relative;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align:center;
    border-bottom: 1px solid #ddd;
}
.calendar .prev-month {
    position: absolute;
    top: 12px;
    left: 0px;
    display: inline-block;
    width: 0px;
    height: 0px;
    border-left: 0px;
    border-top: 6px solid transparent;
    border-right: 8px solid #999;
    border-bottom: 6px solid transparent;
    cursor: pointer;
}
.calendar .next-month {
    position: absolute;
    top: 12px;
    right: 0px;
    display: inline-block;
    width: 0px;
    height: 0px;
    border-right: 0px;
    border-top: 6px solid transparent;
    border-left: 8px solid #999;
    border-bottom: 6px solid transparent;
    cursor: pointer;
}

.calendar-table{
    width: 100%;
    border-collapse: collapse;
    text-align:center;
}

.calendar-table tr{
    height: 30px;
    line-height: 30px;
}

.currentDay {
    background: rgba(53, 130, 214, 0.83);
}

.currentMonth {
    color: #999;
}

.otherMonth{
    background: rgba(53, 130, 214, 0.09);
}
.infomod{
    float: right;
    background-color: white;
    width: 475px;
    height: 250px;
    border: 2px solid rgba(45, 43, 43, 0.44);
    margin-right: 230px;
    margin-top: 50px;
    display: block;
}
.infomod h2{
    border-bottom: 1px solid #3582d6;
}
.infomod .infofinishcal h2{
    text-align: center;
}
.infomod .infofinishcal a{
    margin-right: 100px;
    text-decoration: none;
    float: right;
    color: #3582d6;
}
.infomod .infofinishcal a .icon-youjiantou{
    display: inline-block;
}

.infomod .infofinishcal h4{
    float: left;
    margin-left: 25px;
    line-height: 15px;
}

.infograph{
    width: 135px;
    height: 135px;
    margin-left: 20px;

}
.main .todaytodomod{
    width: 475px;
    height: 150px;
    float: right;
    display: block;
    background-color: white;
    margin-right: 230px;
    margin-top: -700px;
    border: 2px solid rgba(45, 43, 43, 0.44);
    padding-top: 10px;
    padding-bottom: 10px;
}
.main .todaytodomod h3{
    border-bottom: 1px solid #3582d6;
    margin-left: 10px;
}
.main .todaytodomod .todaytodocontent{
    text-align: center;
    margin-top: 50px;
    font-size: 20px;
}
.main .instructionmod {
    width: 475px;
    height: 300px;
    float: right;
    display: block;
    background-color: white;
    margin-right: 230px;
    margin-top: -450px;
    border: 2px solid rgba(45, 43, 43, 0.44);
    padding-top: 10px;
    padding-bottom: 10px;
}
.main .instructionmod h3{
    border-bottom: 1px solid #3582d6;
    margin-left: 10px;
}
.main .instructionmod ul{
    line-height: 2em;
}
footer{
    margin-bottom: 23px;
    margin-top: 30px;
}
.footerimg{
    width: 100%;
    height: 132px;
    /*background-color:rgb(87,186,232);*/
    background-color: #3582d6;
}
.footerimg .intro{
    text-align: right;
    font-size: 14px;
    float: right;
    margin-top: 20px;
    margin-right: 10px;
    color: white;
}
.copyright{
    font-size: 10px;
    text-align: right;
}
</style>
