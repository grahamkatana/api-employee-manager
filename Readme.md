<h1>Running the project</h1>
npx ts-node src/index
<p>On the server you can use the build.sh file to install your dependencies</p>

### Runthe command to sstart the server and change env accordingly as given on the example
``` npm run build ```


<ul>
<li>Bootstrap the .sequalizerc</li>
</ul>

### Adding a new model
```npx sequelize-cli model:generate --name EmployeeDetail --attributes first_name:string,last_name:string,gender:ENUM,salutation:ENUM,employee_number:string,gross_salary:decimal,profile_color:string```