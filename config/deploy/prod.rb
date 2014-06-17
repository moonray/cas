#the git branch you want to use
set :branch, "prod"

role :web, "www2-prod" #www-dev                          # Your HTTP server, Apache/etc
role :app, "www2-prod"                          # This may be the same as your `Web` server
role :db, "www2-prod", :primary => true        # This is where Rails migrations will run

