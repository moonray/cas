#the git branch you want to use
set :branch, "dev"

role :web, "www2-dev" #www-dev                          # Your HTTP server, Apache/etc
role :app, "www2-dev"                          # This may be the same as your `Web` server
role :db, "www2-dev", :primary => true        # This is where Rails migrations will run

