<template>
  <div class="container">
    <div class="col-12">
      <h1>Endereço</h1> <span class="text-muted">- Wrapper node-viacep</span>
      <form class="form jumbotron" @submit="saveForm" method="post">
        <div class="row">
          <div class="col-3">
            <label for="cep">Cep</label>
            <input type="text" id="cep" name="cep" class="form-control"
              v-mask="'#####-###'"
              @keyup="findAddress"
              v-model="cep">
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="form-group">
              <label for="logradouro">logradouro</label>
              <input type="text" name="logradouro" id="logradouro" class="form-control"
              v-model="endereco.logradouro">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="numero">número</label>
              <input type="text" name="numero" id="numero" class="form-control"
              v-model="endereco.unidade">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-5">
            <div class="form-group">
              <label for="bairro">Bairro</label>
              <input type="text" name="bairro" id="bairro" class="form-control"
              v-model="endereco.bairro">
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label for="cidade">cidade</label>
              <input type="text" name="cidade" id="cidade" class="form-control"
              v-model="endereco.localidade">
            </div>
          </div>
          <div class="col-3">
            <div class="form-group">
              <label for="estado">estado</label>
              <input type="text" name="estado" id="estado" class="form-control"
              v-model="endereco.uf">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for="complemento">complemento</label>
              <input type="text" name="complemento" id="complemento" class="form-control"
              v-model="complementoComputado">
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-success">Salvar</button>
      </form>
    </div>
  </div>
</template>

<script>
import ViaCep from 'node-viacep'
import axios from 'axios'

const viacep = new ViaCep({ type: 'json' })

export default {
  name: 'Endereco',
  data () {
    return {
      cep: '',
      endereco: {}
    }
  },
  mounted () {
    if (this.$route.params.end) {
      axios
        .get(`http://localhost:3000/enderecos/${this.$route.params.end}`)
        .then(({ data }) => {
          this.endereco = data
          this.cep = data.cep
        })
    }
  },
  methods: {
    findAddress: function () {
      this.endereco = {}

      if (!/^[0-9]{5}-[0-9]{3}$/.test(this.cep)) return

      viacep.zipCod.getZip(this.cep)
        .then(data => data.json())
        .then(data => { this.endereco = data })
    },
    saveForm: function (e) {
      axios
        .post('http://localhost:3000/enderecos', this.endereco)
        .then(({ data }) => {
          this.$router.push({name: 'edit', params: { end: data.id }})
        })
        .catch(res => console.error(res))

      e.preventDefault()
    }
  },
  computed: {
    complementoComputado: function () {
      if (!this.endereco.cep) return

      const { complemento, gia, ibge } = this.endereco

      return `complemento: ${complemento} - gia: ${gia} - ibge: ${ibge}`
    }
  }
}
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap.scss';
</style>
