# Url Shortener Service
A url shortener REST microservice running on Node.js and backed by a PostgreSQL relational database.

The microservice is deployed on an AWS EC2 instance while the database is managed on Amazon RDS.

The application is uploaded and managed on AWS Elastic Beanstalk.

## Demo
http://urlshortenerservice-env2.eba-uprcmvdm.us-west-2.elasticbeanstalk.com/

## API
### GET
#### 1. Request for previously generated shortened url by id
##### Request
```http
http://urlshortenerservice-env2.eba-uprcmvdm.us-west-2.elasticbeanstalk.com/api/urls/3
```
##### Response
```json
{
    "id": "3",
    "shortened_url": "http://urlshortenerservice-env2.eba-uprcmvdm.us-west-2.elasticbeanstalk.com/lnaJFWCEUiwO-hWkRVugw",
    "original_url": "https://www.amazon.ca/dp/B0758L64L9/ref=ods_gw_tpr_d_h1_vicc_slcb_caEN?pf_rd_r=GJF6RH6AH9VWYGR6K5XW&pf_rd_p=08166102-df0c-4fdc-b67b-0a31572d2c33&pd_rd_r=d62dca0e-20c5-4ce5-9fd1-4230efe3045f&pd_rd_w=ks6TU&pd_rd_wg=j08oQ&ref_=pd_gw_unk"
}
```
#### 2. Redirect to the original url when given a valid shortened url 
##### Request
```http
http://urlshortenerservice-env2.eba-uprcmvdm.us-west-2.elasticbeanstalk.com/lnaJFWCEUiwO-hWkRVugw
```
##### Response
```bash
Redirects to Amazon
```
### POST
#### 1. Shorten the given original url via a JSON payload
##### Request
```http
http://urlshortenerservice-env2.eba-uprcmvdm.us-west-2.elasticbeanstalk.com/api/shorten
```
##### JSON payload
```json
{
    "originalUrl": "https://www.amazon.ca/dp/B0758L64L9/ref=ods_gw_tpr_d_h1_vicc_slcb_caEN?pf_rd_r=GJF6RH6AH9VWYGR6K5XW&pf_rd_p=08166102-df0c-4fdc-b67b-0a31572d2c33&pd_rd_r=d62dca0e-20c5-4ce5-9fd1-4230efe3045f&pd_rd_w=ks6TU&pd_rd_wg=j08oQ&ref_=pd_gw_unk"
}
```
##### Response
```json
{
    "id": "11",
    "shortened_url": "http://urlshortenerservice-env2.eba-uprcmvdm.us-west-2.elasticbeanstalk.com/W8wkMVUd18jy85FdJOERc",
    "original_url": "https://www.amazon.ca/dp/B0758L64L9/ref=ods_gw_tpr_d_h1_vicc_slcb_caEN?pf_rd_r=GJF6RH6AH9VWYGR6K5XW&pf_rd_p=08166102-df0c-4fdc-b67b-0a31572d2c33&pd_rd_r=d62dca0e-20c5-4ce5-9fd1-4230efe3045f&pd_rd_w=ks6TU&pd_rd_wg=j08oQ&ref_=pd_gw_unk"
}
```
## Config And Deployment of PostgreSQL Schema
The connection config (not included) for connecting to the PostgreSQL server is located in <i>./url-shortener-service/db/config/config.mjs</i>

The configuration is in the following JSON format:
```javascript
export default {
    config: {
        "hostname": "The PostgreSQL Server Hostname",
        "port": "The PostgreSQL Server Port",
        "dbname": "The Database Name",
        "username": "The Username",
        "password": "The Password"
    }
}
```

The schema can be deployed via <i>./url-shortener-service/db/config/schemadeployer.mjs</i>
```bash
node schemadeployer.mjs
```
## Tests
There are no unit or integration tests included as I am not familiar with Javascript test frameworks. If this was a Java project, I would use Junit and Mockito.

However, the Postman collection is provided and can be imported from <i>./url-shortener-service/tests/postman/short url service.postman_collection.json</i>

## Thoughts and Possible Improvements
Since the application is managed by AWS Elastic Beanstalk, this service can be scaled easily to support many requests via Auto Scaling. A possible problem that may occur is too many clients trying to connect to the PostgreSQL server and crashing it - does Amazon RDS handle rate-limiting? If not, we may need a rate-limiter between the application and the PostgreSQL server.

An improvement to support more requests could be caching the shortened_urls and original_urls. This can be done via AWS ElastiCache or a standalone Redis service. If combined with Auto Scaling + a standalone Redis service, we would need to enable sharding and replication on the Redis service.

Another improvement would be to store our schema in <i>.sql files</i> and have schemadeployer read and iterate through the files.
