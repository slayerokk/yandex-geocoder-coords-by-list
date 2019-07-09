var apikey = 'd7b44a55-b9d2-460e-bb29-2f5b8da5261c';
var axios = require('axios');
var fs = require('fs');
var source = fs.readFileSync('./source.txt').toString().split("\n");
var records = [];
var _ = require('lodash');

var recognized = 0;
var unrecognized = 0;
var nbr = 1;

async function calc_line(line) {
    console.log('Query for ' + line);
    var {
        data
    } = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
        params: {
            apikey: apikey,
            format: 'json',
            geocode: line
        }
    });
    if (data && data.response && data.response.GeoObjectCollection && data.response.GeoObjectCollection.featureMember &&
        data.response.GeoObjectCollection.featureMember[0]) {
        recognized++;
        var single = data.response.GeoObjectCollection.featureMember[0].GeoObject;
        var [lng, lat] = single.Point.pos.split(' ');
        records.push({
            sgn: single.name,
            lat: lat,
            lng: lng,
            dsc: single.name,
            nbr: nbr
        });
        nbr++;
    } else {
        unrecognized++;
    }
    return;
}

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './coords.csv',
    header: [{
            id: 'lat',
            title: 'Широта'
        },
        {
            id: 'lng',
            title: 'Долгота'
        },
        {
            id: 'dsc',
            title: 'Описание'
        },
        {
            id: 'sgn',
            title: 'Подпись'
        },
        {
            id: 'nbr',
            title: 'Номер метки'
        }
    ]
});

async function process() {
    await Promise.all(_.map(source, line => calc_line(line)))
    await csvWriter.writeRecords(records);
    console.log('---------------------------------------');
    console.log('Total: ' + recognized + ' recognized, ' + unrecognized + ' unrecognized');
}

process();
