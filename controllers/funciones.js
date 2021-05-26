var express = require('express');
var request = require('request');
var https = require('https');
var codigos = require('../constants/codigos');
const puppeteer = require('puppeteer');

const urlDolar = 'https://api-dolar-argentina.herokuapp.com/api/';
const pageBNA = 'https://www.bna.com.ar/Cotizador/MonedasHistorico';

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
  try {
    console.log('launch browser')
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
    console.log('browser.newPage')
    const page = await browser.newPage();
    console.log('go to page')
    await page.goto(pageBNA);
    console.log('evaluate page')
    const ret = await page.evaluate(()=>{
      console.log('into the callback')
        const elements = document.getElementsByTagName('tbody')[0]
        console.log(elements)
        let obj;
        for(let element of elements.rows){
          if(element.cells[0].innerText.includes('Dolar U.S.A')){
            obj ={
                moneda: element.cells[0].innerText,
                compra: element.cells[1].innerText,
                venta: element.cells[2].innerText
            };
            break;
          }
        }
        return obj;
      })
      console.log('close browser')
    await browser.close()
    if(ret){
        res.send('{"v":"'+ret.venta+'"}')
    }else{
        res.send("No se encontro ninguna cotizacion")
    }
  } catch (error) {
    res.status(404).send(error.message); 
  } 
  
};

module.exports = {
  getCotizacion
}