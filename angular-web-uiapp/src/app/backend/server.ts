import express from 'express';
var cors = require('cors')
var path = require('path');
var fs = require('fs');

import { routes as postgreRoutes } from './postgre-routes';

import { routes as authRoutes } from './auth-routes';
import { routes as hospitalRoutes } from './hospital-routes';
import { routes as vendorRoutes } from './vendor-routes';
import { routes as patientRoutes } from './patient-routes';

const app = express();

app.use(cors());
app.options('*', cors())

app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))
const port:number = Number(process.env.PORT) ||  3000;

app.use(express.static('src/app/backend/public/angular-web-app'));
// app.use(express.static('/public/angular-web-app'));

app.get('/', (req, res) => {
  res.redirect('/index.html')
})


app.get('/test', (req, res)=>{
  res.json(true)
});

app.use('/auth/',authRoutes);
app.use('/hospital/', hospitalRoutes);
app.use('/vendor/', vendorRoutes);
app.use('/patient/', patientRoutes);

app.use('/postgre/', postgreRoutes); 

var postgreurl = ('postgresql://postgres:Password$1234@'+process.env.POSTGRE_HOST+':5432/FlagelaDev')
console.log('Connecting to postgre by:  ',postgreurl.replace('Password$1234', '****'))

app.listen(port, () => {
    
    return console.log(`server is listening on internal network http://localhost:${port}`);
  });
