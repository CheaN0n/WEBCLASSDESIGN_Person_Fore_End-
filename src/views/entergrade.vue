<template>
<body>
  <section class="upcontent"><div class="title"><img src="../assets/logo2.jpg">教师管理系统</div><a href="tealogin" class="exit">退出</a></section>
  <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1','1-2']" default-active="['1-2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-custom"></i>教师端管理</template>
          <el-menu-item index="1-1" @click="toenterclass">课程录入</el-menu-item>
        <el-submenu index="1-2">
          <template slot="title">成绩录入/班级花名册</template>
          <el-menu-item v-for="item in classlist" v-bind:key="item.index" @click="getitemstulist(item)">{{item.name}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <div class="entergrademenu" v-show="isshowgrade">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="成绩" prop="classgrade">
            <el-input v-model="ruleForm.classgrade" style="width: 20%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即录入/修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
    </div>
     <el-header style="text-align: right; font-size: 12px">
    </el-header>
    <el-main>
      <el-table :data="stuuser">
        <el-table-column prop="username" label="学号" >
        </el-table-column>
        <el-table-column prop="stuname" label="姓名">
        </el-table-column>
        <el-table-column prop="classgrade" label="学生成绩">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="grade(scope.row)" type="text" size="small">录入/修改成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</body>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .left .title{
    font-size: 16px;
    text-align: left;
    background: rgb(186,39,66);
    color: white;
    height: 60px;
    display: block;
  }
  .upcontent{
    background: rgb(186,39,66);
    color: white;
    width: 100%;
    height: 80px;
    display: block;
    padding-top: 20px;
    overflow: hidden;
  }
   .exit{
    float: right;
    color: white;
    margin-right: 50px;
    text-decoration: none;
  }
  .exit:hover{
    color: yellow;
  }
  .el-container{
    overflow: hidden;
  }
  .entergrademenu{
    margin-top: 50px;
  }
</style>

<script>
const isNum = (rule, value, callback) => {
      const age= /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('成绩必须为数字'))
      }else{
        callback()
      }
    }
  export default {
    data() {
      return{
      teainfo: {
          username:'',
          password:'',
      },
      ruleForm:{
        id:'',
        username:'',
        stuname:'',
        coursenumber:'',
        name:'',
        point:'',
        teacher:'',
        timeandplace:'',
        tips:'',
        classgrade:''
      },
      rules:{
        classgrade: [
            {required: true, message: '请输入成绩', trigger: 'change' },
            { validator: isNum, trigger: 'change' }
          ],
      },
      isshowgrade:false,
      classlist: [
      ],
      stuuser:[]
      }
    },
    created () {
      const _this=this
      _this.teainfo = JSON.parse(_this.$route.query.teainfo)
        axios.get ('http://localhost:8181/classlist/findAll').then(function(resp2){
            _this.classlist=resp2.data
        })

      },
    methods: {
      toenterclass: function(){
        this.$router.push({
          path: '/enterclass',
          query: {
            ruleForm:JSON.stringify(this.teainfo)
          }
        });
      },
      getitemstulist(item){
        // console.log(item.name);
        const _this=this;
        axios.get('http://localhost:8181/grade/getlist/'+item.name).then(function(resp3){
            _this.stuuser=resp3.data;
            // console.log(_this.stuuser);
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      grade(row){
        // console.log(row.id);
        this.isshowgrade = !this.isshowgrade;
        // console.log(row);
        this.ruleForm.username = row.username;
        this.ruleForm.stuname = row.stuname;
        this.ruleForm.coursenumber = row.coursenumber;
        this.ruleForm.name = row.name;
        this.ruleForm.point = row.point;
        this.ruleForm.teacher = row.teacher;
        this.ruleForm.timeandplace = row.timeandplace;
        this.ruleForm.tips = row.tips;
        this.ruleForm.id = row.id;
      },
      back(){
        this.isshowgrade = false;
      },
      submitForm(formName){
        console.log(formName.id)
        const _this = this
         this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8181/grade/savegrade',this.ruleForm).then(function(resp4){
                if(resp4.data == 'success' ){
                    _this.$message({
                      message: '录入成绩成功',
                      type: 'success'
                    });
                }
                _this.isshowgrade = false;
                _this.ruleForm.classgrade = '';
            })
          } else {
            _this.$message.error('成绩录入失败');
            return false;
          }
        });
      }
    }
  };
</script>