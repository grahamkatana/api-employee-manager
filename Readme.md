<h1>Running the project</h1>
```npx ts-node src/index.ts```

<ul>
<li>Bootstrap the .sequalizerc</li>
</ul>
-first_name
-last_name
-gender
-salutation
-employee_number
-full_name(virtual field) on frontend
-gross_slary
-profile_color (green, blue, red, default)
```npx sequelize-cli model:generate --name EmployeeDetail --attributes first_name:string,last_name:string,gender:ENUM,salutation:ENUM,employee_number:string,gross_salary:decimal,profile_color:string```