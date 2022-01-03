 <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="ordernum"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productname"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品单价"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productnum"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="用户编号">
      </el-table-column>
      <el-table-column
        prop="type"
        label="订单状态">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="UpdateType(scope.row)" type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    import { getOrders } from '@/api/product'
    import { dealOrder } from '@/api/product'
    export default {
      data() {
        return {
          tableData: [{
            id:'',
            ordernum:'',
            productname:'',
            price:'',
            productnum:'',
            userid:''
          }]
        }
      },
      mounted() {
        this.getOrderList()
      },
      methods: {
        async getOrderList() {
          let result = await getOrders()
          if (result.data.code === 600) {
            this.tableData = result.data.data.map(item => {
              return {
                id: item.product_id,
                ordernum: item.order_id,
                productname: item.product_name,
                price: item.price,
                productnum: item.ocount,
                userid: item.user_id,
                type: item.type,                
              }
            })
          } else {
            console.log('获取失败')
          }
        },
        UpdateType(row) {
          this.$confirm('是否确定处理这个订单？', '提示', {
            confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await dealOrder(row.id)
          if (result.data.code === 600){
              this.$message({
              type:'success',
              message: '修改成功！'
            })
          }else {
            console.log('修改失败！')
            this.$message({
              type: 'error',
              message: result.data.msg
            })
          }
        })
      },
    }
    }
  </script>