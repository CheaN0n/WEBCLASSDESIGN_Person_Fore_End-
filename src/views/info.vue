<template>
<body>
    <section class="container">
    <section class="left">
        <div class="title"><img src="../assets/logo.jpg">学生信息管理系统</div>
        <nav class="leftsider">
            <ul>
                <li><a href='#' @click="tohomepage" >首页</a></li>
                <li><a href='#' @click="toinfo" class="selected">基本信息</a></li>
                <li><a href='#' @click="toselectclass">学生选课</a></li>
                <li><a href='#' @click="togradecheck">成绩查看</a></li>
                <li><a href="#">社会成果</a></li>
                <li><a href="#">网站支持</a></li>
            </ul>
        </nav>
    </section>
    <section class="right">
        <section class="upcontent">
            <div class="wel">欢迎用户 <a href="#" @click="toinfo">{{this.username}}</a></div>
            <a href="#changePassword" class="changekey" >密码修改<div class="iconfont icon-3denglumima"></div> </a>
            <a href="/" class="exit">退出<div class="iconfont icon-Enter-2"></div></a>
        </section>
        <section class="info-show">
        <section class="head-sculpture">
                <img src="../assets/head.jpg" title="学生照片" alt="照片">
                <input type="file" >
        </section>
        <section class="maininfo">
            <h4>基本信息</h4>
            <ul>
                <li>姓名:{{studetailinfo.name}}</li>
                <li>学号:{{studetailinfo.username}}</li>
                <li>学院:{{studetailinfo.academy}}</li>
                <li>年级:{{studetailinfo.grade}}</li>
            </ul>
        </section>
        <section class="otherinfo">
            <h4>其他信息</h4>
            <el-form :model="studetailinfo" :rules="rules" ref="studetailinfo"  label-width="120px">
                <el-form-item label="性别：" prop="sex">
                    <el-radio-group v-model="studetailinfo.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日：" prop="birthday">
                    <el-date-picker type="date" placeholder="选择日期" v-model="studetailinfo.birthday" style="width: 200px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="电话号码：" prop="tel">
                    <el-input v-model="studetailinfo.tel" style="width:280px"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱：" prop="email">
                    <el-input v-model="studetailinfo.email" style="width:280px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('studetailinfo')">提交修改</el-button>
                </el-form-item>
            </el-form>
        </section>
    </section>
    <section class="changepassword" id="changePassword">
        <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h4>密码修改</h4>
        <el-form-item label="旧密码：" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入旧密码" autocomplete="off" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入新密码" autocomplete="off" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="checkNewPassword">
            <el-input type="password" v-model="ruleForm.checkNewPassword" placeholder="请再次确认新密码" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
        </el-form>
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
  import JSEncrypt from 'jsencrypt/bin/jsencrypt';
  import JSDecrypt from 'jsencrypt/bin/jsencrypt';
export default {
    name: 'stuinfo',
  data () {

        var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
        return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
        if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
        } else {
            if (phoneReg.test(value)) {
            callback()
            } else {
            callback(new Error('电话号码格式不正确'))
            }
        }
        }, 100)
        };
        var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
        return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
        if (mailReg.test(value)) {
            callback()
        } else {
            callback(new Error('请输入正确的邮箱格式'))
        }
        }, 100)
        };
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else if (value !== this.studetailinfo.password) {
          callback(new Error('旧密码错误'));
        } else {
          callback();
        }
        };
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        }else {
          callback();
        }
        };
        var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
        };
    return {
        username:'',
        studetailinfo: {
            username:'',
            name:'',
            password:'',
            academy:'',
            grade:'',
            sex:'',
            birthday:'',
            tel:'',
            email:'',
        },
        ruleForm:{
          password:'',
          newPassword:'',
          checkNewPassword:''
        },
        rules: {
          tel: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur'  }
          ],
          newPassword: [
            { validator: validatePass2, trigger: 'blur'   }
          ],
          checkNewPassword:[
            { validator: validatePass3, trigger: 'blur' }
          ],

        },
    }
  },
  created (){
      const _this = this;
    let decryptor = new JSDecrypt();
    let privateKey="MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKhPhqrgQwMT9TAXjFoRvJNj9xKGKb4SXHamkyEA7T0IdNX2tYhu2h51dZp4wtKUd+DEXk78dh+u+xFbr+iNVS0Qz5jAG7UtmUoHxL2WQlf1J+6xgwyuHUkIndfxsKIW8dScVGG3G2BRn+2SL0CTBuqAVB11Kp4c+Bym1TQQ21GbAgMBAAECgYBDvk6LtFwEfyHuy2uYTQ9Dm7a0Y/+lGyrQLteFLyRNrnuoKvaCBWwRWmGNXRG9RDjD5QW4cPDya7FuGSNCTLB9HevKC7HT60VJfvyROwM5SXmdde2T+uzHZZLLEnwcIg3m4aC+rKshV64XemtadZQ4/mJsXCiXy+M8/IvviaJisQJBANKe4FBUA/TcqwVLYRkbT6keVDoCgc+Hin3VIGWAxjE76eMf4Hq8MV7m7FKwj4ChLXTU/qSShyeKLZY0qob8UJ8CQQDMkvmLDW/Ck2L4tc1h1okna9kqeQMhMW4BknWeUu1TdH7no0GJm0bpaUuzRKWcYJbXBGv72Zlo0AEyMpj5STGFAkEAz8rhAT8yPBStQWbx38Q7Hl2GuUiZ6zYM40IuWRXn8tDqWiKr5Erg5oEq7BW3Li9V2mr84z6QyuifOw6wosYxfwJBAKjeAeOIueJx61bGK71BbIIAAomOzsiNlvLxROnmJkWnekIXfzfp10VBR925IsPM73aaDdEdNAdS/EnFfoT4qEkCQQCAd7IKiLP8AyTHv+MsvJ3F+OQG6sFuXz+KUz+VU1OPvpUMeXvlILO0svI8JJxpnH+nhpK84j4VlCgY2MDw9cq3";
    decryptor.setPrivateKey(privateKey);
        _this.username = JSON.parse(_this.$route.query.username)
        axios.get ('http://localhost:8181/stuuser/details/'+_this.username).then(function(resp){
             _this.studetailinfo=resp.data
             _this.studetailinfo.password = decryptor.decrypt(_this.studetailinfo.password)
             console.log(resp.data)
        })
        // console.log(_this.studetailinfo);
  },
  methods:{
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
      onSubmit(formName){

          const _this = this;
          this.$refs[formName].validate((valid) => {
          if (valid) {
          axios.post('http://localhost:8181/stuuser/save',this.studetailinfo).then(function(resp2){
                if(resp2.data == 'success' ){
                    _this.$message({
                      message: '个人资料更新成功',
                      type: 'success'
                    });
                }
            })
        }
        })
    },
    submitForm(formName){
      let encryptor = new JSEncrypt();
      let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoT4aq4EMDE/UwF4xaEbyTY/cShim+Elx2ppMhAO09CHTV9rWIbtoedXWaeMLSlHfgxF5O/HYfrvsRW6/ojVUtEM+YwBu1LZlKB8S9lkJX9SfusYMMrh1JCJ3X8bCiFvHUnFRhtxtgUZ/tki9AkwbqgFQddSqeHPgcptU0ENtRmwIDAQAB';
      encryptor.setPublicKey(publicKey);
        const _this = this;
          this.$refs[formName].validate((valid) => {
          if (valid) {
              this.studetailinfo.password = encryptor.encrypt(this.ruleForm.newPassword);
              axios.post('http://localhost:8181/stuuser/save',this.studetailinfo).then(function(resp3){
                if(resp3.data == 'success' ){
                    _this.$message({
                      message: '密码修改成功！请重新登录',
                      type: 'success'
                    });
                    setTimeout(() =>{
                        _this.$router.push('/')
                    },3000);

                }
            })
        }
        })
        }
}
}
</script>
<style>
.container{
    overflow: hidden;
    background: rgba(204, 204, 204, 0.31);
}
img{
    width: 35%;
    height: 100%;
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
    border: 1px solid #ccc;
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

.info-show{

    /* box-shadow: 1px 1px gray; */
    overflow: hidden;
}
.head-sculpture{
    float: left;
    height: 240px;
    width: 180px;
    margin-top: 50px;
    text-align: center;
    margin-left: 10%;
    border: 1px solid #000000;
    position: relative;
}
.head-sculpture img{
    width: 100%;
    height: 100%;
}
.head-sculpture input{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
}

.maininfo{
    width: 50%;
    height: 240px;
    border: 1px solid rgba(128, 128, 128, 0.34);
    float: right;
    margin-right: 20%;
    margin-top: 50px;
    padding: 10px 0 0 20px; /*上 右 下 左*/
    box-shadow: 2px 2px rgba(128, 128, 128, 0.18);
}
.maininfo h4{
    padding-left: 40px;
    font-size: 18px;
}
.maininfo ul{
    line-height: 2em;
}
.otherinfo{
    width: 70%;
    border: 1px solid #000000;
    margin-top: 25%;
    margin-left: 10%;
    margin-bottom: 5%;
    display: block;
}
.otherinfo h4{
    font-weight: normal;
    padding-left: 40px;
    font-size: 18px;
}
.otherinfo ul{
    line-height: 3em;
    list-style-type: none;
}
.changepassword{
    width: 70%;
    height: 300px;
    border: 1px solid #000000;
    padding-bottom: 5%;
    margin-left: 10%;
    margin-bottom: 5%;
}
.changepassword h4{
    font-weight: normal;
    padding-left: 20px;
    font-size: 18px;
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
