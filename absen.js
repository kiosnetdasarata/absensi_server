const express = require('express')
var request = require('request');
const app = express()
const port = 9000

app.use('/iclock/cdata', (req, res) => {
  res.send('ok');

  let nama_tabel = req.query.table

    if( nama_tabel == 'ATTLOG'){
      let body = '';

      req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
      });

      req.on('end', () => {
        let data_sn = req.query.SN
        let data = body.split('\t')
        
        let id = data[0];
        let date = data[1];
        let status = data[2];
        let date_split = date.split(" ")
        let jam = date_split[1];
        let tgl = date_split[0];
        
        let status_baru = ''
        
        if(status == 0){
          status_baru += 'masuk'
        }else{
          status_baru += 'pulang'
        }
        
      // var options = {
      //   'method': 'POST',
      //   'url': 'https://script.google.com/macros/s/AKfycbwLpl8uQiGifVsMIQQZzmDLz6RxNsVQ7KPumEf3sXT90WXsOZOTdnZcuMo90QpLogTe0w/exec',
      //   'headers': {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   form: {
      //     // 'sn': data_sn,
      //     'id':id,
      //     'tgl':tgl,
      //     'jam': jam,
      //     'status':status_baru
      //   }
      // };
      
      var options = {
        'method': 'POST',
        'url': 'http://103.184.19.40:3000/api/send-whatsapp',
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          // 'sn': data_sn,
          // 'id':id,
          // 'tgl':tgl,
          // 'jam': jam,
          // 'status':status_baru
          'logType' : "absen",
          'data' : {
              'id' : id,
              'tgl' : tgl,
              'jam': jam,
              'status' : status_baru,
          }
        }
      };
      console.log(options);
      request(options, function (error, response) {
        if (error) throw new Error(error);
      });

    });
    
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})