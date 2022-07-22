# TodoList with PouchDB and CouchDB synchronized

In this example we discover how to work client side with **PouchDB** and how to connect it to the **CouchDB** service.
If the CORS problem should occur, enter in **Fauxton** dashboard, from the left menu click on **Configuration** > **CORS** and click on **Enable CORS**.

Or, for Windows users only, open the **local.ini** file in the CouchDB installation folder and set these parameters:

```ini
[httpd]
enable_cors = true

[cors]
origins = *
credentials = true
methods = GET, PUT, POST, HEAD, DELETE
headers = accept, authorization, content-type, origin, referer, x-csrf-token
```

and finally restart the CouchDB service with this command to be executed from the command prompt with administrator privileges.

```ini
net.exe stop "Apache CouchDB" && net.exe start "Apache CouchDB"
```
