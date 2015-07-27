#the git branch you want to use
set :branch, "prod"

role :web, "670elmp01.blackmesh.com" #www-dev                          # Your HTTP server, Apache/etc
role :app, "670elmp01.blackmesh.com"                          # This may be the same as your `Web` server
role :db, "670elmp01.blackmesh.com", :primary => true        # This is where Rails migrations will run
