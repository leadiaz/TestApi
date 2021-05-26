Cotizaciones
======
Un servicio para consultar cotizaciones.
***
APIs
----

#### GET `/api/cotizaciones?pais={pais}&codmoneda={codigoMoneda}`

Se envia el codigo del pais y el codigo de la moneda para obtener la cotizacion del ultimo dia.
Por el momento soporta:
Pais: ARG, CodMoneda: DOL

Y se obtiene una respuesta como:


```json
{
	{
	"d":"2019-09-17",
	"v":"59"
	}
}
```

#### GET `/api/cotizaciones?pais={pais}&codmoneda={codigoMoneda}&dia={dia}`

Se envia el codigo del pais, el codigo de la moneda y el dia puntual que se desea consultar la cotizacion.
Por el momento soporta:
Pais: ARG, CodMoneda: DOL.


Ejemplo = /api/cotizaciones?pais=ARG&codmoneda=DOL&dia=2019-08-20

Y se obtiene una respuesta como:


```json
{
	{
	"d":"2019-09-17",
	"v":"59"
	}
}
```


#### POST `/api/cotizaciones/token/bcra`

Se envia el token del BCRA para setearlo.

```json
{
	{
	"token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAyODc2MTksInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJnc3R1cmxhQGZpbm5lZ2Fucy5jb20uYXIifQ.T1vPP9y2mNd10ZFtVspN4Q_u4AU5DiiDyfu6uOwd7wFWfnXIGeDgX1yu5dLTSaZ_Ooujf8nVkTrwvbSwrl-Chw"
	}
}
```

Y se obtiene una respuesta como:


```json
{
	{
	"Token actualizado"
	}
}
```


# TestApi
