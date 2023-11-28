
# Fee Calculator
## Part 1: Fees

For this part calculateOrderTotal() is called in the server.ts file. Results are being displayed in the server console.

## Part 2: Distributions

For this part distributions() is called in the server.ts file. Results are being displayed in the server console.

## Part 3: APIs

#### calculate prices

```http
  Post /fee/calculatePrices
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orders` | `array` | **Required**. order Array to pass in the body |

#### calculate distributions

```http
  Post /fee/calculateDistributions
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `orders`      | `array` | **Required**. order Array to pass in the body |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
