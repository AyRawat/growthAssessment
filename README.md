# Website Word Counter

This application, counts the number of words in a website. A user can view the past history of his searches and can also remove or mark any domain as Favorite.

The website is deployed here : https://website-word-counter.onrender.com/

## Installation

```bash
  * git clone https://github.com/AyRawat/growthAssessment.git
  * cd interviews-services_ayrawat/javascript
  * npm i;
```

To start your server

```
* npm start
```

Open up your favorite browser and navigate to http://localhost:3000/ and you should see the Home Page.

## Design Choices

1. Database - NOSQL - MongoDB
   I have opted for a NoSQL database due to the nature of our data, which is non-relational. Our records have no connection to each other, and consistency with the database is not a critical requirement in our case. Eventual consistency is more suitable for our data. In addition to this, there are several benefits of using a NoSQL database. One such advantage is that it can handle large volumes of unstructured or semi-structured data more efficiently than traditional relational databases. NoSQL databases are also highly scalable and can accommodate changes to data models and schemas easily. Additionally, NoSQL databases provide fast read and write operations, making them an excellent choice for real-time applications that require quick and frequent data updates.

2. Counting words in a Website

When faced with the decision of choosing between Puppeteer and Cheerio to complete this task, I evaluated both options and determined that while Puppeteer boasts extensive functionality and is arguably the best package for scraping, its size is rather hefty. In light of our specific needs, I ultimately opted for Cheerio. Not only is it a lightweight option, but it still offers ample capabilities to achieve our intended outcome effectively.

3. FronEnd

In this particular instance, I chose not to implement any front-end frameworks for the task at hand. Since the requirements were fairly straightforward and didn't involve any complex features, I deemed that employing a framework would be excessive and potentially add unnecessary bloat to the application. As a result, I made the decision to render a simple HTML web page from Node.js, which was sufficient to meet the project's objectives without any superfluous resources or added complexity.

## API Reference

#### POST save Insight

Description : Get the Word Count and save the Domain name
GET : /api/saveInsights

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :------------- |
| `id`      | `ID` | **Required**. Object ID|

```

```
  curl --location 'https://website-word-counter.onrender.com/api/saveInsights' \
--header 'Content-Type: application/json' \
--data '{"url":"https://www.google.com"}'
```

Response

```
{
    "name": "https://www.google.com",
    "fav": false,
    "count": "19",
    "timestamp": "2023-03-28T04:40:30.372Z",
    "_id": "64226fbe285ab63c0a9208f5",
    "__v": 0
}
```

#### Get All insights

- Description : Get All the History of Searches.

```
curl --location 'https://website-word-counter.onrender.com/api/listAll'
```

Response

```
[
    {
        "_id": "64226fdd285ab63c0a9208f7",
        "name": "https://www.google.com",
        "fav": false,
        "count": "19",
        "timestamp": "2023-03-28T04:41:01.666Z",
        "__v": 0
    },
    {
        "_id": "64226fbe285ab63c0a9208f5",
        "name": "https://www.github.com",
        "fav": false,
        "count": "25",
        "timestamp": "2023-03-28T04:40:30.372Z",
        "__v": 0
    },
    {
        "_id": "64226b9d7e00dda618b43e33",
        "name": "https://growth.cx",
        "fav": false,
        "count": "306",
        "timestamp": "2023-03-28T04:22:53.923Z",
        "__v": 0
    },
   ]
```

#### DELETE - Delete Insight By ID

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :------------- |
| `id`      | `ID` | **Required**. Object ID|

```

```
curl --location --request DELETE 'https://website-word-counter.onrender.com/api/deleteInsightById' \
--header 'Content-Type: application/json' \
--data '{
    "id": "64226fdd285ab63c0a9208f7"
}'
```

Response

```
{
    "message": "No. of Rows Deleted: 1"
}
```

#### PUT - Update Favorite

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-----------|
| `url`      | `string` | **Required**. e.g https://wwww.google.com"|

```

```
curl --location --request PUT 'https://website-word-counter.onrender.com/api/updateFavorite' \
--header 'Content-Type: application/json' \
--data '{
    "url":"https://www.google.com"
}'
```

#### DELETE - Delete ALL Insight By a URL

```
| Parameter | Type     | Description                       |
| :-------- | :------- | :------------- |
| `url`      | `string` | **Required**. e.g https://wwww.google.com"|

```

```
curl --location --request DELETE 'https://website-word-counter.onrender.com/api/deleteInsight' \
--header 'Content-Type: application/json' \
--data '{
    "url": "https://www.google.com"
}'
```

Response

```
{
    "message": "No. of Rows Deleted: 5"
}
```
