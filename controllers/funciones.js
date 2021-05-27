var express = require('express');
var request = require('request');
var https = require('https');
var codigos = require('../constants/codigos');
const jsdom = require('jsdom')
const axios = require('axios');

const urlDolar = 'https://api-dolar-argentina.herokuapp.com/api/';
const pageBNA = 'https://www.bna.com.ar/Cotizador/MonedasHistorico';
const dom = new jsdom.JSDOM("")

var tokenBCRA = '';
var cotizacionesDolar;
var fechaConsultaDolar;
var consulteDolarHoy = false;

function getCotizacion(req, res){
  var query = require('url').parse(req.url,true).query;
  var pais = query.pais;
  var codigoMoneda = query.codmoneda;

 //Agregar futuras implementaciones en otras monedas aqui
  if(pais == codigos.argentina && codigoMoneda == codigos.dolar){
    if(query.tipocotizacion == 'dolardivisa'){
      getCotizacionDolarDivisaBNA(req,res);
    }else {
      getCotizacionDolar(req, res, query);
    }
  } else {
    res.send("Ningun codigo de pais y moneda coincide con algun metodo disponible para consultar cotizaciones.");
  }
}

function getCotizacionDolar(req, res, query){
  var options = {
    uri: urlDolar + (query.tipocotizacion ? query.tipocotizacion : 'dolaroficial') ,
    method: 'GET'
  };

  request(options, function (error, response, body) {
    if(response.statusCode == 200){
      cotizacionesDolar = JSON.parse(response.body); 
      res.send('{"v":"'+cotizacionesDolar.venta+'"}')
    }
    else{
      res.status(response.statusCode).send(body);
    }
  });

}
async function getCotizacionDolarDivisaBNA(req, res) {
  axios.get(pageBNA).then(function(resp){
    if(resp.status ==200){
      let html = new jsdom.JSDOM(resp.data)
      let elements = html.window.document.getElementsByTagName('tbody')[0];
      let obj;
        for(let element of elements.rows){
          if(element.cells[0].innerHTML.includes('Dolar U.S.A')){
            obj ={
                moneda: element.cells[0].innerHTML,
                compra: element.cells[1].innerHTML,
                venta: element.cells[2].innerHTML
            };
            break;
          }
        }
      if(obj){
        res.send('{"v":"'+obj.venta+'"}')
      }else{
        res.status(204).json({error:"No Content"})
      }
    }
  }).catch(function (err){
    res.status(404).json({error: err.message})
  })
  
};

module.exports = {
  getCotizacion
}