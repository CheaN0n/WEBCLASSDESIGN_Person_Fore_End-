<template>
<body>
<section class="container">
    <section class="left">
        <div class="title"><img src="../assets/logo.jpg">学生信息管理系统</div>
        <nav class="leftsider">
            <ul>
                    <li><a href='#' @click="tohomepage">首页</a></li>
                    <li><a href='#' @click="toinfo" >基本信息</a></li>
                    <li><a href='#' @click="toselectclass">学生选课</a></li>
                    <li><a href='#' @click="togradecheck" class="selected">成绩查看</a></li>
                    <li><a href="#">社会成果</a></li>
                    <li><a href="#">网站支持</a></li>
            </ul>
        </nav>
    </section>
    <section class="right">
        <section class="upcontent">
            <div class="wel">欢迎用户 <a href="#" @click="toinfo">{{this.username}}</a></div>
            <a href="#" class="changekey" @click="tochangepassword">密码修改<div class="iconfont icon-3denglumima"></div> </a>
            <a href="/" class="exit">退出<div class="iconfont icon-Enter-2"></div></a>
        </section>
        <section class="graph" id="main">
        </section>
        <section class="gradetable">
            <el-table :data="stuGrade">
                <el-table-column prop="coursenumber" label="课序号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="课程名称" width="140">
                </el-table-column>
                <el-table-column prop="point" label="学分" width="140">
                </el-table-column>
                <el-table-column prop="teacher" label="任课教师" width="140">
                </el-table-column>
                <el-table-column prop="classgrade" label="成绩" width="140">
                </el-table-column>
                <el-table-column prop="tips" label="备注/课程说明">
                </el-table-column>
            </el-table>
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
        username: '',
        stuGrade:[],
        classnames:[],
        classgrades:[],
        averagegrades:[]
    }

  },
  methods:{
    show(){
      console.log(this.classnames);
    },
      tohomepage (){
          const _this = this;
          _this.$router.push({
              path:'/stuhomepage',
              query:{
                username: JSON.stringify(this.username)
              }
          })
      },
      toinfo (){
          const _this = this;
          _this.$router.push({
              path:'/stuinfo',
              query:{
                username: JSON.stringify(this.username)
              }
          })
      },
      tochangepassword(){
          const _this = this;
          _this.$router.push({
              path:'/stuinfo?#changePassword',
              query:{
                username: JSON.stringify(this.username)
              }
          })
      },
      toselectclass (){
          const _this = this;
          _this.$router.push({
              path:'/selectclass',
              query:{
                username: JSON.stringify(this.username)
              }
          })
      },
      togradecheck(){
          const _this = this;
          _this.$router.push({
              path:'/gradecheck',
              query:{
                username: JSON.stringify(this.username)
              }
          })
      },
      gradechart: function () {
            const _this = this;
            this.chart = echarts.init(document.getElementById("main"))
            this.chart.clear()
            var myChart = this.chart
            var option
            option = {
              title: {
                text: '个人成绩与平均成绩对比',
                subtext: '如果成绩未正确显示请耐心等待成绩完全录入'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['个人成绩', '平均成绩']
              },
              toolbox: {
                show: true,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  data: _this.classnames
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '个人成绩',
                  type: 'bar',
                  data: _this.classgrades,
                  markPoint: {
                    data: [
                      { type: 'max', name: 'Max' },
                      { type: 'min', name: 'Min' }
                    ]
                  },
                  markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                  }
                },
                {
                  name: '平均成绩',
                  type: 'bar',
                  data: _this.averagegrades,
                  markPoint: {
                    data: [
                      {name: 'Max'},
                      {name: 'Min'}
                    ]
                  },
                  markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                  }
                }
              ]
            }
            if (option && typeof option === 'object') {
              myChart.setOption(option)
            }
          }
  },
  created(){
      const _this=this
        _this.username = JSON.parse(_this.$route.query.username)
        axios.get('http://localhost:8181/grade/getave/'+_this.username).then(function(resp0){
          _this.averagegrades = resp0.data;
        })
        axios.get('http://localhost:8181/grade/checkgrade/'+_this.username).then(function(resp){
            _this.stuGrade=resp.data;
            for(var i in _this.stuGrade){
              _this.classnames[i] = _this.stuGrade[i].name;
              _this.classgrades[i] = _this.stuGrade[i].classgrade;
            }
            _this.gradechart();
        })
  },
  mounted(){
  }

}
</script>
<style>
.container{
    overflow: hidden;
    background: rgba(204, 204, 204, 0.31);
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
.right .graph{
    margin-top: 50px;
    width: 1150px;
    height:600px;
    display: block;
}
.gradetable{
  margin-left: 45px;
}
.right .gradetable .el-table{
    border: 3px solid #3582d6;
    width: 1000px;
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
