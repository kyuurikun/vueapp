 <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="login_password"
        label="登录密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pay_password"
        label="支付密码">
      </el-table-column>
    </el-table>
  </template>

  <script>
    import { getUser } from '@/api/product'
    export default {
      data() {
        return {
          tableData: [{
            id:'',
            name:'',
            login_password:'',
            pay_password:''
          }]
        }
      },
      mounted() {
        this.getUserList()
      },
      methods: {
        async getUserList() {
          let result = await getUser()
          if (result.data.code === 600) {
            this.tableData = result.data.data.map(item => {
              return {
                id: item.user_id,
                name: item.user_name,
                login_password: item.login_password,
                pay_password: item.pay_password                
              }
            })
          } else {
            console.log('获取失败')
          }
        },
    }
    }
  </script>