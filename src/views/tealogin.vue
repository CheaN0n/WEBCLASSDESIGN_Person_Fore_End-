<template>
<div class="body">
    <h1>学生管理系统教师端登录</h1>
    <div class="main-agile">
    <router-link to="/"><a class="changebut"><img src="../assets/student.jpg"  ></a></router-link>
    <div class="content">
        <div class="loginbox" v-show="showlogin">
        <h2>教师登录</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="username">
                    <div class="inputarea">
                    <el-input v-model="ruleForm.username" placeholder="教工号/用户名" style="width: 80%;"></el-input>
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
                    <el-button class="loginbt"  @click="login('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="registerbox" v-show="showregister">
            <h2>教师注册</h2>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
                <el-form-item prop="username">
                    <div class="inputarea">
                    <el-input v-model="ruleForm2.username" placeholder="教工号/用户名" style="width: 80%;"></el-input>
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
                    <el-button type="danger"  @click="register('ruleForm2')">注册</el-button>
                    <el-button type="danger" @click="back">返回</el-button>
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
  import JSEncrypt from 'jsencrypt/bin/jsencrypt';
  import JSDecrypt from 'jsencrypt/bin/jsencrypt';
export default {
  name: 'tealogin',
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
          username:'',
          password:'',
          checkPass:'',
        },
      ruleForm3: {
          username:'',
          password:'',
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
        let decryptor = new JSDecrypt();
        let privateKey="MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKhPhqrgQwMT9TAXjFoRvJNj9xKGKb4SXHamkyEA7T0IdNX2tYhu2h51dZp4wtKUd+DEXk78dh+u+xFbr+iNVS0Qz5jAG7UtmUoHxL2WQlf1J+6xgwyuHUkIndfxsKIW8dScVGG3G2BRn+2SL0CTBuqAVB11Kp4c+Bym1TQQ21GbAgMBAAECgYBDvk6LtFwEfyHuy2uYTQ9Dm7a0Y/+lGyrQLteFLyRNrnuoKvaCBWwRWmGNXRG9RDjD5QW4cPDya7FuGSNCTLB9HevKC7HT60VJfvyROwM5SXmdde2T+uzHZZLLEnwcIg3m4aC+rKshV64XemtadZQ4/mJsXCiXy+M8/IvviaJisQJBANKe4FBUA/TcqwVLYRkbT6keVDoCgc+Hin3VIGWAxjE76eMf4Hq8MV7m7FKwj4ChLXTU/qSShyeKLZY0qob8UJ8CQQDMkvmLDW/Ck2L4tc1h1okna9kqeQMhMW4BknWeUu1TdH7no0GJm0bpaUuzRKWcYJbXBGv72Zlo0AEyMpj5STGFAkEAz8rhAT8yPBStQWbx38Q7Hl2GuUiZ6zYM40IuWRXn8tDqWiKr5Erg5oEq7BW3Li9V2mr84z6QyuifOw6wosYxfwJBAKjeAeOIueJx61bGK71BbIIAAomOzsiNlvLxROnmJkWnekIXfzfp10VBR925IsPM73aaDdEdNAdS/EnFfoT4qEkCQQCAd7IKiLP8AyTHv+MsvJ3F+OQG6sFuXz+KUz+VU1OPvpUMeXvlILO0svI8JJxpnH+nhpK84j4VlCgY2MDw9cq3";
        decryptor.setPrivateKey(privateKey);
        this.$refs[formName].validate((valid) => {
          if (valid) {
              axios.get('http://localhost:8181/teauser/login/'+_this.ruleForm.username).then(function(resp){
                  if(decryptor.decrypt(resp.data) == _this.ruleForm.password)
                  {
                      _this.$router.push({
                          path: '/enterclass',
                          query:{
                              username:JSON.stringify(_this.ruleForm.username)
                          }
                      });
                  }
                  else if(resp.data=='error'){
                      _this.$message.error('账户不存在');
                  }
                  else{
                      _this.$message.error('教工号或密码错误');
                  }
              })
            }
          else {
          }
      })
      },
       register(formName){
         const _this=this;
         let encryptor = new JSEncrypt();
         let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoT4aq4EMDE/UwF4xaEbyTY/cShim+Elx2ppMhAO09CHTV9rWIbtoedXWaeMLSlHfgxF5O/HYfrvsRW6/ojVUtEM+YwBu1LZlKB8S9lkJX9SfusYMMrh1JCJ3X8bCiFvHUnFRhtxtgUZ/tki9AkwbqgFQddSqeHPgcptU0ENtRmwIDAQAB';
         encryptor.setPublicKey(publicKey);
        this.$refs[formName].validate((valid) => {
          _this.ruleForm3.username = _this.ruleForm2.username;
          _this.ruleForm3.password = encryptor.encrypt(_this.ruleForm2.password);
          if (valid) {
              axios.post('http://localhost:8181/teauser/save/',_this.ruleForm3).then(function(resp2){
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
            background: linear-gradient(-135deg,transparent 60px, rgba(167, 60, 41, 0.3) 0);
        }
        .body{
            background: linear-gradient(to right bottom, #fff97e, rgba(190, 15, 66, 0.94), rgba(190, 15, 66, 0.94),#fff97e);
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
            background: #cc1919;
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
        }
        .loginbt:hover{
            background: #ffe600;
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
