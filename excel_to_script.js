import reader from 'xlsx';
import { createWriteStream } from 'fs';

const { readFile, utils } = reader;

const execute = () => {
      const file = readFile('./resources/paradas.xlsx');
      let sheetArray = [];
      file.SheetNames.forEach((sheetName) => {
            sheetArray = [...sheetArray, ...utils.sheet_to_json(file.Sheets[sheetName])];
      });

      const stream = createWriteStream('./resources/paradas.sql');
      stream.write('INSERT INTO Parada (CodigoParada, Latitud, Longitud, Descripcion, IdTipoCoordenada) VALUES ');
      sheetArray.forEach((row, index) => {
            stream.write(`('${row.codigo}', ${row.latitud}, ${row.longitud}, '${row.descripcion}', ${row.tipo})`);
            if (index < sheetArray.length - 1) {
                  stream.write(',');
                  stream.write('\r\n');
            }
      });
      stream.end();

      return sheetArray;
}

execute();