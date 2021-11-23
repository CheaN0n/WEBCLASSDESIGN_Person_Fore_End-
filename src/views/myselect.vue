<template>
    <body>
<section class="container">
    <section class="left">
        <div class="title"><img src="../assets/logo.jpg">学生信息管理系统</div>
        <nav class="leftsider">
            <ul>
                    <li><a href='#' @click="tohomepage">首页</a></li>
                    <li><a href='#' @click="toinfo" >基本信息</a></li>
                    <li><a href='#' @click="toselectclass" class="selected">学生选课</a></li>
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
        <nav class="subnav">
            <ul>
                <li><a href="#" @click="toselectclass">选课管理</a></li>
                <li><a href="#" class="selected">我的选课</a></li>
            </ul>
        </nav>
        <section class="myselection">
            <el-table :data="myclasslist">
                <el-table-column prop="coursenumber" label="课序号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="课程名称" width="140">
                </el-table-column>
                <el-table-column prop="point" label="学分">
                </el-table-column>
                <el-table-column prop="teacher" label="任课教师">
                </el-table-column>
                <el-table-column prop="timeandplace" label="上课时间&地点" width="180">
                </el-table-column>
                <el-table-column prop="tips" label="备注/课程说明">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="cancel(scope.row)" type="text" size="small">退选</el-button>
                </template>
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
export default {
  name: 'choosedclasses',
  data () {
    return {
     myclasslist:[
     ],
     stuinfo:{
            username: '',
            password: '',
        }
    }
  },
   methods:{
      tohomepage (){
          const _this = this;
          _this.$router.push({
              path:'/stuhomepage',
              query:{
                  ruleForm: JSON.stringify(this.stuinfo)
              }
          })
      },
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
      cancel (row){
          const _this = this;
          this.$confirm('是否确认退选?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           axios.delete('http://localhost:8181/grade/deleteById/'+row.id).then(function(resp2){
              _this.$message({
                      message: '退选成功',
                      type: 'success'
                    });
              _this.$router.go(0);      
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退选'
          });          
        });
          

      }
  },
  created (){
        const _this=this
        _this.stuinfo = JSON.parse(_this.$route.query.stuinfo);
        axios.get('http://localhost:8181/grade/find/'+_this.stuinfo.username).then(function(resp){
            _this.myclasslist=resp.data;
        })
      },
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
    overflow: hidden;
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
.subnav{
    margin-top: 20px;
    height: 50px;
    overflow: hidden;
    background: #3582d6;
}
.right .subnav ul{
    list-style-type: none;
    font-size: 18px;
}
.right .subnav ul li{
    display: inline-block;
    margin-left: 225px;
}
.right .subnav ul li:nth-child(2){
    padding-left: 275px;
    border-left: 2px solid white;
}
.right .subnav ul li a{
    text-decoration: none;
    color: white;
    font-weight: bold;
}
.right .subnav ul li a:hover{
     color: yellow;
 }
.right .subnav ul li .selected{
    color: yellow;
}

.right .myselection .el-table{
    /* border="1" width="1180px" cellspacing="0" cellpadding="10" align="left" */
    margin-top: 25px;
    border: 3px solid #3582d6;
    width: 1150px;
    align-content: left;
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
