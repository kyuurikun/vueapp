 <template>
     <el-form title="商品信息" >
          <el-form :model="form">
            <el-form-item label="商品名称" >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片链接" >
              <el-input v-model="form.img" autocomplet="off"></el-input>
            </el-form-item>
            <el-form-item label="商品单价" >
              <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="商品描述" >
              <el-input v-model="form.detail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="剩余库存" >
              <el-input v-model="form.num" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" >
             <el-select v-model="form.value" placeholder="请选择">
             <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
             </el-option>
          </el-select>
            </el-form-item>
          </el-form>
          <div  class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addproduct">确 定</el-button>
          </div>
     </el-form>
  </template>
  


  <script>
    import { addProduct } from '@/api/product'
    export default {
      data() {
        return {
          dialogFormVisible: false,
          form: {
            name: '',
            img:'',
            price: '',
            detail: '',
            num: '',
          },
          formLabelWidth: '120px',
          options: [{
            value: '1',
            label: '婴幼儿洗漱类'
          }, {
            value: '2',
            label: '婴幼儿一次性用品类'
          }, {
            value: '3',
            label: '婴幼儿电器类'
          }, {
            value: '4',
            label: '婴幼儿服饰类'
          }, {
            value: '5',
            label: '婴幼儿食品类'
          }],
          }
      },
      mounted() {
      },
      methods: {
      async addproduct(){
        let result = await addProduct(this.form)
        if (result.data.code === 600) {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          } else {
            console.log('获取失败')
            this.$message({
              type: 'error',
              message: result.data.msg
            })
          }
       }
    }
    }
  </script>