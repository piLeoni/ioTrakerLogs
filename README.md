# ioTrakerLogs
A simple app to collect position data from an API and serve them.

## Install
You need to have [Node.js](https://nodejs.org/en/) and [sqlite3](https://www.tutorialspoint.com/sqlite/sqlite_installation.htm) installed on your machine.

Then download the git repository and enter in the folder:

    git clone https://github.com/piLeoni/ioTrakerLogs
    cd ioTrackerLogs

Install the node modules:

    npm i 
Then create the database:

    mkdir logs
    node ./createDB.js

All relevant variables are in the **/ioTrackerLogs/.env** file, you need to insert your token here, and you can define other things.

Now you can start the app:

    node ./index.js

