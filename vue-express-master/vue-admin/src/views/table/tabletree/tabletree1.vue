 <template>
    <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column
        prop="id"
        label="商品编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="商品图片"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品单价"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="商品描述">
      </el-table-column>
      <el-table-column
        prop="num"
        label="剩余库存">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="delItem(scope.row)" type="primary" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    import { getProduct } from '@/api/product'
    import { delProduct } from '@/api/product'
    export default {
      data() {
        return {
          tableData: [{
            id: '1111',
            name: '商品114',
            price: '514',
            url: 'abc.png',
            description: '描述a',
            num: '1919'
          }]
        }
      },
      mounted() {
        this.getProductList()
        // this.delItem()
      },
      methods: {
        async getProductList() {
          let result = await getProduct()
          if (result.data.code === 600) {
            this.tableData = result.data.data.map(item => {
              return {
                id: item.product_id,
                name: item.product_name,
                price: item.product_price,
                url: item.product_img_url,
                description: item.product_detail,
                num: item.product_num                
              }
            })
          } else {
            console.log('获取失败')
          }
        },
        delItem(row) {
          this.$confirm('是否确定删除这条记录？', '提示', {
            confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await delProduct(row.id)
          if (result.data.code === 600){
              this.$message({
              type:'success',
              message: '删除成功！'
            })
          }else {
            console.log('删除失败！')
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