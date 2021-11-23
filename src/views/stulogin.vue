<template>
<div class="body">
    <h1>学生管理系统学生端登录</h1>
    <div class="main-agile">
    <a href="tealogin" class="changebut"><img src="../assets/teacher.jpg"  ></a>
    <div class="content">
        <div class="loginbox" v-show="showlogin">
            <h2>学生登录</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="username">
                    <div class="inputarea">
                    <el-input v-model="ruleForm.username" placeholder="学号/用户名" style="width: 80%;"></el-input>
                    <i class="iconfont icon-denglu"></i>
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <div class="inputarea">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码" style="width: 80%;"></el-input>
                    <i class="iconfont icon-3denglumima"></i> 
                    </div>
                </el-form-item>
                <a href="#" @click="torigrister" class="goregister">注册账号</a>
                <el-form-item>
                    <el-button class="loginbt" type="primary" @click="login('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="registerbox" v-show="showregister">
            <h2>学生注册</h2>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
                <el-form-item prop="name">
                    <div class="inputarea">
                    <el-input v-model="ruleForm2.name" placeholder="姓名" style="width: 80%;"></el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="username">
                    <div class="inputarea">
                    <el-input v-model="ruleForm2.username" placeholder="学号/用户名" style="width: 80%;"></el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <div class="inputarea">
                    <el-input type="password" v-model="ruleForm2.password" placeholder="密码" style="width: 80%;"></el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <div class="inputarea">
                    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="确认密码" autocomplete="off" style="width: 80%;"></el-input>
                    </div>
                 </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register('ruleForm2')">注册</el-button>
                    <el-button type="primary" @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    </div>
    <div class="footerimg">
        <p class="agileinfo"> &copy; 2021 Class Design For Web | Design by 刘荣龙 202000300113</p>
    </div>
</div>
</template>
<script>
export default {
  name: 'stulogin',
  data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        showlogin:true,
        showregister:false,
        ruleForm: {
            username:'',
            password:'',
            },
        ruleForm2: {
            name:'',
            username:'',
            password:'',
            checkPass:'',
            },
        ruleForm3:{
            name:'',
            username:'',
            password:'',
            grade:'',
            academy:''
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'change' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'change' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        },
        rules2: {
        name: [
            { required: true, message: '请输入姓名', trigger: 'change' }  
        ],
        username: [
            { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        pass: [
            { validator: validatePass, trigger: 'change' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'change' }
          ]
        },
        
        
    }
  },
  methods: {
      login(formName){
         const _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
              axios.get('http://localhost:8181/stuuser/login/'+_this.ruleForm.username).then(function(resp){
                //   console.log(resp)
                  if(resp.data == _this.ruleForm.password)
                  {
                      _this.$router.push({
                          path: '/stuhomepage',
                          query:{
                              ruleForm:JSON.stringify(_this.ruleForm)
                          }
                      });
                  }
                  else if(resp.data=='error'){
                      _this.$message.error('账户不存在');
                  }
                  else{
                      _this.$message.error('学号或密码错误');
                  }
              })
            }
      })
      },
      register(formName){
         const _this=this;
        this.$refs[formName].validate((valid) => {
          _this.ruleForm3.name = _this.ruleForm2.name;
          _this.ruleForm3.username = _this.ruleForm2.username;
          _this.ruleForm3.password = _this.ruleForm2.password;
          _this.ruleForm3.grade = '2020';
          _this.ruleForm3.academy = '软件学院';
          if (valid) {
              axios.post('http://localhost:8181/stuuser/save/',_this.ruleForm3).then(function(resp2){
                  if(resp2.data == 'success' ){
                    _this.$message({
                      message: '注册成功',
                      type: 'success'
                    });
                }
                _this.showlogin = true;
                _this.showregister = false;
            })
            }else {
            _this.$message.error('注册失败');
            return false;
          }
      })
      },
      torigrister:function() {
        this.showlogin = false;
        this.showregister = true;
      },
      back:function() {
          this.showlogin = true;
          this.showregister = false;
      }
      }
    
}
</script>
<style>
        .main-agile{
            background: linear-gradient(-135deg,transparent 60px, rgba(41, 101, 167, 0.75) 0);
        }
        .body{
            background: linear-gradient(to right bottom, #7ef9ff, #3582d6, #3582d6,#7ef9ff);
            /*background: linear-gradient(to right bottom, #fff27e, #b02a36, #b02a36, #fff27e);*/
            /*background: linear-gradient(to right bottom, #ffee7e, #ac2626, #ac2626,#ffee7e);*/
            /* background: #cd1f46; */
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
            font-family: 'Montserrat', sans-serif;
            width: 100%;
            height: 950px;
            margin-top: -90px;
            padding-top: 90px;
        }
        html,body,div,span,h2,ul,form
        {
            margin:0;
            padding:0;
            border:0;
            font-size:100%;
            font:inherit;
            vertical-align:baseline;
        }
        h1 {
            font-size: 40px;
            text-align: center;
            margin: 2.3em 0 1.5em;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: #fff;
        }
        .main-agile {
            width: 32%;
            margin: 0px auto 0px auto;
            background: rgba(0, 0, 0, 0.22);
            padding: 12px;
            position: relative;
            background-size: 50% 100%;
            background-repeat: no-repeat;
            -webkit-box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.12);
            -moz-box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.12);
            box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.12);
        }
        .goregister{
            margin-left: 55%;
            color: white;
        }
        .changebut{
            width: 85px;
            height: 85px;
            float: right;
            margin-right: -15px;
            margin-top: -15px;
            cursor: pointer;
        }
        .content {
            padding: 50px 50px;
            text-align: center;
            position: relative;
        }
        h2 {
            color: #fff;
            font-size: 28px;
            letter-spacing: 2px;
            text-align: center;
            font-weight: 500;
            margin-bottom: 1.3em;
            text-transform: uppercase;
        }
        .loginbt{
            font-weight: bold;
            width: 100%;
            border: none;
            margin: 3em 0 1.5em;
            outline: none;
            letter-spacing: 1px;
            font-size: 15px;
            padding: 14px 0;
            color: #fff;
            text-transform: uppercase;
            transition: .5s ease-in;
            -webkit-transition: .5s ease-in;
            -moz-transition: .5s ease-in;
            -o-transition: .5s ease-in;
            -ms-transition: .5s ease-in;
            cursor: pointer;
            background: #19b9cc;
        }
        .loginbt:hover{
            background: #00e5ff;
        }
        .inputarea i {
            position: absolute;
            left: 38px;
            font-size: 25px;
            color: rgba(0, 0, 0, 0.493);
        }
        .inputarea {
            position: relative;
        }
        .el-input__inner{
            padding-left: 28px;
        }
        .footerimg p{
            margin:0 auto;
            text-align:center;
            font-size:14px;
            color:#eee;
            letter-spacing:1px;
            line-height:27px;
        }
        .footerimg p a{
            color:#fff;
        }
        .footerimg p a:hover{
            text-decoration:underline;
        }
        .footerimg {
            margin: 65px 0px;
        }
</style>
