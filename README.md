# excel-to-sql


#### El excel a procesar debe ser renombrado como *paradas.xlsx* y debe tener la siguiente estructura:

#### | codigo | latitud | longitud | descripcion | tipo | valido |

- codigo: Codigo único identificador de la parada.
- latitud: Latitud de la coordenada.
- longitud: Longitud de la coordenada.
- descripcion: Calle y altura de la coordenada.
- tipo: Tipo de coordenada
  - 0 - Cambio de sección
  - 1 - Parada
  - 2 - Inicio o fin de recorrido
- valido: Valor que define si la coordenada debe ser tomada en cuenta o no a la hora de armar el script
  - 1 - true
  - 0 - false

#### Notas
- El archivo debe estar posicionado en el directorio *resources* del proyecto.
- El resultado se generará en el mismo directorio.
- El archivo puede tener más de una solapa, siempre y cuando respeten la estructura anteriormente mencionada.