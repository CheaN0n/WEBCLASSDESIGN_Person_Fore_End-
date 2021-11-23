<template>
<body>
  <section class="upcontent"><div class="title"><img src="../assets/logo2.jpg">教师管理系统</div><a href="tealogin" class="exit">退出</a></section>
  
  <el-container style=" border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" :default-active= "'1-1'">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-custom"></i>教师端管理</template>
          <el-menu-item index="1-1">课程录入</el-menu-item>
        <el-submenu index="1-2">
          <template slot="title" >成绩录入/班级花名册</template>
          <el-menu-item v-for="item in classlist" v-bind:key="item.index" @click="toentergrade">{{item.name}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
      <div class="addmenu" v-show="isshowaddmenu">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="课序号" prop="coursenumber">
            <el-input v-model="ruleForm.coursenumber" style="width: 20%;"></el-input>
          </el-form-item>
          <el-form-item label="课程名" prop="name">
            <el-input v-model="ruleForm.name" style="width: 30%;"></el-input>
          </el-form-item>
          <el-form-item label="截止日期" prop="ddl">
            <el-input v-model="ruleForm.ddl"></el-input>
          </el-form-item>
          <el-form-item label="学分" prop="point">
            <el-input v-model="ruleForm.point" style="width: 15%;"></el-input>
          </el-form-item>
          <el-form-item label="任课教师" prop="teacher">
            <el-input v-model="ruleForm.teacher" style="width: 25%;"></el-input>
          </el-form-item>
          <el-form-item label="上课时间&地点" prop="timeandplace" style="width: 80%;">
            <el-input v-model="ruleForm.timeandplace"></el-input>
          </el-form-item>
          <el-form-item label="备注/课程说明" prop="tips">
            <el-input v-model="ruleForm.tips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即录入</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="back">返回</el-button>
            <h3>输入上课时间地点样例:08:00-09:50/周一/5-107</h3>
          </el-form-item>
        </el-form>
      </div>
      <div class="editmenu" v-show="isshoweditmenu">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm2">
          <el-form-item label="课序号" prop="coursenumber">
            <el-input readOnly v-model="ruleForm2.coursenumber" style="width: 20%;"></el-input>
          </el-form-item>
          <el-form-item label="课程名" prop="name">
            <el-input v-model="ruleForm2.name" style="width: 30%;"></el-input>
          </el-form-item>
          <el-form-item label="截止日期" prop="ddl">
            <el-input v-model="ruleForm2.ddl"></el-input>
          </el-form-item>
          <el-form-item label="学分" prop="point">
            <el-input v-model="ruleForm2.point" style="width: 15%;"></el-input>
          </el-form-item>
          <el-form-item label="任课教师" prop="teacher">
            <el-input v-model="ruleForm2.teacher" style="width: 25%;"></el-input>
          </el-form-item>
          <el-form-item label="上课时间&地点" prop="timeandplace" style="width: 80%;">
            <el-input v-model="ruleForm2.timeandplace"></el-input>
          </el-form-item>
          <el-form-item label="备注/课程说明" prop="tips">
            <el-input v-model="ruleForm2.tips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm2('ruleForm2')">修改</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            <el-button @click="back">返回</el-button>
            <h3>输入上课时间地点样例:8:00-9:50/周一/5-107</h3>
          </el-form-item>
        </el-form>
      </div>
    <el-header style="text-align: right; font-size: 12px">
      <el-button type="text" @click="showaddmenu" >录入新课程</el-button>
    </el-header>
    <el-main>
      <el-table :data="classlist">
        <el-table-column prop="coursenumber" label="课序号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="课程名称" width="140">
        </el-table-column>
        <el-table-column prop="ddl" label="选课截止日期" width="140">
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
            <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="deleteclass(scope.row)" type="text" size="small">删除</el-button>
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
    background-color: #d7e0eb;
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
  .addmenu{
    margin-top: 50px;
  }
  .addmenu h3{
    color: red;
  }
  .editmenu{
    margin-top: 50px;
  }
  .editmenu h3{
    color: red;
  }

</style>

<script>
 var isNum = (rule, value, callback) => {//包含小数的数字
            let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
            if (value === '') {
                callback(new Error('请输入内容'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
  export default {

    data() {
      return{
      isshowaddmenu:false,
      isshoweditmenu:false,
      teainfo: {
          username:'',
          password:'',
      },
      ruleForm: {
          coursenumber: '',
          name: '', 
          ddl:'', 
          point: '',
          teacher: '',
          timeandplace: '',
          tips: '',
        },
        ruleForm2: {
          coursenumber: '',
          name: '',  
          ddl:'',
          point: '',
          teacher: '',
          timeandplace: '',
          tips: '',
        },
        rules: {
          coursenumber: [
            { required: true, message: '请输入课序号', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入课程名', trigger: 'change' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          ddl: [
            {required: true, message: '请输入截止日期', trigger: 'change' }
          ],
          point: [
            {required: true, message: '请输入学分数', trigger: 'change' },
            { validator: isNum, trigger: 'change' }
          ],
          teacher: [
            {required: true, message: '请输入任课教师', trigger: 'change' }
          ],
          timeandplace: [
            {required: true, message: '请输入上课时间和地点', trigger: 'change' }
          ],
          tips: [
            { required: false, message: '请选择活动资源', trigger: 'change' }
          ],
        },
      classlist: [
      ]
      }
    },
    created(){
      const _this=this
      _this.teainfo = JSON.parse(_this.$route.query.ruleForm) 
        axios.get ('http://localhost:8181/classlist/findAll').then(function(resp){
            _this.classlist=resp.data
        })
    },
    methods: {
      toentergrade:function(){
         this.$router.push({
           path:'/entergrade',
           query: {
             teainfo:JSON.stringify(this.teainfo)
           }
         });
      },
      back(){
        this.isshowaddmenu = false;
        this.isshoweditmenu = false;
      },
      showaddmenu:function(){
         this.isshowaddmenu=!this.isshowaddmenu;
         this.isshoweditmenu = false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        const _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8181/classlist/save',this.ruleForm).then(function(resp2){
                if(resp2.data == 'success' ){
                    _this.$message({
                      message: '课程录入成功',
                      type: 'success'
                    });
                }
                _this.$router.go(0);
            })
          } else {
            _this.$message.error('课程录入失败，请检查格式');
            return false;
          }
        });
      },
      submitForm2(formName) {
        const _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put('http://localhost:8181/classlist/update',this.ruleForm2).then(function(resp3){
                if(resp3.data == 'success' ){
                    _this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                }
                _this.$router.go(0);
            })
          } else {
            _this.$message.error('修改失败，请检查格式');
            return false;
          }
        });
      },
      deleteclass(row){
          const _this = this;
          axios.delete('http://localhost:8181/classlist/deleteById/'+row.coursenumber).then(function(resp4){
              _this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
              _this.$router.go(0);
           })
      },
      edit(row) {
         const _this = this;
         _this.isshoweditmenu=true;
         this.isshowaddmenu = false;
         axios.get('http://localhost:8181/classlist/findById/'+row.coursenumber).then(function(resp5){
           _this.ruleForm2=resp5.data;
         })
      }
    }
  };
</script>