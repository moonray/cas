#the git branch you want to use
set :branch, "stg"

role :web, "www2-stg" #www-dev                          # Your HTTP server, Apache/etc
role :app, "www2-stg"                          # This may be the same as your `Web` server
role :db, "www2-stg", :primary => true        # This is where Rails migrations will run

