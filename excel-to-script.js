import reader from 'xlsx';
import { createWriteStream } from 'fs';

const { readFile, utils } = reader;

const execute = () => {
      try {
            const file = readFile('./resources/paradas.xlsx');
            let sheetArray = [];
            file.SheetNames.forEach((sheetName) => {
                  sheetArray = [...sheetArray, ...utils.sheet_to_json(file.Sheets[sheetName])];
            });
            createStops(sheetArray);
            createLineBranchStopRelationship(sheetArray);
      } catch (error) {
            console.log('Error en proceso de generación de script sql', error);
      }
}

const createStops = (sheetArray) => {
      const stream = createWriteStream('./resources/paradas.sql');
      stream.write('INSERT INTO Parada (CodigoParada, Latitud, Longitud, Descripcion, IdTipoCoordenada) VALUES ');
      sheetArray.forEach((row, index) => {
            if (!row.valido)
                  return;

            stream.write(`('${row.codigo}', ${row.latitud}, ${row.longitud}, '${row.descripcion}', ${row.tipo})`);
            if (index < sheetArray.length - 1) {
                  stream.write(',');
                  stream.write('\r\n');
            }
      });
      stream.end();
      console.log('Proceso de generación de script de paradas finalizado con éxito');
}

const createLineBranchStopRelationship = (sheetArray) => {
      const stream = createWriteStream('./resources/linearamalparada.sql');

      stream.write('INSERT INTO LineaRamalParada (IdLineaRamal, IdParada, Seccion) VALUES ');

      sheetArray.forEach((row, index) => {
            if (!row.valido)
                  return;

            stream.write(`('${row.ramal}', <IDPARADA>, 1)`);
            if (index < sheetArray.length - 1) {
                  stream.write(',');
                  stream.write('\r\n');
            }
      });

      stream.end();

      console.log('Proceso de generación de script de lineaRamalParada finalizado con éxito');
}

execute();
