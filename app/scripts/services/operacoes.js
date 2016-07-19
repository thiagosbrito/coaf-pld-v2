'use strict';
angular.module('wbaApp')
  .factory('apiOperacoes', ['$http', 'baseUrl', function ($http, baseUrl) {

    var api = {};

    // CARTEIRAS
    var _getCarteiras = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getCarteiraById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _saveCarteira = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _addTarifaToCarteira = function (idCarteira, idTarifa, valor) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras/' + idCarteira + '/tarifas/' + idTarifa,
        method: 'POST',
        data: valor,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _updateCarteira = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _deleteCarteira = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras',
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _getTarifasByCarteira = function (idCarteira) {
      return $http({
        url: baseUrl.apiOperacoes + '/carteiras/' + idCarteira + '/tarifas',
        method: 'GET'
      }).then(
        function (res) {
          return res
        }
      )
    };

    // OPERACOES
    var _getOperacoes = function (filtro) {

      // function EncodeQueryData(data) {
      //    var ret = [];
      //    for (var d in data)
      //       ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
      //    return ret.join("&");
      // };

      var url = baseUrl.apiOperacoes + '/operacoes?dataInicial=' + filtro.dataInicial + 
                '&dataFinal=' + filtro.dataFinal + 
                '&pagina=' + filtro.page + 
                '&quantidadeElementos=' + filtro.qtd;
      if (filtro.uuidCedente) {
        url = baseUrl.apiOperacoes + '/operacoes?uuidCedente='+ filtro.uuidCedente + 
              '&dataInicial=' + filtro.dataInicial + 
              '&dataFinal=' + filtro.dataFinal + 
              '&pagina=' + filtro.page + 
              '&quantidadeElementos=' + filtro.qtd;
      }
      if (filtro.page == undefined && filtro.qtd == undefined) {
        if(filtro.uuidCedente) {
          url = baseUrl.apiOperacoes + '/operacoes?uuidCedente='+ filtro.uuidCedente + 
              '&dataInicial=' + filtro.dataInicial + 
              '&dataFinal=' + filtro.dataFinal   
        }
        else {
          url = baseUrl.apiOperacoes + '/operacoes?dataInicial=' + filtro.dataInicial + 
                '&dataFinal=' + filtro.dataFinal;
        }
      }
      return $http({
        url: url,
        method: 'GET'
      }).then(
      function (results) {
        return results;
      });
    };
    var _getOperacaoById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _saveOperacao = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _updateOperacao = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _addRecebivel = function (id , data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/recebivel',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _updateRecebivel = function (id, data) {
      return $http({
        url: baseUrl.apiOperacoes + '/recebiveis/' + id,
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _addTarifaToOperacao = function (idOperacao, idTarifa, tarifa) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + idOperacao + '/tarifas/' + idTarifa,
        method: 'POST',
        data: tarifa,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _deleteTarifaToOperacao = function (idOperacao, idTarifa) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + idOperacao + '/tarifas/' + idTarifa,
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _getWorkflows = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/workflows',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getWorkflowById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/workflows/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };

    var _getWorkflowImage = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/workflows/' + id + '/imagem',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    }

    var _getTarifas = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas',
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _getTarifaById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas/' + id,
        method: 'GET'
      }).then(function (results) {
        return results;
      });
    };
    var _saveTarifa = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _updateTarifa = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas/' + data.uuid,
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };
    var _deleteTarifa = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tarifas/' + data.uuid,
        method: 'DELETE',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(function (results) {
        return results;
      });
    };

    var _liberarOperacao = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + data.uuidOperacao + '/iniciar?uuidWorkflowDeployment=' + data.uuidWorkflow,
        method: 'PUT'
      }).then(
        function (results) {
          return results;
        }
      )
    };

    var _getRecebiveisByOperacao = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/recebiveis',
        method: 'GET'
      }).then(
        function (results) {
          return results;
        }
      )
    };


    var _getTarifasByOperacao     = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/tarifas',
        metho: 'GET'
      }).then(
        function (res) {
          return res
        }
      )
    };
    var _calcularLancamentos = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/calcular',
        method: 'PUT'
      }).then(
        function (res) {
          return res
        }
      )
    };
    var _getLancamentosByOperacao = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/lancamentos',
        metho: 'GET'
      }).then(
        function (res) {
          return res
        }
      )
    };


    var _getTipoLancamentos = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/tipolancamento',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _getTipoLancamentoById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/tipolancamento/' + id,
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _addTipoLancamento = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tipolancamento',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _updateTipoLancamento = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tipolancamento',
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results
        }
      )
    };
    var _deleteTipoLancamento = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/tipolancamento/' + data.uuid,
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results
        }
      )
    };

    var _enviarRecebiveis = function (data) {
      return $http({
        url: baseUrl.apiOperacoes + '/recebiveis/enviar-confirmacao',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type':'application/json'
        }
      }).then(
        function (results) {
          return results
        }
      )
    };

    var _getRecebivelById = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/recebiveis/' + id,
        method: 'GET'
      }).then(
        function (result) {
          return result
        }
      )
    };


    var _getRecebiveis = function () {
      return $http({
        url: baseUrl.apiOperacoes + '/recebiveis',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };

    var _getEstadoAtual = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/transicoes?estado=ATUAL',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    };

    var _goToNextState = function (id) {
      return $http({
        url: baseUrl.apiOperacoes + '/operacoes/' + id + '/transicoes?proxima',
        method: 'GET'
      }).then(
        function (results) {
          return results
        }
      )
    }

    // Comercial
    api.getCarteiras              = _getCarteiras;
    api.getCarteiraById           = _getCarteiraById;
    api.saveCarteira              = _saveCarteira;
    api.updateCarteira            = _updateCarteira;
    api.deleteCarteira            = _deleteCarteira;
    api.addTarifaToCarteira       = _addTarifaToCarteira;
    api.getTarifasByCarteira      = _getTarifasByCarteira;

    api.getTarifas                = _getTarifas;
    api.getTarifaById             = _getTarifaById;
    api.saveTarifa                = _saveTarifa;
    api.updateTarifa              = _updateTarifa;
    api.deleteTarifa              = _deleteTarifa;

    api.getOperacoes              = _getOperacoes;
    api.getOperacaoById           = _getOperacaoById;
    api.saveOperacao              = _saveOperacao;
    api.updateOperacao            = _updateOperacao;
    api.addRecebivel              = _addRecebivel;
    api.updateRecebivel           = _updateRecebivel;
    api.addTarifaToOperacao       = _addTarifaToOperacao;
    api.deleteTarifaToOperacao    = _deleteTarifaToOperacao;
    api.liberarOperacao           = _liberarOperacao;
    api.enviarRecebiveis          = _enviarRecebiveis;

    api.getRecebiveisByOperacao   = _getRecebiveisByOperacao;

    api.getTarifasByOperacao      = _getTarifasByOperacao;
    api.getLancamentosByOperacao  = _getLancamentosByOperacao;
    api.calcularLancamentos       = _calcularLancamentos;

    api.getWorkflows              = _getWorkflows;
    api.getWorkflowById           = _getWorkflowById;
    api.getWorkflowImage          = _getWorkflowImage;

    api.getTipoLancamentos        = _getTipoLancamentos;
    api.getTipoLancamentoById     = _getTipoLancamentoById;
    api.addTipoLancamento         = _addTipoLancamento;
    api.updateTipoLancamento      = _updateTipoLancamento;
    api.deleteTipoLancamento      = _deleteTipoLancamento;

    api.getRecebivelById          = _getRecebivelById;

    api.getRecebiveis             = _getRecebiveis;

    api.getEstadoAtual            = _getEstadoAtual;
    api.goToNextState             = _goToNextState;

    return api;

}]);
