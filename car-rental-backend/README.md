# Car Rental REST-API
## Entitások:
#### User:
```json
{
	"name": "Teszt Elek",
	"userName": "telek05",
	"password": "password"
}
```
#### Brand:
```json
{
	"name": "VOLVO"
}
```
#### Model:
```json
{
	"name": "V90 Cross Country",
	"brand": {} as Brand
}
```
#### Car:
```json
{
	"registration_plate": "ABC-001",
	"color": "white",
	"price": 25000,
	"image": "https://www.car.com/volvo/v90.png",
	"purchase_date": "2022-01-02T00:00:00.000Z",
	"model": {} as Model
}
```
#### Category:
```json
{
	"name": "Elektromos",
	"description": "Elektromos hajtással rendelkező jármű"
}
```
#### Location:
```json
{
	"name": "2072 Zsámbék Központ",
	"postal_code": "2072",
	"city": "Zsámbék",
	"street": "Szent István",
	"street_type": "tér",
	"house_no": 12
}
```
#### Rental:
```json
{
	"pick_up_date": "2022-06-01",
	"return_date": "2022-06-05",
	"total_cost": 30000,
	"pick_up_location": {} as Location,
	"return_location": {} as Location,
	"car": {} as Car,
	"user": {} as User
}
```

## Végpontok:
### /users/
```
POST/users:
	requestBody: 
		name: string
		userName: string : required
		password: string : required
	responses:
		"201": 
			description: User created successfully
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/User"
		"409":
			description: userName already have been taken

POST/users/login:
	requestBody: 
		userName: string : required
		password: string : required
	responses:
		"200": 
			description: successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/User"
					access_token: string
		"400":
			description: Invalid username/password supplied		
 ```
### /brands/
```
GET/brands/:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Brand
		"401":
			description: Unauthorized
			
POST/brands:
	requestBody: 
		name: string : required
	responses:
		"201": 
			description: Brand created successfully
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Brand"
		"409": 
			description: Brand already exists 

DELETE/brands/{id}:
	responses:
		"200": 
			description: Brand deleted successfully
		"401":
			description: Unauthorized
		"404":
			description: Brand not found	

GET/brands/{id}:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Brand
		"401":
			description: Unauthorized
		"404":
			description: Brand not found	
 ```
### /models/
```
GET/models/:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Model
			
POST/models:
	requestBody: 
		name: string : required
		brand: Brand
	responses:
		"201": 
			description: Model created successfully
			content:
				application/json:
				schema:
					Model
		"409":
			description: Model already exists

GET/models/{id}:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Model
		"404":
			description: Model not found	
 ```
### /Category/
```
GET/categories/:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Category
			
POST/categories:
	requestBody: 
		name: string : required
		description: string: optional
	responses:
		"201": 
			description: Category created successfully
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Category"
		"409": 
			description: Category already exists
 ```
### /cars/
```
GET/cars/:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Car
		"401":
			description: Unauthorized
			
POST/cars:
	requestBody: 
		registration_plate: string : required
		color: string: required
		price: number: required
		purchase_date: string(date) : optional
		model: Model : required
		categories: Category[] : optional
		image: string: required
		status: enum { IN_USE, READY_TO_USE } : required
	responses:
		"201": 
			description: Car created successfully
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Car
		"401": 
			description: Unauthorized
		"409": 
			description: Car already exists 

DELETE/cars/{id}:
	responses:
		"200": 
			description: Car deleted successfully
		"403":
			description: Unauthorized
		"405":
			description: Not allowed
		"404":
			description: Car not found	

GET/cars/{id}:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Car
		"401":
			description: Unauthorized
		"404":
			description: Car not found	
			
PUT/cars/{id}:
	requestBody: 
		registration_plate: string : optional
		color: string: optional
		price: number: optional
		purchase_date: string(date) : optional
		model: Model : optional
		categories: Category[] : optional
		image: string: optional
		status: enum { IN_USE, READY_TO_USE } : optional
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Car
		"401":
			description: Unauthorized
		"404":
			description: Car not found	

PUT/cars/{id}/lock:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Car
		"401":
			description: Unauthorized
		"404":
			description: Car not found	

PUT/cars/{id}/release:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Car
		"401":
			description: Unauthorized
		"404":
			description: Car not found	
 ```
### /locations/
```
GET/locations/:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Location
			
POST/locations:
	requestBody: 
		name: string : required
		postal_code: number : required
		city: string : required
		street_name: string : required
		street_type: string : required
		house_no: number : required
	responses:
		"201": 
			description: Location created successfully
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Location
		"401": 
			description: Unauthorized
		"409": 
			description: Location already exists 

DELETE/locations/{id}:
	responses:
		"200": 
			description: Location deleted successfully
		"403":
			description: Unauthorized
		"404":
			description: Location not found	

GET/locations/{id}:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Location
		"404":
			description: Location not found	
			
PUT/locations/{id}:
	requestBody: 
		name: string : optional
		postal_code: number : optional
		city: string : optional
		street_name: string : optional
		street_type: string : optional
		house_no: number : optional
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Location
		"401":
			description: Unauthorized
		"404":
			description: Location not found	
 ```
### /rentals/
```
GET/rentals/:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Rental
			
POST/rentals:
	requestBody: 
		pick_up_location: Location : required
		return_location: Location : required
		pick_up_date: string(date): required
		return_date: string(date): optional
		total_cost: number : optional
		user: User : required
		car: Car : required
	responses:
		"201": 
			description: Rental created successfully
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Rental
		"401": 
			description: Unauthorized
		"409": 
			description: Rental already exists 

DELETE/rentals/{id}:
	responses:
		"200": 
			description: Rental deleted successfully
		"401":
			description: Unauthorized
		"404":
			description: Rental not found	

GET/rentals/{id}:
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Rental
		"404":
			description: Location not found	
			
PUT/rentals/{id}:
	requestBody: 
		pick_up_location: Location : optional
		return_location: Location : optional
		pick_up_date: string(date): optional
		return_date: string(date): required
		total_cost: number : optional
		user: User : required
		car: Car : required
	responses:
		"200": 
			description: Successful operation
			content:
				application/json:
				schema:
					$ref: "#/components/schemas/Rental
		"401":
			description: Unauthorized
		"404":
			description: Rental not found	
 ```
