#the git branch you want to use
set :branch, "stg"

role :web, "www2-stg.calacademy.org" #www-dev                          # Your HTTP server, Apache/etc
role :app, "www2-stg.calacademy.org"                          # This may be the same as your `Web` server
role :db, "www2-stg.calacademy.org", :primary => true        # This is where Rails migrations will run

