FROM node:10
WORKDIR /usr/src/app
ENV POSTGRE_HOST=flagela.c4cxvrcpodkd.us-east-2.rds.amazonaws.com
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
RUN npm audit fix
COPY . .
# RUN ng build --prod
COPY ./dist/angular-web-app ./src/app/backend/public/angular-web-app 
# cp -r ./dist/angular-web-app ./src/app/backend/public/angular-web-app
EXPOSE 8080
EXPOSE 3000
CMD [ "npm", "start" ]

# CMD [ "ng", "serve", "--port", "8080" ]